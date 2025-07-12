"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet from "@/lib/arcjet";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, courseSchemaType } from "@/lib/zodShemas";
import { detectBot, fixedWindow, request } from "@arcjet/next";

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

export async function CreateCourse(
  values: courseSchemaType
): Promise<ApiResponse> {
  const session = await requireAdmin();

  try {
    const req = await request();
    const decision = await aj.protect(req, {
      fingerprint: session.user.id,
    });

    if (decision.isDenied()) {
      if(decision.reason.isRateLimit()) {
        return {
          status: "error",
          message: "Has superado el límite de solicitudes. Inténtalo más tarde.",
        };
      } else {
        return {
          status: "error",
          message: "Acción no permitida.",
        };
      }
    }

    const validation = courseSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: "error",
        message: "Los datos del formulario no son válidos",
      };
    }

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user.id as string,
      },
    });

    return {
      status: "success",
      message: "Curso creado exitosamente",
    };
  } catch (error) {
    console.error("Error creando curso:", error);
    return {
      status: "error",
      message:
        "Se produjo un error al crear el curso. Por favor, intenta de nuevo.",
    };
  }
}
