"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award, GraduationCap, Target, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function CreditsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 via-muted/20 to-background" id="credits">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Créditos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Desarrollado por
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-1">
          <div className="lg:col-span-2">
            <div className="sticky top-30 group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105" />
              <Link href="https://felipesanchezdev.site/about-me">
                <Card className="w-full top-24 max-w-md h-auto bg-card/95 backdrop-blur-md border border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                  <CardContent className="relative p-8 lg:p-5 text-center">
                    <div className="relative inline-block mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 blur-md group-hover:opacity-40 transition-all duration-300 animate-pulse" />
                      <div className="relative w-28 h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden ring-4 ring-primary/30 group-hover:ring-primary/50 transition-all duration-300 mx-auto shadow-xl">
                        <img
                          src="/assets/me.webp"
                          alt="Felipe Reyes Sanchez"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full border-4 border-background flex items-center justify-center shadow-lg">
                        <Award className="w-5 h-5 text-yellow-400 animate-pulse" />
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      <h3 className="text-xl lg:text-2xl font-black text-foreground group-hover:text-primary transition-colors duration-300">
                        Felipe Reyes Sanchez
                      </h3>
                      <div className="space-y-2">
                        <p className="text-primary font-bold text-base lg:text-lg bg-primary/10 px-4 py-2 rounded-full inline-block">
                          Software Engineer
                        </p>
                        <p className="text-muted-foreground font-medium uppercase tracking-wider text-xs lg:text-sm">
                          Full Stack Developer
                        </p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex flex-wrap justify-center gap-2">
                        {[
                          "TypeScript",
                          "React",
                          "Next.js",
                          "Node.js",
                          "Tailwind CSS",
                          "GitHub",
                          "MongoDB",
                          "PostgreSQL",
                          "Architecture Software",
                        ].map((skill) => (
                          <Badge
                            key={skill}
                            variant="outline"
                            className="text-xs hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">3+</div>
                        <div className="text-xs text-muted-foreground">
                          Años Exp.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-8 min-h-screen">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/30 transition-all duration-300 group">
                <Target className="w-5 h-5 text-primary group-hover:animate-pulse" />
                <span className="text-sm font-bold text-primary">
                  Mi Visión Transformadora
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground leading-tight">
                Transformando la educación en América Latina
              </h3>

              <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/20 hover:border-primary/30 transition-all duration-300">
                <p className="text-foreground font-medium mb-2 text-lg">
                  🎯 La Historia
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-foreground">Open Mind</strong> es mi
                  proyecto personal, una iniciativa nacida con el propósito de
                  <span className="text-primary font-semibold">
                    {" "}
                    transformar la educación
                  </span>{" "}
                  en América Latina y más allá.
                </p>
                <p className="text-sm text-muted-foreground/80">
                  Todo comenzó cuando me di cuenta de las barreras que existen
                  en el acceso a educación de calidad en tecnología.
                </p>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-xl border border-primary/20 hover:border-primary/30 transition-all duration-300">
              <p className="text-foreground font-medium mb-2 text-lg">
                💡 El Sueño
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Mi sueño es construir una plataforma{" "}
                <span className="text-foreground font-semibold">
                  abierta, accesible y gratuita
                </span>{" "}
                para todas las personas que quieran aprender programación,
                matemáticas, física o cualquier rama de la tecnología.
              </p>
              <p className="text-sm text-muted-foreground/80">
                Imagino un mundo donde el conocimiento no tenga fronteras.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/20 hover:border-primary/30 transition-all duration-300">
              <p className="text-foreground font-medium mb-2 text-lg">
                🚀 La Misión
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Quiero{" "}
                <span className="text-primary font-semibold">
                  romper barreras, cerrar brechas de conocimiento
                </span>{" "}
                y abrir fronteras educativas, llevando el aprendizaje a quienes
                más lo necesitan, sin importar su contexto.
              </p>
              <p className="text-sm text-muted-foreground/80">
                Cada línea de código está pensada para acercarnos más a este
                objetivo.
              </p>
            </div>

            <div className="relative p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="relative flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-3">
                  <p className="text-lg font-bold text-foreground">
                    🌟 Un impacto que trasciende fronteras
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Este proyecto está hecho por{" "}
                    <span className="text-primary font-bold">
                      una sola persona
                    </span>
                    , pero con la ambición de impactar a{" "}
                    <span className="text-foreground font-bold">miles</span>. Es
                    mi forma de aportar a un mundo más educado, más libre y con
                    más oportunidades reales para todos.
                  </p>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-sm font-semibold text-primary">
                      <TrendingUp className="w-4 h-4" />
                      Creciendo cada día
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
