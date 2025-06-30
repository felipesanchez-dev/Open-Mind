"use client";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, Sparkles, LogOutIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import UserDropdown from "./UserDropdown";
import { useSignOut } from "@/hooks/use-singout";

const navigationItems = [
  {
    name: "INICIO",
    href: "/",
  },
  {
    name: "CURSOS",
    href: "/courses",
  },
];

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { handleSignOut } = useSignOut();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-primary/5"
          : "bg-transparent backdrop-blur-sm"
      )}
    >
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center space-x-3 group transition-all duration-300 hover:scale-105"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300" />
            <Image
              src="/assets/logo.webp"
              alt="Logo"
              className="relative size-10 rounded-lg"
              width={40}
              height={40}
            />
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-black text-lg t from-primary to-secondary bg-clip-text">
              OPEN MIND
            </span>
            <Sparkles className="w-4 h-4 text-primary group-hover:animate-spin transition-transform duration-300" />
          </div>
        </Link>

        <nav className="hidden md:flex md:items-center md:space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-xl font-medium text-muted-foreground hover:text-foreground transition-all duration-300 group"
            >
              <span className="relative z-10">{item.name}</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex md:items-center md:space-x-4">
          <ThemeToggle />
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          ) : session ? (
            <UserDropdown
              name={session.user.name || ""}
              email={session.user.email || ""}
              image={session.user.image || ""}
            />
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "relative overflow-hidden group transition-all duration-300 hover:scale-105"
                )}
              >
                <span className="relative z-10">Iniciar Sesión</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                href="/donate"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "relative overflow-hidden"
                )}
              >
                <span className="relative z-10 flex items-center space-x-1">
                  <span>Donar</span>
                  <Sparkles className="w-3 h-3" />
                </span>
              </Link>
            </div>
          )}
        </div>

        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      <div
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border/50 transition-all duration-300 ease-in-out",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="container mx-auto px-4 py-6">
          <nav className="flex flex-col items-center text-center space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 py-2 w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="mt-2 pt-2 border-t border-border/50 flex flex-col items-center space-y-4">
            <ThemeToggle />

            {isPending ? null : session ? (
              <div className="pt-2">
                <Button onClick={handleSignOut}>
                  <LogOutIcon
                    size={16}
                    className="opacity-60"
                    aria-hidden="true"
                  />
                  Cerrar Sesion
                </Button>
              </div>
            ) : (
              <div className="flex flex-col w-full max-w-xs space-y-3">
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "w-full justify-center"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>

                <Link
                  href="/donate"
                  className={cn(
                    buttonVariants({ size: "sm" }),
                    "w-full justify-center bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="flex items-center justify-center space-x-1">
                    <span>Donar</span>
                    <Sparkles className="w-3 h-3" />
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
