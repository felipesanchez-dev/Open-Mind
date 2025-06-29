import { auth } from "@/lib/auth";
import { LoginForm } from "./_components/LoginForm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

const getSessionOptimized = cache(async () => {
  try {
    const headersList = await headers();

    const authCookie = headersList.get("cookie");
    if (!authCookie?.includes("session") && !authCookie?.includes("auth")) {
      return null;
    }

    return await auth.api.getSession({ headers: headersList });
  } catch (error) {
    console.error("Session check error:", error);
    return null;
  }
});

function getOptimalRedirectUrl(session: any) {
  if (!session?.user) return null;

  const user = session.user;

  if (user.lastVisitedRoute && user.lastVisitedRoute !== "/login") {
    return user.lastVisitedRoute;
  }

  if (!user.profileComplete) {
    return "/";
  }
}

export default async function LoginPage() {
  const session = await getSessionOptimized();

  const redirectUrl = getOptimalRedirectUrl(session);
  if (redirectUrl) {
    redirect(redirectUrl);
  }

  return <LoginForm />;
}

export const metadata = {
  title: "Iniciar Sesión | Open Mind",
  description:
    "Accede a tu cuenta de Open Mind. Conecta con tu potencial y descubre nuevas oportunidades.",
  robots: "index, follow",
  alternates: {
    canonical: "/login",
  },
  openGraph: {
    title: "Iniciar Sesión - Open Mind",
    description: "Accede a tu cuenta y conecta con tu potencial",
    type: "website",
  },
};
