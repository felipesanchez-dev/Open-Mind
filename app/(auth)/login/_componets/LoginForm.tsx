"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import {
  Mail,
  Eye,
  EyeOff,
  Loader,
  GithubIcon,
  Loader2,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function LoginForm() {
  const route = useRouter();

  const [githubPending, startGithubTransition] = useTransition();
  const [googlePending, startGoogleTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Inicio de sesión exitoso con GitHub");
          },
          onError: () => {
            toast.error("Error al iniciar sesión con GitHub");
          },
        },
      });
    });
  }

  async function signInWithGoogle() {
    startGoogleTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success("Inicio de sesión exitoso con Google");
          },
          onError: () => {
            toast.error("Error al iniciar sesión con Google");
          },
        },
      });
    });
  }

  function signInWithEmail(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Por favor ingresa tu correo electrónico");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Por favor ingresa un correo electrónico válido");
      return;
    }

    startEmailTransition(async () => {
      try {
        console.log("Enviando OTP a:", email);

        await authClient.emailOtp.sendVerificationOtp({
          email: email.trim(),
          type: "sign-in",
          fetchOptions: {
            onSuccess: (data) => {
              console.log("OTP enviado exitosamente:", data);
              toast.success("¡Código enviado! Revisa tu correo electrónico");
              route.push(`/verify-request?email=${encodeURIComponent(email)}`);
            },
            onError: (ctx) => {
              console.error("Error completo:", ctx);
              console.error("Error status:", ctx.response?.status);
              console.error("Error message:", ctx.error?.message);

              if (ctx.response?.status === 500) {
                toast.error(
                  "Error del servidor. Verifica la configuración de email"
                );
              } else if (ctx.response?.status === 400) {
                toast.error("Email inválido o no registrado");
              } else if (ctx.error?.message?.includes("User not found")) {
                toast.error("No se encontró una cuenta con este email");
              } else if (ctx.error?.message?.includes("Rate limit")) {
                toast.error("Demasiados intentos. Espera un momento");
              } else {
                const errorMsg = ctx.error?.message || "Error desconocido";
                toast.error(`Error: ${errorMsg}`);
              }
            },
            onRequest: () => {
              console.log("Iniciando petición OTP...");
            },
          },
        });
      } catch (error) {
        console.error("Error inesperado:", error);
        toast.error("Error inesperado. Revisa la consola para más detalles");
      }
    });
  }

  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardHeader className="text-center space-y-2 px-0">
        <CardTitle className="text-2xl font-bold">
          Bienvenido de vuelta
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Inicia sesión en tu cuenta para continuar
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 px-0">
        <div className="space-y-3">
          <Button
            disabled={githubPending}
            onClick={signInWithGithub}
            variant="outline"
            className="w-full h-11 bg-background/50 hover:bg-background/80 border-border/50 cursor-hover transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            {githubPending ? (
              <>
                <Loader className="size-4 animate-spin" />
                <span>Iniciando Sesión...</span>
              </>
            ) : (
              <>
                <GithubIcon className="size-4" />
                Continuar con GitHub
              </>
            )}
          </Button>

          <Button
            disabled={googlePending}
            onClick={signInWithGoogle}
            variant="outline"
            className="w-full h-11 bg-background/50 hover:bg-background/80 border-border/50 cursor-hover transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            {googlePending ? (
              <>
                <Loader className="size-4 animate-spin" />
                <span>Iniciando Sesión...</span>
              </>
            ) : (
              <>
                <Mail className="size-4 mr-2" />
                Continuar con Google
              </>
            )}
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-3 text-muted-foreground">
              O continúa con email
            </span>
          </div>
        </div>

        <form onSubmit={signInWithEmail} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Correo electrónico
            </Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="tu@ejemplo.com"
              className="h-11 bg-background/50 border-border/50 focus:bg-background cursor-hover transition-all duration-300 focus:scale-[1.01] focus:shadow-md"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={emailPending}
            className="w-full h-11 bg-primary hover:bg-primary/90 cursor-hover transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            {emailPending ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Enviando código...
              </>
            ) : (
              <>
                <Send className="size-4 mr-2" />
                Iniciar Sesión
              </>
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <Button
            variant="link"
            className="h-auto p-0 text-primary hover:text-primary/80 font-medium cursor-hover transition-all duration-300"
          >
            Regístrate aquí
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
