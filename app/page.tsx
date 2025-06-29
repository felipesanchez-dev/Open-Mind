"use client";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/login";
          },
        },
      });
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="p-24">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-64"></div>
          <div className="h-10 bg-muted rounded w-32"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-24 space-y-4">
      <ThemeToggle />
      {session ? (
        <>
          <h1 className="text-2xl font-bold text-green-500">
            Bienvenido, {session.user.name}!
          </h1>
          <Button
            onClick={handleSignOut}
            variant="destructive"
            disabled={isSigningOut}
          >
            {isSigningOut ? "Cerrando sesión..." : "Cerrar Sesión"}
          </Button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-red-500">
            Por favor, inicia sesión.
          </h1>
          <Link href="/login">
            <Button>Iniciar Sesión</Button>
          </Link>
        </>
      )}
    </div>
  );
}
