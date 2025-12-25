import "server-only";

import arcjet, {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
} from "@arcjet/next";
import { env } from "./env";

export {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
};

export default arcjet({
  key: env.ARCJET_KEY || "ajkey_01k07jqweaeg9brza2469pmpr6",

  characteristics: ["fingerprint"],

  //define base rules here, can also be emptry if you dont want to have any base rules
  rules: [
    // Validación de email en modo DRY_RUN para diagnóstico
    // Detección de bots en modo DRY_RUN
    detectBot({
      mode: "LIVE", // Solo registra, no bloquea
      allow: [],
    }),
    // Rate limiting más permisivo
    slidingWindow({
      mode: "LIVE",
      interval: "5m", // Aumentado de 2m a 5m
      max: 20, // Aumentado de 5 a 20
    }),
  ],
});
