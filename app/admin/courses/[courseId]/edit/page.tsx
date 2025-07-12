import { adminGetCourse } from "@/app/data/admin/admin-get-course";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditCourseForm } from "./_components/EditCourseForm";

type Params = Promise<{ courseId: string }>;

export default async function EditRoute({ params }: { params: Params }) {
  const { courseId } = await params;
  const data = await adminGetCourse(courseId);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Curso a editar:{" "}
        <span className="text-primary underline">{data.title}</span>
      </h1>
      <Tabs defaultValue="basic-info">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="basic-info">Informacion del curso</TabsTrigger>
          <TabsTrigger value="course-structure">
            Estructura del curso
          </TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Informacion basica del curso</CardTitle>
              <CardDescription>
                Aqui puedes editar la informacion basica del curso, como el
                titulo, descripcion, etc.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <EditCourseForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
