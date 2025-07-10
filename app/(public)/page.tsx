"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
  ArrowRight,
  Play,
  BookOpen,
  Star,
  Quote,
  Users,
  GraduationCap,
  TrendingUp,
  Clock,
  Award,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRipple } from "@/hooks/use-ripple";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const { data: session } = authClient.useSession();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [particleCount, setParticleCount] = useState(20);
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      left: string;
      top: string;
      animationDelay: string;
      animationDuration: string;
    }>
  >([]);
  const createRipple = useRipple();

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    const handleResize = () => {
      setParticleCount(window.innerWidth > 768 ? 20 : 10);
    };

    handleResize();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", isVisible ? handleResize : () => {});

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isClient) {
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${3 + Math.random() * 1}s`,
      }));
      setParticles(newParticles);
    }
  }, [isClient, particleCount]);

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-background">
        <div
          className="fixed w-3 h-3 bg-primary rounded-full pointer-events-none z-50 opacity-50 transition-opacity duration-300"
          style={{
            left: mousePosition.x - 6,
            top: mousePosition.y - 6,
            opacity: mousePosition.x > 0 ? 0.5 : 0,
          }}
        />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/5 blur-3xl animate-pulse" />
          <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />

          {isClient &&
            particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.animationDelay,
                  animationDuration: particle.animationDuration,
                }}
              />
            ))}
        </div>
        {/* Sección Principal */}
        <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full text-center max-w-4xl mx-auto">
              <div className="space-y-6 sm:space-y-8">
                <div className="flex justify-center animate-fade-in-up">
                  <Badge
                    variant="outline"
                    className="px-4 py-2 text-sm sm:text-base bg-primary/5 border-primary/20 hover:bg-primary/10 transition-all duration-300 cursor-pointer backdrop-blur-sm"
                  >
                    <span className="font-semibold text-primary">
                      Aprende a tu ritmo en Open Mind ✨
                    </span>
                  </Badge>
                </div>

                <div className="space-y-4 animate-fade-in-up animation-delay-200">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-black tracking-tight leading-tight">
                    <span className="block text-foreground/90 mb-2">
                      Libera tu potencial en
                    </span>
                    <span className="text-primary font-black">Open Mind</span>
                  </h1>

                  <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed px-4">
                    Descubre una nueva forma de aprender{" "}
                    <span className="text-foreground font-semibold">
                      sin límites
                    </span>
                    ,{" "}
                    <span className="text-foreground font-semibold">
                      sin barreras
                    </span>{" "}
                    y{" "}
                    <span className="text-foreground font-semibold">
                      sin precios absurdos
                    </span>
                  </p>
                </div>

                <div className="flex justify-center gap-8 sm:gap-12 py-6 animate-fade-in-up animation-delay-400">
                  <div className="text-center group cursor-pointer">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary group-hover:scale-110 transition-transform">
                      15k+
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      Estudiantes
                    </div>
                  </div>
                  <div className="text-center group cursor-pointer">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary group-hover:scale-110 transition-transform">
                      50+
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      Cursos
                    </div>
                  </div>
                  <div className="text-center group cursor-pointer">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary group-hover:scale-110 transition-transform">
                      95%
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      Satisfacción
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-600 px-4">
                  <Link href="/courses" className="group w-full sm:w-auto">
                    <Button
                      size="lg"
                      onClick={createRipple}
                      className="w-full sm:w-auto px-8 py-4 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    >
                      <BookOpen className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                      <span className="hidden sm:inline">Explorar Cursos</span>
                      <span className="sm:hidden">Cursos</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  {!session && (
                    <Link href="/login" className="group w-full sm:w-auto">
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={createRipple}
                        className="w-full sm:w-auto px-8 py-4 text-base font-semibold border-2 border-primary/30 hover:border-primary/50 bg-background hover:bg-primary/5 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                      >
                        <Play className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                        <span className="hidden sm:inline">
                          Comenzar Gratis
                        </span>
                        <span className="sm:hidden">Comenzar</span>
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Sección de cursos recomendados  */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
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

      {/* Sección de Créditos - Mejorada */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-muted/30 via-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/5 rounded-full blur-3xl animate-pulse opacity-70" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-l from-primary/5 to-secondary/10 rounded-full blur-3xl animate-pulse opacity-70" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/5 rounded-full blur-2xl animate-pulse opacity-40" />

          <div
            className="absolute top-20 left-10 w-2 h-2 bg-primary/30 rounded-full animate-float"
            style={{ animationDelay: "0s", animationDuration: "6s" }}
          />
          <div
            className="absolute top-40 right-20 w-1 h-1 bg-secondary/40 rounded-full animate-float"
            style={{ animationDelay: "2s", animationDuration: "8s" }}
          />
          <div
            className="absolute bottom-32 left-1/4 w-3 h-3 bg-primary/20 rounded-full animate-float"
            style={{ animationDelay: "1s", animationDuration: "7s" }}
          />
          <div
            className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-secondary/30 rounded-full animate-float"
            style={{ animationDelay: "3s", animationDuration: "5s" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-8 hover:border-primary/30 transition-all duration-300 group">
              <GraduationCap className="w-5 h-5 text-primary animate-pulse group-hover:animate-spin transition-all duration-300" />
              <span className="text-sm font-semibold text-primary">
                Créditos y reconocimientos
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-8 leading-tight">
              Desarrollado por
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Conoce la historia detrás de Open Mind y la{" "}
              <span className="text-primary font-semibold">
                visión transformadora
              </span>{" "}
              que impulsa este proyecto
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2 group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105" />
              <Card className="relative h-full bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                <CardContent className="relative p-10 text-center">
                  <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 blur-md group-hover:opacity-40 transition-all duration-300 animate-pulse" />
                    <div className="relative w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary/30 group-hover:ring-primary/50 transition-all duration-300 mx-auto shadow-xl">
                      <img
                        src="/assets/me.webp"
                        alt="Felipe Reyes Sanchez"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full border-4 border-background flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                      <Award className="w-6 h-6 text-yellow-400 animate-pulse" />
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors duration-300">
                      ING. Felipe Reyes Sanchez
                    </h3>
                    <div className="space-y-2">
                      <p className="text-primary font-bold text-lg bg-primary/10 px-4 py-2 rounded-full inline-block">
                        Software Engineer
                      </p>
                      <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">
                        Full Stack Developer
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {[
                      "JavaScript",
                      "TypeScript",
                      "React",
                      "Node.js",
                      "Next.js",
                      "Tailwind CSS",
                      "Bases de datos",
                      "Architecture",
                    ].map((skill, index) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-xs hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:scale-105"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">3+</div>
                      <div className="text-xs text-muted-foreground">
                        Años Exp.
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">24/7</div>
                      <div className="text-xs text-muted-foreground">
                        Dedicación
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/30 transition-all duration-300 group">
                  <Target className="w-5 h-5 text-primary group-hover:animate-pulse" />
                  <span className="text-sm font-bold text-primary">
                    Mi Visión Transformadora
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-foreground leading-tight">
                  Transformando la educación en América Latina
                </h3>
              </div>

              <div className="space-y-6 text-muted-foreground leading-relaxed text-base">
                <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/20 hover:border-primary/30 transition-all duration-300 group">
                  <p className="text-foreground font-medium mb-2 text-lg">
                    🎯 La Historia
                  </p>
                  <p>
                    <strong className="text-foreground">Open Mind</strong> es mi
                    proyecto personal, una iniciativa nacida con el propósito de
                    <span className="text-primary font-semibold">
                      {" "}
                      transformar la educación
                    </span>{" "}
                    en América Latina y más allá.
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-xl border border-primary/20 hover:border-primary/30 transition-all duration-300 group">
                  <p className="text-foreground font-medium mb-2 text-lg">
                    💡 El Sueño
                  </p>
                  <p>
                    Mi sueño es construir una plataforma{" "}
                    <span className="text-foreground font-semibold">
                      abierta, accesible y gratuita
                    </span>{" "}
                    para todas las personas que quieran aprender programación,
                    matemáticas, física o cualquier rama de la tecnología.
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/20 hover:border-primary/30 transition-all duration-300 group">
                  <p className="text-foreground font-medium mb-2 text-lg">
                    🚀 La Misión
                  </p>
                  <p>
                    Quiero{" "}
                    <span className="text-primary font-semibold">
                      romper barreras, cerrar brechas de conocimiento
                    </span>{" "}
                    y abrir fronteras educativas, llevando el aprendizaje a
                    quienes más lo necesitan, sin importar su contexto.
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-xl border border-primary/20 hover:border-primary/30 transition-all duration-300 group">
                  <p className="text-foreground font-medium mb-2 text-lg">
                    ❤️ La Filosofía
                  </p>
                  <p>
                    No creo en los modelos tradicionales rígidos. Open Mind
                    ofrecerá una
                    <span className="text-foreground font-semibold">
                      {" "}
                      experiencia práctica, cercana y humana
                    </span>
                    , donde aprender sea
                    <span className="text-primary font-black text-lg">
                      {" "}
                      un derecho, no un privilegio
                    </span>
                    .
                  </p>
                </div>
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
                      <span className="text-foreground font-bold">miles</span>.
                      Es mi forma de aportar a un mundo más educado, más libre y
                      con más oportunidades reales para todos.
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

              {/* Estadísticas inspiradoras mejoradas */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6">
                <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 group">
                  <div className="text-3xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    100%
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Gratuito
                  </div>
                </div>
                <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 group">
                  <div className="text-3xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    ∞
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Sin límites
                  </div>
                </div>
                <div className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 group">
                  <div className="text-3xl font-black text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    Desarrollador
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
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
              Descubre cómo Open Mind ha transformado la vida profesional de
              miles de estudiantes alrededor del mundo.
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
                    "Open Mind cambió mi carrera completamente. En 6 meses pasé
                    de ser un principiante a conseguir mi primer trabajo como
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
                    últimas tendencias y las herramientas prácticas me ayudaron
                    a generar un ROI del 300% en mi empresa."
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
    </>
  );
}
