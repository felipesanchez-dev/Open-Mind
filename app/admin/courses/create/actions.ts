"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { Apiresponse } from "@/lib/types";
import { courseSchema, courseSchemaType } from "@/lib/zodShemas";
import { headers } from "next/headers";

export async function CreateCourse(
  values: courseSchemaType
): Promise<Apiresponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

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
