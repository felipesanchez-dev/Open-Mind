"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { ArrowRight, Play, BookOpen, Sparkles } from "lucide-react";
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
      console.log(isVisible);
    };

    const handleResize = () => {
      setParticleCount(window.innerWidth > 768 ? 20 : 10);
    };

    handleResize();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

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
    </>
  );
}
