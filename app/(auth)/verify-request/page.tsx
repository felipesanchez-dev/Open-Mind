"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition, useEffect, Suspense } from "react";
import { toast } from "sonner";

function VerifyRequestContent() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [emailPending, startTransition] = useTransition();
  const [resendPending, startResendTransition] = useTransition();
  const [hasError, setHasError] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const params = useSearchParams();
  const email = params.get("email") as string;
  const isOtpCompleted = otp.length === 6;

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (isOtpCompleted && !emailPending && !hasError) {
      const timer = setTimeout(() => {
        verifyOtp();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOtpCompleted, emailPending, hasError]);

  useEffect(() => {
    if (otp && hasError) {
      setHasError(false);
    }
  }, [otp, hasError]);

  async function verifyOtp() {
    setHasError(false);
    startTransition(async () => {
      await authClient.signIn.emailOtp({
        email: email,
        otp: otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Código verificado exitosamente");
            router.push("/");
          },
          onError: (ctx) => {
            setHasError(true);
            console.error("Error verificando OTP:", ctx);

            if (ctx.response?.status === 400) {
              toast.error("Código incorrecto. Verifica e intenta nuevamente.");
            } else if (ctx.response?.status === 410) {
              toast.error("El código ha expirado. Solicita uno nuevo.");
            } else {
              toast.error("Error al verificar el código. Inténtalo de nuevo.");
            }

            setOtp("");

            setTimeout(() => setHasError(false), 500);
          },
        },
      });
    });
  }

  async function resendCode() {
    if (resendTimer > 0) return;

    startResendTransition(async () => {
      try {
        await authClient.emailOtp.sendVerificationOtp({
          email: email,
          type: "sign-in",
          fetchOptions: {
            onSuccess: () => {
              toast.success("¡Código reenviado exitosamente!");
              setResendTimer(60);
              setOtp("");
            },
            onError: (ctx) => {
              console.error("Error reenviando código:", ctx);
              toast.error("Error al reenviar el código. Inténtalo más tarde.");
            },
          },
        });
      } catch (error) {
        console.error("Error inesperado al reenviar:", error);
        toast.error("Error inesperado. Inténtalo más tarde.");
      }
    });
  }

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 blur-3xl" />
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-secondary/10 rounded-full blur-2xl animate-pulse delay-1000" />

      <Card className="relative w-full mx-auto border-0 shadow-2xl bg-background/95 backdrop-blur-xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

        <CardHeader className="text-center space-y-4 pt-8 pb-6">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm border border-primary/20">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Verifica tu código
          </CardTitle>
          <CardDescription className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Hemos enviado un código de verificación de 6 dígitos a{" "}
            <span className="font-semibold text-foreground">{email}</span>
            <br />
            <span className="text-xs">
              Si no lo encuentras, revisa tu carpeta de spam
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8 px-8 pb-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <InputOTP
                value={otp}
                onChange={(value) => setOtp(value)}
                maxLength={6}
                className="gap-3"
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot
                    index={0}
                    className={`w-12 h-12 text-lg font-bold border-2 transition-all duration-300 bg-background/50 backdrop-blur-sm ${
                      hasError
                        ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20 animate-shake"
                        : "border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/40"
                    }`}
                  />
                  <InputOTPSlot
                    index={1}
                    className={`w-12 h-12 text-lg font-bold border-2 transition-all duration-300 bg-background/50 backdrop-blur-sm ${
                      hasError
                        ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20 animate-shake"
                        : "border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/40"
                    }`}
                  />
                  <InputOTPSlot
                    index={2}
                    className={`w-12 h-12 text-lg font-bold border-2 transition-all duration-300 bg-background/50 backdrop-blur-sm ${
                      hasError
                        ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20 animate-shake"
                        : "border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/40"
                    }`}
                  />
                </InputOTPGroup>
                <div className="w-4 flex justify-center">
                  <div
                    className={`w-2 h-0.5 rounded-full transition-all duration-300 ${
                      hasError
                        ? "bg-gradient-to-r from-destructive to-destructive/80"
                        : "bg-gradient-to-r from-primary to-secondary"
                    }`}
                  />
                </div>
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot
                    index={3}
                    className={`w-12 h-12 text-lg font-bold border-2 transition-all duration-300 bg-background/50 backdrop-blur-sm ${
                      hasError
                        ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20 animate-shake"
                        : "border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/40"
                    }`}
                  />
                  <InputOTPSlot
                    index={4}
                    className={`w-12 h-12 text-lg font-bold border-2 transition-all duration-300 bg-background/50 backdrop-blur-sm ${
                      hasError
                        ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20 animate-shake"
                        : "border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/40"
                    }`}
                  />
                  <InputOTPSlot
                    index={5}
                    className={`w-12 h-12 text-lg font-bold border-2 transition-all duration-300 bg-background/50 backdrop-blur-sm ${
                      hasError
                        ? "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/20 animate-shake"
                        : "border-primary/20 focus:border-primary focus:ring-2 focus:ring-primary/20 hover:border-primary/40"
                    }`}
                  />
                </InputOTPGroup>
              </InputOTP>

              <div className="mt-4 flex justify-center">
                <div className="flex space-x-1">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-1 rounded-full transition-all duration-300 ${
                        i < otp.length
                          ? hasError
                            ? "bg-gradient-to-r from-destructive to-destructive/80"
                            : "bg-gradient-to-r from-primary to-secondary"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {isOtpCompleted && !emailPending && (
                <div className="mt-3 text-center">
                  <p className="text-sm text-primary font-medium animate-pulse">
                    ✨ Verificando automáticamente...
                  </p>
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground text-center max-w-sm">
              Ingresa el código de 6 dígitos que acabas de recibir por correo
              electrónico
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={verifyOtp}
              disabled={emailPending || !isOtpCompleted}
              className="w-full h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {emailPending ? (
                <>
                  <Loader2 className="size-5 animate-spin mr-2" />
                  <span>Verificando código...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Verificar código</span>
                </>
              )}
            </Button>

            <div className="text-center">
              <Button
                variant="ghost"
                size="sm"
                disabled={resendTimer > 0 || resendPending}
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:bg-primary/5 disabled:opacity-50"
                onClick={resendCode}
              >
                {resendPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Reenviando...
                  </>
                ) : resendTimer > 0 ? (
                  <>
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Reenviar en {resendTimer}s
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    ¿No recibiste el código? Reenviar
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyRequestPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <VerifyRequestContent />
    </Suspense>
  );
}
