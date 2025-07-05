"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  courseCategories,
  courseSchema,
  courseSchemaType,
  courseLevels,
  courseStatuses,
} from "@/lib/zodShemas";
import { ArrowLeft, SparkleIcon } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import slugify from "slugify";
import { RichTextEditor } from "@/components/rich-text-editor/Editor";
import { Uploader } from "@/components/file-uploader/Uploader";

export default function CourseCreationPage() {
  const form = useForm<courseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      fileKey: "",
      price: 0,
      duration: 0,
      level: "PRINCIPIANTE",
      category: "Programación",
      status: "BORRADOR",
      slug: "",
      smallDescription: "",
    },
  });

  function onSubmit(values: courseSchemaType) {
    console.log(values);
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/courses"
          className={buttonVariants({
            variant: "outline",
            size: "icon",
          })}
        >
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="text-3xl font-bold">Crear nuevo curso</h1>
      </div>

      <Card className="w-full max-w-5xl mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Información del curso</CardTitle>
          <CardDescription>
            Completa los detalles básicos para crear tu curso
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título del curso</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: Introducción a React.js"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-4 gap-2 items-end">
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem className="col-span-3">
                          <FormLabel>URL del curso</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="introduccion-react-js"
                              className="h-11 font-mono text-sm"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-11"
                      onClick={() => {
                        const titleValue = form.getValues("title");
                        const slug = slugify(titleValue, {
                          lower: true,
                          strict: true,
                        });
                        form.setValue("slug", slug, { shouldValidate: true });
                      }}
                    >
                      <SparkleIcon className="w-4 h-4" />
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name="smallDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descripción corta</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Escribe una breve descripción..."
                            className="min-h-[100px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="fileKey"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Imagen del curso</FormLabel>
                        <FormControl>
                          <Uploader />
                          {/* <Input
                            placeholder="cursos/introduccion-react.jpg"
                            className="h-11"
                            {...field}
                          /> */}

                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Precio (COP)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="1000"
                              className="h-11"
                              {...field}
                              value={field.value === 0 ? "" : field.value}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(
                                  value === "" ? 0 : parseInt(value) || 0
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duración (hrs)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="3"
                              className="h-11"
                              {...field}
                              value={field.value === 0 ? "" : field.value}
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(
                                  value === "" ? 0 : parseInt(value) || 0
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoría</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Selecciona categoría" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {courseCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nivel</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Nivel" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {courseLevels.map((level) => (
                                <SelectItem key={level} value={level}>
                                  {level === "PRINCIPIANTE"
                                    ? "Principiante"
                                    : level === "INTERMEDIO"
                                      ? "Intermedio"
                                      : "Avanzado"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-11">
                                <SelectValue placeholder="Estado" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {courseStatuses.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status === "BORRADOR"
                                    ? "Borrador"
                                    : status === "PUBLICADO"
                                      ? "Publicado"
                                      : "Archivado"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción completa</FormLabel>
                    <FormControl>
                      <RichTextEditor field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  className="min-w-[100px]"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="min-w-[100px]">
                  Crear curso
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
