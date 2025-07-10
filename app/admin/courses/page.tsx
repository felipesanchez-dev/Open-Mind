import { adminGetCourses } from "@/app/data/admin/admin-get-courses";
import Link from "next/link";
import { AdminCourseCard } from "./_components/AdminCourseCard";
import { FilePlus } from "lucide-react";

export default async function CoursesPage() {
  const data = await adminGetCourses();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className=" border-gray-200">
        <div className="container mx-auto py-6 px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Mis Cursos
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Gestiona y edita tus cursos
              </p>
            </div>
            <Link
              href="/admin/courses/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FilePlus className="w-4 h-4 mr-2" />
              Crear Nuevo Curso
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        {data.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No tienes cursos aún
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Comienza creando tu primer curso para compartir conocimiento.
            </p>
            <Link
              href="/admin/courses/create"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Crear Mi Primer Curso
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((course) => (
              <AdminCourseCard key={course.id} data={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
