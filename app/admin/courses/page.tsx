import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function CoursesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Tus cursos</h1>
        <Link
          href="/admin/courses/create"
          className={buttonVariants({ variant: "default" })}
        >
          Crear curso
        </Link>
      </div>
      <div className=" rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
        <p className="text-lg font-medium">Aquí verás todos tus cursos</p>
        <p className="text-sm mt-2 text-muted-foreground">Comienza creando tu primer curso</p>
      </div>
    </div>
  );
}
