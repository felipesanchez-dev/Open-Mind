import { adminGetCourse } from "@/app/data/admin/admin-get-course";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { EditCourseForm } from "./_components/EditCourseForm";
import { ArrowLeft, BookOpen, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CourseStructure } from "./_components/CourseStructure";

type Params = Promise<{ courseId: string }>;

export default async function EditRoute({ params }: { params: Params }) {
  const { courseId } = await params;
  const data = await adminGetCourse(courseId);

  return (
    <div className="min-h-screen bg-gradient-to-br">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/courses" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver a cursos
              </Link>
            </Button>
          </div>
          
          <div className=" rounded-lg p-6 shadow-sm border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold">
                    Curso: <span className="text-muted-foreground font-bold">{data.title}</span>
                  </h1>
                  
                  <p className="text-muted-foreground mt-1">
                    Modifica la información y estructura del curso
                  </p>
                </div>
              </div>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {data.status}
              </Badge>
            </div>
            
          </div>
        </div>

        <Tabs defaultValue="basic-info" className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto  p-1 rounded-lg shadow-sm border">
            <TabsTrigger 
              value="basic-info" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Información del curso</span>
              <span className="sm:hidden">Info</span>
            </TabsTrigger>
            <TabsTrigger 
              value="course-structure"
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Estructura del curso</span>
              <span className="sm:hidden">Estructura</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic-info" className="space-y-6">
            <Card className=" shadow-sm border-0 shadow-slate-200/60 dark:shadow-slate-900/60">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2  rounded-lg">
                    <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      Información básica del curso
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Edita el título, descripción, precio y otros detalles fundamentales del curso
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <EditCourseForm data={data} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="course-structure" className="space-y-6">
            <Card className=" shadow-sm border-0 shadow-slate-200/60 dark:shadow-slate-900/60">
              <CardHeader className="pb-4">
                <CardTitle>Estructura del curso</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Aquí puedes gestionar los módulos, lecciones y recursos del curso
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <CourseStructure />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}