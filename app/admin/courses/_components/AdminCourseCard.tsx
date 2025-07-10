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
import {
  Clock,
  Edit2Icon,
  Eye,
  MoreVertical,
  Pencil,
  School,
  Trash,
} from "lucide-react";
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
        <div className="absolute top-3 right-3 z-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="w-8 h-8 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg p-1"
            >
              <DropdownMenuItem
                asChild
                className="cursor-pointer rounded-md hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors duration-200 group/item"
              >
                <Link
                  href={`/admin/courses/${data.id}/edit`}
                  className="flex items-center gap-3 px-3 py-2"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center group-hover/item:bg-blue-200 dark:group-hover/item:bg-blue-800/50 transition-colors">
                    <Pencil className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Editar Curso
                  </span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="cursor-pointer rounded-md hover:bg-green-50 dark:hover:bg-green-950/50 transition-colors duration-200 group/item"
              >
                <Link
                  href={`/courses/${data.slug}`}
                  className="flex items-center gap-3 px-3 py-2"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center group-hover/item:bg-green-200 dark:group-hover/item:bg-green-800/50 transition-colors">
                    <Eye className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Ver Curso
                  </span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-2 bg-gray-200 dark:bg-gray-700" />

              <DropdownMenuItem
                asChild
                className="cursor-pointer rounded-md hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors duration-200 group/item"
              >
                <Link
                  href={`admin/courses/${data.id}/delete`}
                  className="flex items-center gap-3 px-3 py-2"
                >
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center group-hover/item:bg-red-200 dark:group-hover/item:bg-red-800/50 transition-colors">
                    <Trash className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Eliminar Curso
                  </span>
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

        <div className="absolute bottom-3 left-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100/90 text-green-800 dark:bg-green-900/90 dark:text-green-200 backdrop-blur-sm border border-green-200/50 dark:border-green-700/50 shadow-sm">
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
