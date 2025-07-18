import { z } from "zod";

export const courseLevels = ["PRINCIPIANTE", "INTERMEDIO", "AVANZADO"] as const;

export const courseStatuses = ["BORRADOR", "PUBLICADO", "ARCHIVADO"] as const;

export const courseCategories = [
  "Programación",
  "Diseño",
  "Marketing",
  "Negocios",
  "IT y Software",
  "IA y Machine Learning",
] as const;

export const courseLevel = ["PRINCIPIANTE", "INTERMEDIO", "AVANZADO"] as const;

export const courseStatus = ["BORRADOR", "PUBLICADO", "ARCHIVADO"] as const;

export const courseSchema = z.object({
  title: z.string().min(3, { message: "Ingrese un titulo valido." }).max(100),
  description: z.string().min(3, { message: "La descripción es muy corta." }),
  fileKey: z.string().min(1, { message: "El archivo es requerido." }),
  price: z
    .number()
    .min(0, { message: "El precio debe ser mayor o igual que 0." }),
  duration: z.coerce
    .number()
    .min(1, { message: "La duración debe ser mayor que 0." })
    .max(500),
  level: z.enum(courseLevels, { message: "Nivel no válido." }),
  category: z.enum(courseCategories, {
    message: "Categoría no válida.",
  }),
  smallDescription: z
    .string()
    .min(3, { message: "La descripción tiene que ser mayor a 3 caracteres." })
    .max(200),
  slug: z.string().min(3, { message: "La URL no es válida." }),
  status: z.enum(courseStatuses, { message: "Estado no válido." }),
});

export type courseSchemaType = z.infer<typeof courseSchema>;
