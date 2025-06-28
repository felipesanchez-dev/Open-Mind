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
import { Github, Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
            variant="outline"
            className="w-full h-11 bg-background/50 hover:bg-background/80 border-border/50 cursor-hover transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <Github className="size-4 mr-2" />
            Continuar con GitHub
          </Button>

          <Button
            variant="outline"
            className="w-full h-11 bg-background/50 hover:bg-background/80 border-border/50 cursor-hover transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <Mail className="size-4 mr-2" />
            Continuar con Google
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

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@ejemplo.com"
              className="h-11 bg-background/50 border-border/50 focus:bg-background cursor-hover transition-all duration-300 focus:scale-[1.01] focus:shadow-md"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </Label>
              <Button
                variant="link"
                className="h-auto p-0 text-xs text-muted-foreground hover:text-primary cursor-hover transition-all duration-300"
              >
                ¿Olvidaste tu contraseña?
              </Button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                className="h-11 bg-background/50 border-border/50 focus:bg-background pr-10 cursor-hover transition-all duration-300 focus:scale-[1.01] focus:shadow-md"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={togglePasswordVisibility}
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent cursor-hover transition-all duration-300 hover:scale-110"
              >
                {showPassword ? (
                  <EyeOff className="size-4 text-muted-foreground" />
                ) : (
                  <Eye className="size-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>

          <Button className="w-full h-11 bg-primary hover:bg-primary/90 cursor-hover transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            Iniciar sesión
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
