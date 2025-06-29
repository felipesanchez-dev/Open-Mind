import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="p-24">
      <ThemeToggle />
      {session ? (
        <>
          <h1 className="text-2xl font-bold text-green-500">
            Bienvenido, {session.user.name}!
          </h1>
          <Button>Cerrar Sesion</Button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-red-500">
            Por favor, inicia sesión.
          </h1>
          <Button>Iniciar Sesion</Button>
        </>
      )}
    </div>
  );
}
