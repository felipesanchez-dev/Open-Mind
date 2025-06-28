import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-svh bg-gradient-to-br from-background via-muted/20 to-muted/40">
      <div className="absolute inset-0 bg-grid-black/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/10 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/10 to-transparent rounded-full blur-3xl" />

      <Link
        href="/"
        className={buttonVariants({
          variant: "ghost",
          size: "sm",
          className:
            "absolute top-6 left-6 z-10 hover:bg-background/80 backdrop-blur-sm cursor-hover transition-all duration-300 hover:scale-105",
        })}
      >
        <ArrowLeft className="size-4 mr-2" />
        Volver al inicio
      </Link>

      <div className="relative flex min-h-svh flex-col items-center justify-center p-6">
        <div className="flex w-full max-w-md flex-col gap-8">
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/"
              className="group flex items-center gap-3 transition-transform hover:scale-105 cursor-hover"
            >
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-lg group-hover:blur-xl transition-all" />
                <Image
                  src="/assets/logo.webp"
                  alt="Open Mind"
                  width={80}
                  height={80}
                  className="relative rounded-full border-2 border-background shadow-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Open Mind
                </span>
                <span className="text-sm text-muted-foreground">
                  Conecta con tu potencial
                </span>
              </div>
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 blur-xl" />
            <div className="relative bg-background/60 backdrop-blur-xl border border-border/50 rounded-2xl p-1 shadow-2xl">
              <div className="bg-background/80 backdrop-blur-sm rounded-xl p-6">
                {children}
              </div>
            </div>
          </div>

          <div className="text-balance text-center text-xs text-muted-foreground/80 leading-relaxed">
            Al continuar, aceptas nuestros{" "}
            <Link
              href="/terms"
              className="font-medium text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-colors cursor-hover"
            >
              Términos de Servicio
            </Link>{" "}
            y{" "}
            <Link
              href="/privacy"
              className="font-medium text-primary hover:text-primary/80 hover:underline underline-offset-4 transition-colors cursor-hover"
            >
              Política de Privacidad
            </Link>
          </div>
        </div>

        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary/20 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-1 h-1 rounded-full bg-secondary/30 animate-ping" />
        <div className="absolute top-1/2 right-1/6 w-1.5 h-1.5 rounded-full bg-primary/15 animate-bounce" />
      </div>
    </div>
  );
}
