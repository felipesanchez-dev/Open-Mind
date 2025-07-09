import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AdminCourseCard } from "./_components/AdminCourseCard";

export default async function CoursesPage() {
  const data = await adminGetCourses();
  return (
    <>
    <div className="container mx-auto py-4 px-4">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold">Tus cursos</h1>
        <Link
          href="/admin/courses/create"
          className={buttonVariants({ variant: "outline" })}
        >
          Crear curso
        </Link>
      </div>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
      {data.map((course) => (
        <AdminCourseCard key={course.id} data={course} />
      ))}
    </div>
    </>
  
  );
}
