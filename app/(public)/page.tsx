"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
  ArrowRight,
  Play,
  BookOpen,
  Sparkles,
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

interface featureProps {
  title: string;
  description: string;
  icon: string;
}

const feature: featureProps[] = [
  {
    title: "Aprende a tu ritmo",
    description: "Cursos diseñados para adaptarse a tu estilo de aprendizaje",
    icon: "🌍",
  },
  {
    title: "Sin límites",
    description: "Acceso a una amplia variedad de cursos sin restricciones",
    icon: "🚀",
  },
  {
    title: "Sin barreras",
    description: "Plataforma accesible desde cualquier dispositivo",
    icon: "🔓",
  },
  {
    title: "Sin precios absurdos",
    description: "Cursos asequibles y de alta calidad",
    icon: "💰",
  },
];

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
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
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

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % feature.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToFeature = (index: number) => {
    setCurrentFeature(index);
    setIsAutoPlaying(false);
  };

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

      {/* Seccion de cursos recomendados  */}
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
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <img
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=30&h=30&fit=crop&crop=face"
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

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16 px-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                ¿Por qué elegir Open Mind?
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
              Características que nos hacen
              <span className="text-primary ml-2">únicos</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre lo que hace de Open Mind la mejor plataforma para tu
              crecimiento personal y profesional.
            </p>
          </div>

          <div className="relative">
            <div className="relative min-h-[20rem] sm:min-h-[28rem] mb-10">
              <div className="absolute inset-0 overflow-visible rounded-2xl">
                {feature.map((feat, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                      index === currentFeature
                        ? "opacity-100 translate-x-0 scale-100 z-10"
                        : "opacity-0 translate-x-10 scale-95 pointer-events-none"
                    }`}
                  >
                    <Card className="h-full bg-card border-primary/20 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="flex flex-col items-center justify-center h-full p-8 sm:p-12 text-center">
                        <div className="mb-8 relative">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
                            <span className="text-4xl sm:text-6xl">
                              {feat.icon}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                          {feat.title}
                        </h3>
                        <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
                          {feat.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 mb-8">
            {feature.map((_, index) => (
              <button
                key={index}
                onClick={() => goToFeature(index)}
                aria-label={`Ir a la característica ${index + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 ring-offset-2 ring-primary/50 ${
                  index === currentFeature
                    ? "bg-primary scale-125 shadow-md"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
            {feature.map((feat, index) => (
              <button
                key={index}
                onClick={() => goToFeature(index)}
                className={`p-6 rounded-xl transition-all duration-300 text-left group ${
                  index === currentFeature
                    ? "bg-primary/10 border-2 border-primary/30 shadow-md scale-[1.02]"
                    : "bg-card border border-border hover:bg-card/80 hover:border-primary/20 hover:shadow-lg"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </span>
                  <h4
                    className={`font-semibold text-base ${
                      index === currentFeature
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {feat.title}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feat.description}
                </p>
              </button>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none ${
                isAutoPlaying
                  ? "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15"
                  : "bg-muted/50 text-muted-foreground border border-border hover:bg-muted"
              }`}
            >
              {isAutoPlaying ? "Pausar" : "Reproducir"} presentación
            </button>
          </div>
        </div>
      </section>

      {/* Sección de Creditos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <GraduationCap className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Creditos y reconocimientos
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
              Desarrollador por
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Conoce a la persona detrás de Open Mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8">
            <div className="group relative">
              <Card className="relative h-full bg-card border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 mx-auto">
                      <img
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face"
                        alt="Dr. Alberto Martínez"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    ING. Felipe Reyes Sanchez
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    Software Engineer
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    FULL STACK DEVELOPER
                  </p>

                  <div className="flex justify-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      JavaScript
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      TypeScript
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      React
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Node.js
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Next.js
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      Architecture Software
                    </Badge>
                  </div>
                </CardContent>
              </Card>
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
