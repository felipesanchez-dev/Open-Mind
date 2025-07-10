"use client";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sparkles,
  LogOutIcon,
  ChevronDown,
  LayoutDashboard,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
        "fixed top-0 z-50 w-full transition-all duration-500 ease-in-out",
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-xl shadow-primary/10"
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
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-lg animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Image
              src="/assets/logo.webp"
              alt="Logo"
              className="relative size-10 rounded-lg transition-transform duration-300 group-hover:rotate-12"
              width={40}
              height={40}
            />
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-black text-lg  from-primary to-secondary bg-clip-text ">
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
              className="relative text-sm font-semibold text-muted-foreground hover:text-foreground transition-all duration-300 group px-3 py-2 rounded-lg hover:bg-primary/5"
            >
              <span className="relative z-10">{item.name}</span>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex md:items-center md:space-x-4">
          <ThemeToggle />
          {isPending ? (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
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
                  "relative overflow-hidden group transition-all duration-300 hover:scale-105 hover:bg-primary/10"
                )}
              >
                <span className="relative z-10">Iniciar Sesión</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                href="/donate"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "relative overflow-hidden group transition-all duration-300 hover:scale-105 border-primary/30 hover:border-primary/50"
                )}
              >
                <span className="relative z-10 flex items-center space-x-1">
                  <span>Donar</span>
                  <Sparkles className="w-3 h-3 group-hover:animate-pulse" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center space-x-3">
          <ThemeToggle />

          <button
            className="p-2 rounded-lg hover:bg-muted transition-all duration-200 hover:scale-105"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 transition-transform duration-300 rotate-90" />
            ) : (
              <Menu className="w-5 h-5 transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border/50 transition-all duration-300 ease-in-out shadow-xl",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="container mx-auto px-4 py-6 space-y-6">
          {session ? (
            <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-border/50">
              <Avatar className="w-16 h-16 border-3 border-primary/30">
                <AvatarImage
                  src={session.user.image || ""}
                  alt={session.user.name || ""}
                />
                <AvatarFallback className="bg-primary/10 text-primary font-medium text-lg">
                  {(session.user.name || "U").charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-base font-semibold text-foreground">
                  {session.user.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {session.user.email}
                </p>
              </div>
            </div>
          ) : null}

          <nav className="space-y-2">
            {navigationItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 py-3 px-4 rounded-lg hover:bg-primary/5 transform hover:scale-[1.02]"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-2 h-2 rounded-full bg-primary/40"></div>
                {item.name}
              </Link>
            ))}
          </nav>

          {session ? (
            <div className="space-y-4">
              <details className="group">
                <summary className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-primary/5 cursor-pointer transition-all duration-200 list-none border border-border/30">
                  <span className="text-sm font-medium text-foreground">
                    Opciones de Usuario
                  </span>

                  <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                </summary>

                <div className="mt-3 space-y-2 pl-4">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground py-2 px-3 rounded-md hover:bg-primary/5 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4 text-muted-foreground" />
                    Dashboard
                  </Link>

                  <Link
                    href="/admin"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground py-2 px-3 rounded-md hover:bg-primary/5 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    Admin
                  </Link>
                </div>
              </details>

              <Button
                onClick={() => {
                  handleSignOut();
                  setIsMobileMenuOpen(false);
                }}
                variant="destructive"
                className="w-full justify-center gap-3 border shadow-none"
              >
                <LogOutIcon size={16} />
                Cerrar Sesión
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 text-sm font-medium bg-primary/5 hover:bg-primary/10 text-primary rounded-lg transition-all duration-200 hover:scale-[1.02]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>

              <Link
                href="/donate"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 text-sm font-medium bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white rounded-lg shadow-lg transition-all duration-200 hover:scale-[1.02]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Donar</span>
                <Sparkles className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
