"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Star,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function RecommendedCoursesSection() {
  return (
   <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden pb-40" id="recommended-courses">
           <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
           </div>
   
           <div className="relative max-w-7xl mx-auto">
             <div className="text-center mb-16">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                 <BookOpen className="w-4 h-4 text-primary animate-pulse" />
                 <span className="text-sm font-medium text-primary">
                   Cursos recomendados
                 </span>
               </div>
               <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
                 Catálogo de
                 <span className="text-primary ml-2">cursos</span>
               </h2>
               <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                 Descubre nuestros cursos diseñados por expertos y actualizados
                 constantemente con las últimas tendencias del mercado.
               </p>
             </div>
   
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
               <div className="group relative">
                 <Card className="relative h-full bg-card border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 overflow-hidden">
                   <div className="relative h-48 bg-primary/10 overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                     <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                       Nuevo
                     </div>
                     <div className="absolute bottom-4 left-4 text-white">
                       <div className="flex items-center gap-2 mb-2">
                         <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                           <BookOpen className="w-3 h-3" />
                         </div>
                         <span className="text-sm font-medium">12 módulos</span>
                       </div>
                       <div className="flex items-center gap-2">
                         <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                           <Clock className="w-3 h-3" />
                         </div>
                         <span className="text-sm font-medium">2 horas</span>
                       </div>
                     </div>
                   </div>
                   <CardContent className="p-6">
                     <div className="flex items-center gap-2 mb-3">
                       <Badge
                         variant="outline"
                         className="text-xs border-primary/30"
                       >
                         Desarrollo Web
                       </Badge>
                       <Badge
                         variant="outline"
                         className="text-xs border-green-500/30 text-green-600"
                       >
                         Principiante
                       </Badge>
                     </div>
                     <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                       Desarrollo Web Full Stack
                     </h3>
                     <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                       Aprende React, Node.js, MongoDB y más. Desde cero hasta
                       crear aplicaciones web completas y profesionales.
                     </p>
                     <div className="flex items-center gap-4 mb-4" id="#creditos">
                       <div className="flex items-center gap-1">
                         <img
                           src="/assets/me.webp"
                           alt="Instructor"
                           className="w-6 h-6 rounded-full"
                         />
                         <span className="text-sm font-medium">
                           Felipe Reyes Sanchez
                         </span>
                       </div>
                       <div className="flex items-center gap-1">
                         <Star className="w-4 h-4 text-yellow-400 fill-current" />
                         <span className="text-sm font-medium">4.9</span>
                       </div>
                     </div>
                     <div className="flex items-center justify-between">
                       <div className="flex items-center gap-2">
                         <span className="text-2xl font-bold text-primary">
                           $0
                         </span>
                         <span className="text-sm text-muted-foreground line-through">
                           $100
                         </span>
                       </div>
                       <Button
                         size="sm"
                         className="bg-primary hover:bg-primary/90 text-primary-foreground group-hover:scale-105 transition-transform cursor-pointer"
                       >
                         Inscribirme
                       </Button>
                     </div>
                   </CardContent>
                 </Card>
               </div>
             </div>
   
             <div className="text-center">
               <Link href="/courses">
                 <Button
                   size="lg"
                   className="px-8 py-4 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group cursor-pointer"
                 >
                   <BookOpen className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                   Ver todos los cursos
                   <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                 </Button>
               </Link>
             </div>
           </div>
         </section>
  );
}
