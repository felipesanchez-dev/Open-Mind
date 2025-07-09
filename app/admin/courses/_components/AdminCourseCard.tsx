import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { Card, CardContent } from "@/components/ui/card";
import { useConstructUrl } from "@/hooks/use-construct";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  data: AdminCourseType;
}

export function AdminCourseCard({ data }: iAppProps) {
  const thumbnailUrl = useConstructUrl(data.fileKey);
  return (
    <Card className="group relative hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden border-0 bg-gradient-to-br from-background to-muted/30">
      <div className="relative">
        <Image
          src={thumbnailUrl}
          alt={data.title}
          width={400}
          height={300}
          className="w-[600px] h-[300px] aspect-video object-cover transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-2 right-2 bg-green-500/90 text-white text-xs px-2 py-0.5 rounded-full font-medium backdrop-blur-sm">
          {data.status}
        </div>
      </div>

      <CardContent className="p-3 space-y-2">
        <Link
          href={`/admin/courses/${data.id}`}
          className="font-semibold text-base line-clamp-2 hover:text-primary transition-colors duration-200 block leading-tight"
        >
          {data.title}
        </Link>

        <div className="flex gap-2 pt-1">
          <Link
            href={`/admin/courses/${data.id}`}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium py-1.5 px-2 rounded-md transition-colors duration-200 text-center"
          >
            Editar
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
