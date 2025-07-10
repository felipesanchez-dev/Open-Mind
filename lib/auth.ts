
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, emailOTP } from "better-auth/plugins";
import { prisma } from "./db";
import { env } from "./env";
import { resend } from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        try {
          const { data, error } = await resend.emails.send({
            from: "OPEN MIND <felipe@felipesanchezdev.site>",
            to: [email],
            subject: "OPEN MIND - Código de Verificación",
            html: `
            <!DOCTYPE html>
            <html lang="es">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Open Mind - Código de Verificación</title>
              </head>
              <body
                style="
                  margin: 0;
                  padding: 0;
                  background-color: #f8fafc;
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                "
              >
                "
              >
                <div
                  style="
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  "
                >
                  <div
                    style="
                      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                      padding: 40px 20px;
                      text-align: center;
                      border-radius: 8px 8px 0 0;
                    "
                  >
                    <div
                  style="
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 50%;
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(10px);
                  "
                >
                <div
                  style="
                    background: #ffffff;
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                  "
                >
                  <span style="font-size: 24px; font-weight: bold; color: #667eea"
                    >OM</span
                  >
                </div>
              </div>
              <h1
                style="
                  color: #ffffff;
                  margin: 0;
                  font-size: 28px;
                  font-weight: 700;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                "
              >
                Open Mind
              </h1>
              <p
                style="
                  color: rgba(255, 255, 255, 0.9);
                  margin: 10px 0 0;
                  font-size: 16px;
                  font-weight: 300;
                "
              >
                Conecta con tu potencial infinito
              </p>
            </div>
            <div
              style="
                background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                border: 2px dashed #cbd5e1;
                border-radius: 12px;
                padding: 30px;
                text-align: center;
                margin: 30px 0;
              "
            >
              <div
                style="
                  background: #ffffff;
                  border-radius: 8px;
                  padding: 20px;
                  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                "
              >
              <p
                style="
                  color: #64748b;
                  margin: 0 0 10px;
                  font-size: 14px;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                  font-weight: 500;
                "
              >
                Código de Verificación
              </p>
              <div
                style="
                  font-size: 36px;
                  font-weight: 800;
                  color: #1e293b;
                  letter-spacing: 8px;
                  font-family: 'Courier New', monospace;
                  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                "
              >
                ${otp}
              </div>
            </div>
          </div>
          <div
            style="
              background: linear-gradient(135deg, #000000 0%, #000000 100%);
              border-left: 4px solid #1a1a1a;
              padding: 18px;
              border-radius: 8px;
              margin: 25px 0;
              box-shadow: 0 2px 8px rgba(245, 158, 11, 0.1);
            "
          >
            <p style="color: #ffffff; margin: 0; font-size: 14px; line-height: 1.5">
              <strong>⏰ Importante:</strong> Este código expirará en
              <strong>10 minutos</strong>. Si no solicitaste este código, puedes
              ignorar este email de forma segura.
            </p>
          </div>
          <div
            style="
              background: #f8fafc;
              padding: 30px;
              border-top: 1px solid #e2e8f0;
            "
          >
            <div
              style="
                text-align: center;
                margin-bottom: 20px;
                padding: 16px;
                background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
                border-radius: 10px;
                border: 1px solid #e2e8f0;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
              "
            >
              <p
                style="
                  color: #64748b;
                  margin: 0 0 10px;
                  font-size: 13px;
                  font-weight: 600;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                "
              >
                ¿Necesitas ayuda? Contáctanos
              </p>
              <p
                style="color: #1e293b; margin: 0; font-size: 14px; line-height: 1.4"
              >
                📧
                <a
                  href="mailto:jfelipe9.121@gmail.com"
                  style="color: #667eea; text-decoration: none; font-weight: 500"
                  >jfelipe9.121@gmail.com</a
                >
              </p>
              <p style="color: #1e293b; margin: 8px 0 0; font-size: 14px">
                📱
                <a
                  href="https://wa.me/573102452542"
                  style="color: #25d366; text-decoration: none; font-weight: 500"
                  >+57 310 245 2542</a
                >
              </p>
              <p
                style="color: #1e293b; margin: 0; font-size: 14px; line-height: 1.4"
              >
                🌍
                <a
                  href="https://felipesanchezdev.site"
                  style="color: #667eea; text-decoration: none; font-weight: 500"
                  >Sitio web</a
                >
              </p>
            </div>
              <div
                style="
                  text-align: center;
                  padding-top: 20px;
                    border-top: 1px solid #e2e8f0;
                  "
                  >
                    <p
                      style="color: #94a3b8; margin: 0; font-size: 12px; line-height: 1.4"
                    >
                      © 2025 <strong>Open Mind</strong> - Desarrollado por
                      <a
                        href="https://github.com/felipesanchez-dev"
                        style="color: #667eea; text-decoration: none"
                        >Felipe Sánchez</a
                      >
                    </p>
                    <p style="color: #cbd5e1; margin: 5px 0 0; font-size: 11px">
                      Todos los derechos reservados. Este email fue enviado desde una
                      dirección no monitoreada.
                    </p>
                  </div>
                </div>
              </div>
            </body>
          </html>
                `,
          });

          if (error) {
            console.error("Error enviando email con Resend:", error);
            throw new Error(`Failed to send email: ${error.message}`);
          }

          console.log("Email enviado exitosamente:", data);
        } catch (error) {
          console.error("Error en sendVerificationOTP:", error);
          throw error;
        }
      },
    }),
    admin(),
  ],
});
