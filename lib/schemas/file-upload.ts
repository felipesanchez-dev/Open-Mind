import { z } from "zod";

export const fileUploadSchema = z.object({
  fileName: z.string().min(1, { message: "File name is required" }),
  contentType: z.string().min(1, { message: "Content type is required" }),
  size: z.number().min(1, { message: "File size must be greater than 0" }),
  isImage: z.boolean(),
});

export type FileUploadInput = z.infer<typeof fileUploadSchema>;
