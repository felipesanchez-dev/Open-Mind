import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GithubIcon } from "lucide-react";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Bienvenido a  Open Mind 🔓🧠</CardTitle>
        <CardDescription>Iniciar Sesion con:</CardDescription>
      </CardHeader>

      <CardContent>
        <Button className="w-full" variant="outline">
          Iniciar Sesion con Github <GithubIcon className="size-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
