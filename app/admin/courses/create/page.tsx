"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { courseSchema, courseSchemaType } from "@/lib/zodShemas";
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
import slugify from "slugify";

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
      category: "",
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

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Información del curso</CardTitle>
          <CardDescription>
            Completa los detalles básicos para crear tu curso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-6">
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

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem className="lg:col-span-4">
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
                    className="h-11 px-4"
                    onClick={() => {
                      const titleValue = form.getValues("title");
                      const slug = slugify(titleValue, {
                        lower: true,
                        strict: true,
                      });
                      form.setValue("slug", slug, { shouldValidate: true });
                    }}
                  >
                    <SparkleIcon className="w-4 h-4 mr-2" />
                    Generar
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
                          placeholder="Escribe una breve descripción que explique de qué trata tu curso..."
                          className="min-h-[140px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
