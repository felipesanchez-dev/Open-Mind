import { env } from "@/lib/env";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { z } from "zod";
import { S3 } from "@/lib/S3Client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import arcjet from "@/lib/arcjet";
import { detectBot, fixedWindow } from "@arcjet/next";

const deleteSchema = z.object({
  key: z.string().min(1, { message: "Key is required" }),
});

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5,
    })
  );

export async function DELETE(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  try {
    const decision = await aj.protect(request, {
      fingerprint: session?.user.id as string,
    });

    if (decision.isDenied()) {
      return NextResponse.json({ error: "No valido" }, { status: 429 });
    }

    const body = await request.json();

    const validation = deleteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request body", details: validation.error.errors },
        { status: 400 }
      );
    }

    const { key } = validation.data;

    const command = new DeleteObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      Key: key,
    });

    await S3.send(command);

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to delete file",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
