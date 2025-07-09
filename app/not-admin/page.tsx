"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Mail,
  User,
  BookOpen,
  GraduationCap,
  Users,
  MessageCircle,
  Home,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function NotAdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const session = await authClient.getSession();
        if (session && session.data) {
          setUser(session.data.user);
        }
      } catch (error) {
        console.error("Error obteniendo sesión:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const handleBackToHome = () => {
    router.push("/");
  };

  const handleContactSupport = () => {
    window.open(
      "mailto:jfelipe9.121@gmail.com?subject=Solicitud de permisos de administrador",
      "_blank"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-amber-100 dark:bg-amber-900/20 p-4 rounded-full">
              <Shield className="h-12 w-12 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Acceso Restringido
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Esta sección está reservada para administradores. Como usuario
            registrado, tienes acceso a muchas otras funcionalidades increíbles.
          </p>
        </div>

        {user && (
          <Card className="mb-8 border-2 border-dashed border-border">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  {user.image ? (
                    <div className="relative">
                      <div className="p-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full">
                        <img
                          src={user.image}
                          alt={`Foto de perfil de ${user.name}`}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5 border-2 border-white dark:border-gray-900">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-full border-2 border-primary/20">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                  )}
                </div>
                <div>
                  <CardTitle className="text-xl">
                    ¡Hola, {user.name}! 👋
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Usuario Verificado
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                >
                  <Users className="h-3 w-3 mr-1" />
                  Miembro de la Comunidad
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                >
                  <Shield className="h-3 w-3 mr-1" />
                  Rol: {user?.role}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle className="h-5 w-5" />
                Lo que SÍ puedes hacer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Explorar Cursos</h4>
                    <p className="text-sm text-muted-foreground">
                      Accede a nuestra biblioteca completa de cursos
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Aprender y Certificarte</h4>
                    <p className="text-sm text-muted-foreground">
                      Completa cursos y obtén certificaciones
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Comunidad</h4>
                    <p className="text-sm text-muted-foreground">
                      Participa en foros y conecta con otros estudiantes
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Soporte</h4>
                    <p className="text-sm text-muted-foreground">
                      Contacta nuestro equipo de soporte cuando lo necesites
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <AlertTriangle className="h-5 w-5" />
                Funciones de Admin
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                  Las siguientes funciones están disponibles solo para
                  administradores:
                </p>
                <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
                  <li>• Crear y gestionar cursos</li>
                  <li>• Administrar usuarios</li>
                  <li>• Configurar plataforma</li>
                  <li>• Acceder a estadísticas</li>
                  <li>• Moderar contenido</li>
                </ul>
              </div>
              <div className="text-center pt-2">
                <p className="text-sm text-muted-foreground mb-3">
                  ¿Necesitas permisos de administrador?
                </p>
                <Button
                  onClick={handleContactSupport}
                  variant="outline"
                  size="sm"
                  className="cursor-pointer border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/20"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contactar Soporte
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              ¿Qué te gustaría hacer ahora?
            </CardTitle>
            <CardDescription>
              Explora las opciones disponibles para ti
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
              <Button
                onClick={handleBackToHome}
                className="h-auto p-6 flex-col gap-2 bg-primary hover:bg-primary/90 cursor-pointer"
              >
                <Home className="h-6 w-6" />
                <span className="font-semibold">Ir al Inicio</span>
                <span className="text-xs opacity-90">
                  Explorar la plataforma
                </span>
              </Button>

              <Button
                asChild
                variant="outline"
                className="h-auto p-6 flex-col gap-2 border-2 hover:bg-secondary/50"
              >
                <Link href="/courses">
                  <BookOpen className="h-6 w-6" />
                  <span className="font-semibold">Ver Cursos</span>
                  <span className="text-xs opacity-70">Catálogo completo</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 p-6 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Si crees que deberías tener acceso administrativo, por favor
            contacta a nuestro equipo de soporte. Revisaremos tu solicitud lo
            antes posible.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span>© 2024 OpenMind</span>
            <span>•</span>
            <Link href="/terms" className="hover:text-primary">
              Términos de Uso
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-primary">
              Privacidad
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
