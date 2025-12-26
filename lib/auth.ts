import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";
import { env } from "./env";
import { emailOTP } from "better-auth/plugins";
import { resend } from "./resend";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID!,
      clientSecret: env.AUTH_GITHUB_SECRET!,
    },
    google: { 
            clientId: env.AUTH_GOOGLE_CLIENT_id, 
            clientSecret: env.AUTH_GOOGLE_SECRET_id, 
        }, 
  },

  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp }) {
        await resend.emails.send({
          from: "Academy - GRUPO DUBOIS <onboarding@grupodubois.com>",
          to: [email],
          subject: "VERIFICACIÓN DE CORREO ELECTRÓNICO - GRUPO DUBOIS",
          html: `
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; border: 1px solid #e0e0e0; border-radius: 8px;">
                        
                        <div style="text-align: center; margin-bottom: 20px;">
                            <img src="https://raw.githubusercontent.com/AngelCDC/leforet-tienda/refs/heads/main/public/LogoDubois.png" alt="GRUPO DUBOIS" style="max-height: 60px;">
                        </div>

                        <h2 style="color: #1a202c;">Verifica tu correo electrónico</h2>

                        <p>Gracias por unirte a GRUPO DUBOIS.</p>
                        <p>Para continuar, ingresa el siguiente código de verificación en nuestra plataforma:</p>

                        <p style="font-size: 32px; font-weight: bold; letter-spacing: 2px;  text-align: center; margin: 30px 0;">
                            ${otp}
                        </p>

                        <p style="font-size: 14px; color: #555;">
                            Este código tiene una validez temporal. Si no solicitaste este código, puedes ignorar este mensaje.
                        </p>

                        <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

                        <p style="font-size: 12px; color: #888; text-align: center;">
                            © ${new Date().getFullYear()} Grupo Dubois · Todos los derechos reservados
                        </p>
                    </div>
                `,
        });
      },
    }),
    admin(),
  ],
});
