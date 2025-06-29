"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { ArrowRight, Play, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRipple } from "@/hooks/use-ripple";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const { data: session, isPending } = authClient.useSession();
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
        animationDelay: `${Math.random() * 9}s`,
        animationDuration: `${3 + Math.random() * 80}s`,
      }));
      setParticles(newParticles);
    }
  }, [isClient, particleCount]);

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

          {Array.from({ length: particleCount }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
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
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {feature.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-center p-4">
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </>
  );
}
