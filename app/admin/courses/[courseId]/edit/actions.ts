"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { courseSchema, courseSchemaType } from "@/lib/zodShemas";

export async function editCourse(
  data: courseSchemaType,
  courseId: string
): Promise<ApiResponse> {
  const user = await requireAdmin();

  try {
    const result = courseSchema.safeParse(data);
    if (!result.success) {
      return {
        status: "error",
        message: "Los datos del formulario no son válidos",
      };
    }

    await prisma.course.update({
      where: {
        id: courseId,
        userId: user.user.id
      },
      data: {
        ...result.data,
      }
    });
    return {
      status: "success",
      message: "Curso editado correctamente",
    };
  } catch {
    return {
      status: "error",
      message: "Error al editar el curso. Por favor, inténtalo más tarde.",
    };
  }
}
