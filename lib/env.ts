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
      z.string().min(1).optional() 
    ),
    AUTH_GITHUB_SECRET: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).optional()
    ),
    RESEND_API_SECRET_KEY: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).optional()
    ),
    ARCJET_KEY: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).optional()  // ← Agregado .optional()
    ),

    // AWS / S3 optional
    AWS_ACCESS_KEY_ID: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).optional()
    ),
    AWS_SECRET_ACCESS_KEY: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).optional()
    ),
    AWS_ENDPOINT_URL_S3: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).optional()
    ),
    AWS_ENDPOINT_URL_IAM: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).optional()
    ),
    AWS_REGION: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).optional()
    ),

    // Stripe optional
    STRIPE_SECRET_KEY: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).optional()
    ),
    STRIPE_WEBHOOK_SECRET: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).optional()
    ),
  },

  client: {
    NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES: z.preprocess(
      (v) => (v === "" ? undefined : v),
      z.string().min(1).optional()
    ),
  },

  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES:
      process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
  },
});
