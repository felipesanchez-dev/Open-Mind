import { env } from "@/lib/env";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { z } from "zod";
import { S3 } from "@/lib/S3Client";

const deleteSchema = z.object({
  key: z.string().min(1, { message: "Key is required" }),
});

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const validation = deleteSchema.safeParse(body);

    if (!validation.success) {
      console.error("❌ Validación fallida:", validation.error);
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

    console.log("📦 Comando S3 delete creado:", {
      bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      key,
    });

    await S3.send(command);

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error eliminando archivo:", error);
    return NextResponse.json(
      {
        error: "Failed to delete file",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
