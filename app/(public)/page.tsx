"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { ArrowRight, Play, BookOpen, Sparkles, Star, Quote, Users, GraduationCap, TrendingUp, Clock, Award, Target } from "lucide-react";
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
      <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div
          className="fixed w-4 h-4 bg-gradient-to-r from-primary to-secondary rounded-full pointer-events-none z-50 opacity-60 blur-sm transition-opacity duration-300"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
            opacity: mousePosition.x > 0 ? 0.6 : 0,
          }}
        />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 blur-3xl animate-spin-slow" />
          <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-gradient-to-tr from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-bounce-slow" />

          {isClient &&
            particles.map((particle) => (
              <div
                key={particle.id}
                className="absolute w-2 h-2 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full animate-float"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.animationDelay,
                  animationDuration: particle.animationDuration,
                }}
              />
            ))}
        </div>

        <section className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-full text-center max-w-4xl mx-auto">
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                <div className="flex justify-center animate-fade-in-up">
                  <Badge
                    variant="outline"
                    className="px-4 py-2 text-sm sm:text-base bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20 hover:from-primary/20 hover:to-secondary/20 transition-all duration-500 cursor-pointer group backdrop-blur-sm"
                  >
                    <span className="font-semibold text-base sm:text-lg md:text-xl text-primary">
                      Aprende a tu ritmo en Open Mind ✨
                    </span>
                  </Badge>
                </div>

                <div className="space-y-2 animate-fade-in-up animation-delay-200">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-black tracking-tight leading-tight">
                    <span className="block text-foreground/90">
                      Libera tu potencial en
                    </span>
                    <span className="relative inline-block">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 blur-lg opacity-30 animate-pulse" />
                      <span className="relative font-black text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 bg-clip-text animate-gradient-x text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl">
                        Open Mind
                      </span>
                    </span>
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

                <div className="flex justify-center gap-6 sm:gap-8 py-3 animate-fade-in-up animation-delay-400">
                  <div className="text-center group cursor-pointer">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary group-hover:scale-110 transition-transform">
                      100+
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Estudiantes
                    </div>
                  </div>
                  <div className="text-center group cursor-pointer">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary group-hover:scale-110 transition-transform">
                      50+
                    </div>
                    <div className="text-xs text-muted-foreground">Cursos</div>
                  </div>
                  <div className="text-center group cursor-pointer">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-primary group-hover:scale-110 transition-transform">
                      100%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Satisfacción
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-fade-in-up animation-delay-600 px-4">
                  <Link href="/courses" className="group w-full sm:w-auto">
                    <Button
                      size="lg"
                      onClick={createRipple}
                      className="w-full sm:w-auto px-6 py-3 text-sm sm:text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 relative overflow-hidden"
                    >
                      <BookOpen className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                      <span className="hidden sm:inline">Explorar Cursos</span>
                      <span className="sm:hidden">Cursos</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  {session ? (
                    <></>
                  ) : (
                    <Link href="/login" className="group w-full sm:w-auto">
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={createRipple}
                        className="w-full sm:w-auto px-6 py-3 text-sm sm:text-base font-semibold border-2 border-primary/20 hover:border-primary/40 bg-background/50 backdrop-blur-sm hover:bg-primary/5 transition-all duration-500 transform hover:scale-105 group relative overflow-hidden"
                      >
                        <Play className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                        <span className="hidden sm:inline">
                          Comenzar Gratis
                        </span>
                        <span className="sm:hidden">Comenzar</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-primary/5 to-secondary/5 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-l from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-bounce" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-12 px-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                ¿Por qué elegir Open Mind?
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-4 leading-tight">
              Características que nos hacen únicos
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre lo que hace de Open Mind la mejor plataforma para tu
              crecimiento personal y profesional.
            </p>
          </div>

          <div className="relative">
            <div className="relative min-h-[20rem] sm:min-h-[28rem] mb-10">
              <div className="absolute inset-0 overflow-visible rounded-3xl">
                {feature.map((feat, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                      index === currentFeature
                        ? "opacity-100 translate-x-0 scale-100 z-10"
                        : "opacity-0 translate-x-10 scale-95 pointer-events-none"
                    }`}
                  >
                    <Card className="h-full bg-gradient-to-br from-card/50 via-card to-card/80 backdrop-blur-sm border-primary/20 shadow-xl">
                      <CardContent className="flex flex-col items-center justify-center h-full p-5 sm:p-10 text-center">
                        <div className="mb-6 relative flex flex-col items-center justify-center">
                          <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-4 sm:mb-6 animate-bounce">
                            <span className="text-3xl sm:text-5xl">
                              {feat.icon}
                            </span>
                          </div>
                          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-50 animate-pulse pointer-events-none" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                          {feat.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
            {feature.map((feat, index) => (
              <button
                key={index}
                onClick={() => goToFeature(index)}
                className={`p-4 sm:p-5 rounded-xl transition-all duration-300 text-left group ${
                  index === currentFeature
                    ? "bg-primary/10 border-2 border-primary/30 shadow-md scale-[1.03]"
                    : "bg-card/50 border border-border hover:bg-card/80 hover:border-primary/20"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </span>
                  <h4
                    className={`font-semibold text-sm sm:text-base ${
                      index === currentFeature
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {feat.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {feat.description}
                </p>
              </button>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none cursor-pointer ${
                isAutoPlaying
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-muted/50 text-muted-foreground border border-border"
              }`}
            >
              {isAutoPlaying ? "Pausar" : "Reproducir"} auto-avance
            </button>
          </div>
        </div>
      </section>

      {/* Sección de Cursos Destacados */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-bounce" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <BookOpen className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Cursos más populares
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
              Catálogo de
              <span className="relative inline-block ml-3">
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-lg animate-pulse" />
                <span className="relative text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                  excelencia
                </span>
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Descubre nuestros cursos más demandados, diseñados por expertos y actualizados constantemente con las últimas tendencias del mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Curso 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Card className="relative h-full bg-gradient-to-br from-card/50 via-card to-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
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
                      <span className="text-sm font-medium">25 horas</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">Desarrollo Web</Badge>
                    <Badge variant="outline" className="text-xs">Beginner</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    Desarrollo Web Full Stack
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    Aprende React, Node.js, MongoDB y más. Desde cero hasta crear aplicaciones web completas y profesionales.
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <img
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=30&h=30&fit=crop&crop=face"
                        alt="Instructor"
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm font-medium">Dr. Alberto Martínez</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">$49</span>
                      <span className="text-sm text-muted-foreground line-through">$99</span>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground group-hover:scale-105 transition-transform">
                      Inscribirme
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Curso 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Card className="relative h-full bg-gradient-to-br from-card/50 via-card to-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Bestseller
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <BookOpen className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-medium">8 módulos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <Clock className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-medium">20 horas</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">Diseño UX/UI</Badge>
                    <Badge variant="outline" className="text-xs">Intermediate</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    Diseño UX/UI Profesional
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    Domina Figma, Adobe XD y las mejores prácticas de diseño. Crea interfaces que enamoren a tus usuarios.
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=30&h=30&fit=crop&crop=face"
                        alt="Instructor"
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm font-medium">Dra. Elena Rodríguez</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">4.8</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">$39</span>
                      <span className="text-sm text-muted-foreground line-through">$79</span>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground group-hover:scale-105 transition-transform">
                      Inscribirme
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Curso 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Card className="relative h-full bg-gradient-to-br from-card/50 via-card to-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Trending
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <BookOpen className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-medium">15 módulos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                        <Clock className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-medium">35 horas</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">Data Science</Badge>
                    <Badge variant="outline" className="text-xs">Advanced</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    Data Science con Python
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    Domina Python, Machine Learning y AI. Desde análisis de datos hasta modelos predictivos avanzados.
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=30&h=30&fit=crop&crop=face"
                        alt="Instructor"
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="text-sm font-medium">Ing. Roberto Silva</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">4.9</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">$69</span>
                      <span className="text-sm text-muted-foreground line-through">$129</span>
                    </div>
                    <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground group-hover:scale-105 transition-transform">
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
                className="px-8 py-4 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group"
              >
                <BookOpen className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                Ver todos los cursos
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Beneficios */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-bounce" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                ¿Por qué elegir Open Mind?
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
              Beneficios que
              <span className="relative inline-block ml-3">
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-lg animate-pulse" />
                <span className="relative text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                  transforman
                </span>
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Descubre las ventajas exclusivas que hacen de Open Mind la mejor elección para tu crecimiento profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Beneficio 1 */}
            <div className="group relative p-8 bg-gradient-to-br from-card/50 via-card to-card/80 backdrop-blur-sm rounded-2xl border border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      Flexibilidad Total
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Aprende cuando y donde quieras
                    </p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Acceso 24/7 desde cualquier dispositivo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Descarga contenido para estudiar offline</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Progreso sincronizado entre dispositivos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Sin límites de tiempo para completar</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Beneficio 2 */}
            <div className="group relative p-8 bg-gradient-to-br from-card/50 via-card to-card/80 backdrop-blur-sm rounded-2xl border border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      Comunidad Activa
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Conecta con otros profesionales
                    </p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Foros de discusión especializados</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Networking con más de 15,000 estudiantes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Eventos virtuales y webinars exclusivos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Mentoría personalizada con expertos</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Beneficio 3 */}
            <div className="group relative p-8 bg-gradient-to-br from-card/50 via-card to-card/80 backdrop-blur-sm rounded-2xl border border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      Certificaciones Reconocidas
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Impulsa tu carrera profesional
                    </p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Certificados verificables por blockchain</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Reconocimiento por empresas líderes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Portfolio de proyectos reales</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Perfil profesional en LinkedIn</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Beneficio 4 */}
            <div className="group relative p-8 bg-gradient-to-br from-card/50 via-card to-card/80 backdrop-blur-sm rounded-2xl border border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      Aprendizaje Práctico
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Proyectos del mundo real
                    </p>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Proyectos basados en casos reales</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Evaluaciones y feedback inmediato</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Herramientas profesionales incluidas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Simuladores y entornos virtuales</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Garantía y estadísticas */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-2">30 días</div>
                <div className="text-sm text-muted-foreground">Garantía de devolución</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-2">85%</div>
                <div className="text-sm text-muted-foreground">Mejora salarial promedio</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-2">15k+</div>
                <div className="text-sm text-muted-foreground">Estudiantes satisfechos</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background via-primary/5 to-secondary/5 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-l from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-bounce" />
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
              <span className="relative inline-block ml-3">
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-lg animate-pulse" />
                <span className="relative text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                  inspiran
                </span>
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Descubre cómo Open Mind ha transformado la vida profesional de miles de estudiantes alrededor del mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Testimonio 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Card className="relative h-full bg-gradient-to-br from-card/50 via-card to-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
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
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    "Open Mind cambió mi carrera completamente. En 6 meses pasé de ser un principiante a conseguir mi primer trabajo como desarrollador. Los proyectos prácticos fueron clave."
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
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Card className="relative h-full bg-gradient-to-br from-card/50 via-card to-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
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
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    "La metodología de Open Mind es increíble. Los instructores son profesionales activos en la industria y los proyectos te preparan para el mundo real."
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
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Card className="relative h-full bg-gradient-to-br from-card/50 via-card to-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
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
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    "Increíble plataforma. Los cursos están actualizados con las últimas tendencias y las herramientas prácticas me ayudaron a generar un ROI del 300% en mi empresa."
                  </p>
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <Target className="w-4 h-4" />
                    <span>ROI del 300%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Estadísticas de impacto */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">15k+</div>
              <div className="text-sm text-muted-foreground">Estudiantes activos</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">95%</div>
              <div className="text-sm text-muted-foreground">Tasa de finalización</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">4.9/5</div>
              <div className="text-sm text-muted-foreground">Calificación promedio</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="w-16 h-16 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">85%</div>
              <div className="text-sm text-muted-foreground">Consiguen empleo</div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button 
              size="lg"
              className="px-8 py-4 text-base font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group"
            >
              <Users className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Únete a nuestra comunidad
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Sección de Instructores */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-l from-primary/10 to-secondary/10 rounded-full blur-3xl animate-bounce" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <GraduationCap className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Nuestro equipo
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-6 leading-tight">
              Instructores
              <span className="relative inline-block ml-3">
                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-lg animate-pulse" />
                <span className="relative text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text">
                  expertos
                </span>
              </span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Aprende de profesionales activos en la industria con años de experiencia en las mejores empresas del mundo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Instructor 1 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Card className="relative h-full bg-gradient-to-br from-card/50 via-card to-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
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
                    Dr. Alberto Martínez
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    Senior Software Architect
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ex-Google, 15 años de experiencia
                  </p>
                  <div className="flex justify-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">12</div>
                      <div className="text-xs text-muted-foreground">Cursos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">25k+</div>
                      <div className="text-xs text-muted-foreground">Estudiantes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">4.9</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2">
                    <Badge variant="outline" className="text-xs">JavaScript</Badge>
                    <Badge variant="outline" className="text-xs">React</Badge>
                    <Badge variant="outline" className="text-xs">Node.js</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Instructor 2 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Card className="relative h-full bg-gradient-to-br from-card/50 via-card to-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 mx-auto">
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face"
                        alt="Dra. Elena Rodríguez"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Dra. Elena Rodríguez
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    Lead UX Designer
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ex-Apple, 12 años de experiencia
                  </p>
                  <div className="flex justify-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">8</div>
                      <div className="text-xs text-muted-foreground">Cursos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">18k+</div>
                      <div className="text-xs text-muted-foreground">Estudiantes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">4.8</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2">
                    <Badge variant="outline" className="text-xs">Figma</Badge>
                    <Badge variant="outline" className="text-xs">UI/UX</Badge>
                    <Badge variant="outline" className="text-xs">Design</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Instructor 3 */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Card className="relative h-full bg-gradient-to-br from-card/50 via-card to-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <CardContent className="p-8 text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300 mx-auto">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
                        alt="Ing. Roberto Silva"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary rounded-full border-2 border-background flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Ing. Roberto Silva
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    Data Science Manager
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ex-Microsoft, 10 años de experiencia
                  </p>
                  <div className="flex justify-center gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">15</div>
                      <div className="text-xs text-muted-foreground">Cursos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">30k+</div>
                      <div className="text-xs text-muted-foreground">Estudiantes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-primary">4.9</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2">
                    <Badge variant="outline" className="text-xs">Python</Badge>
                    <Badge variant="outline" className="text-xs">ML</Badge>
                    <Badge variant="outline" className="text-xs">AI</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sección CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary via-primary/90 to-secondary relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 via-transparent to-white/5 animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-bounce" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            <span className="text-sm font-medium text-white">
              Únete a la revolución educativa
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
            ¿Listo para transformar tu
            <span className="relative inline-block ml-3">
              <span className="absolute inset-0 bg-white/20 blur-lg animate-pulse" />
              <span className="relative text-white">
                futuro?
              </span>
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Únete a más de 15,000 estudiantes que ya han cambiado sus vidas con Open Mind. Tu próximo gran paso profesional comienza aquí.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/login" className="w-full sm:w-auto">
              <Button 
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Comenzar ahora gratis
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <div className="text-white/80 text-sm">
              <div className="font-medium">✓ Sin tarjeta de crédito</div>
              <div className="font-medium">✓ Acceso inmediato</div>
            </div>
          </div>

          <div className="flex justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="text-sm">Aprende a tu ritmo</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="text-sm">Comunidad activa</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              <span className="text-sm">Certificaciones</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
