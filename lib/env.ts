import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // Required fields
    DATABASE_URL: z.string().min(1),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url(),

    // Optional external integrations 
    AUTH_GITHUB_CLIENT_ID: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).default("")
    ),
    AUTH_GITHUB_SECRET: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).default("")
    ),
    AUTH_GOOGLE_CLIENT_id: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).default("")
    ),
    AUTH_GOOGLE_SECRET_id: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).default("")
    ),
    RESEND_API_SECRET_KEY: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).default("")
    ),
    ARCJET_KEY: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).default("")  // ← Agregado .optional()
    ),

    // AWS / S3 optional
    AWS_ACCESS_KEY_ID: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).default("")
    ),
    AWS_SECRET_ACCESS_KEY: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).default("")
    ),
    AWS_ENDPOINT_URL_S3: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).default("")
    ),
    AWS_ENDPOINT_URL_IAM: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).default("")
    ),
    AWS_REGION: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).default("")
    ),

    // BCV rate + manual payment (QR / Pago Móvil) — all optional
    BCV_API_URL: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).default("https://ve.dolarapi.com/v1/dolares/oficial")
    ),
    BCV_FALLBACK_RATE: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).optional()
    ),
    PAYMENT_QR_PATH: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).default("/payment-qr.png")
    ),
    PAYMENT_BANK: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).optional()
    ),
    PAYMENT_PHONE: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).optional()
    ),
    PAYMENT_HOLDER: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).optional()
    ),
    PAYMENT_ID: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).optional()
    ),

  },

  client: {
    NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).default("")
    ),
  },

  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES:
      process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
  },
});
