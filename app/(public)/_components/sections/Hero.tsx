"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { ArrowRight, Play, BookOpen } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRipple } from "@/hooks/use-ripple";

export default function Hero() {
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
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-background" id="hero">
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
                      <span className="hidden sm:inline">Comenzar Gratis</span>
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
  );
}
