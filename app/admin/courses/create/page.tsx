import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CourseCreationPage() {
    return (
        <>
        <div className="flex items-center gap-4">
            <Link href="/admin/courses" className={buttonVariants({
                variant: "outline",
                size: "icon",
            })}>
                <ArrowLeft className="size-5" />
            </Link>
            <h1 className="text-2xl font-bold">Crear un curso</h1>
        </div>

            <Card>
                <CardHeader>
                    <CardTitle>Información basica del curso</CardTitle>
                    <CardDescription>Información básica sobre el curso del curso</CardDescription>
                </CardHeader>
                <CardContent>
                    
                </CardContent>

            </Card>


        </>
    )
}