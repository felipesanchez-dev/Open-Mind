"use client";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Star,
  Quote,
  Users,
  TrendingUp,
  Award,
  Target,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden" id="testimonials">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Quote className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">
              Lo que dicen nuestros estudiantes
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
            Testimonios que
            <span className="text-primary ml-2">inspiran</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Descubre cómo Open Mind ha transformado la vida profesional de miles
            de estudiantes alrededor del mundo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Testimonio 1 */}
          <div className="group relative">
            <Card className="relative h-full bg-card border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                        alt="Juan Pérez"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Juan Pérez
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Desarrollador Full Stack
                    </p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "Open Mind cambió mi carrera completamente. En 6 meses pasé de
                  ser un principiante a conseguir mi primer trabajo como
                  desarrollador. Los proyectos prácticos fueron clave."
                </p>
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <TrendingUp className="w-4 h-4" />
                  <span>Aumento salarial del 150%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Testimonio 2 */}
          <div className="group relative">
            <Card className="relative h-full bg-card border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                      <img
                        src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                        alt="María Gómez"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      María Gómez
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Diseñadora UX/UI
                    </p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "La metodología de Open Mind es increíble. Los instructores
                  son profesionales activos en la industria y los proyectos te
                  preparan para el mundo real."
                </p>
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <Award className="w-4 h-4" />
                  <span>Contratada en Google</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Testimonio 3 */}
          <div className="group relative">
            <Card className="relative h-full bg-card border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                        alt="Carlos López"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      Carlos López
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Marketing Manager
                    </p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-6">
                  "Increíble plataforma. Los cursos están actualizados con las
                  últimas tendencias y las herramientas prácticas me ayudaron a
                  generar un ROI del 300% en mi empresa."
                </p>
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <Target className="w-4 h-4" />
                  <span>ROI del 300%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            className="cursor-pointer px-8 py-4 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group"
          >
            <Users className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Únete a nuestra comunidad
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
