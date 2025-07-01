import { z } from "zod";

export const courseLevels = ["PRINCIPIANTE", "INTERMEDIO", "AVANZADO"] as const;
export const courseStatuses = ["BORRADOR", "PUBLICADO", "ARCHIVADO"] as const;
export const courseSchema = z.object({
  title: z.string().min(3, { message: "El título es muy corto." }).max(100),
  description: z.string().min(3, { message: "La descripción es muy corta." }),
  fileKey: z.string().min(1, { message: "El archivo es requerido." }),
  price: z
    .number()
    .min(0, { message: "El precio debe ser mayor o igual que 0." })
    .optional(),
  duration: z.coerce
    .number()
    .min(1, { message: "La duración debe ser mayor que 0." })
    .max(500),
  level: z.enum(courseLevels, { message: "Nivel no válido." }),
  category: z.string(),
  smallDescription: z
    .string()
    .min(3, { message: "La descripción tiene que ser mayor a 3 caracteres." })
    .max(200),
  slug: z.string().min(3, { message: "El slug es muy corto." }),
  status: z.enum(courseStatuses, { message: "Estado no válido." }),
});
