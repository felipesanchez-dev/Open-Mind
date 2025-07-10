import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConstructUrl } from "@/hooks/use-construct";
import { Clock, Delete, Edit2Icon, Eye, MoreVertical, Pencil, School, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  data: AdminCourseType;
}

export function AdminCourseCard({ data }: iAppProps) {
  const thumbnailUrl = useConstructUrl(data.fileKey);
  return (
    <Card className="group w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="relative w-full h-52 overflow-hidden">
        <div className="absolute top-2 right-2 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon">
                <MoreVertical size="4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem asChild className="cursor-pointer  ">
                <Link href={`/admin/courses/${data.id}/edit`}>
                  <Pencil size="1" /> Editar Curso
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer  ">
                <Link href={`/courses/${data.slug}`}>
                  <Eye size="1" /> Ver curso
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer bg-red-900">
                <Link href={`admin/courses/${data.id}/delete`}>
                  <Trash size="1" className="text-white" /> Eliminar curso
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Image
          src={thumbnailUrl}
          alt={data.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <div className="absolute top-3 right-70">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            {data.status || "Activo"}
          </span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight min-h-[3.5rem]">
            {data.title}
          </h3>

          {data.smallDescription && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
              {data.smallDescription}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{data.duration}h </span>
          </div>
          <div className="flex items-center gap-1">
            <School className="w-4 h-4" />
            <span>{data.level}</span>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href={`/admin/courses/${data.id}`}
            className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Edit2Icon className="w-4 h-4 mr-2" />
            Editar Curso
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
