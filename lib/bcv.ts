import "server-only";

import { env } from "./env";

export type BcvRate = {
  /** Bs per USD (campo "promedio" de la API, tasa oficial BCV) */
  rate: number;
  /** fechaActualizacion de la API, en ISO */
  date: string;
};

/**
 * Tasa oficial BCV desde la API configurada (default: ve.dolarapi.com).
 * El BCV publica la tasa solo en días hábiles; si la API falla, se usa
 * BCV_FALLBACK_RATE (si está configurado) y si todo falla devuelve null.
 * Caché de 1h en el Data Cache de Next.
 */
export async function getBcvRate(): Promise<BcvRate | null> {
  const fallback = env.BCV_FALLBACK_RATE ? Number(env.BCV_FALLBACK_RATE) : NaN;

  try {
    const res = await fetch(env.BCV_API_URL, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) {
      throw new Error(`BCV API responded with ${res.status}`);
    }

    const data = (await res.json()) as {
      promedio?: unknown;
      fechaActualizacion?: unknown;
    };

    const rate = Number(data.promedio);
    if (!Number.isFinite(rate) || rate <= 0) {
      throw new Error("BCV API returned an invalid 'promedio' value");
    }

    return {
      rate,
      date:
        typeof data.fechaActualizacion === "string"
          ? data.fechaActualizacion
          : new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to fetch BCV rate:", error);

    if (Number.isFinite(fallback) && fallback > 0) {
      return { rate: fallback, date: new Date().toISOString() };
    }

    return null;
  }
}
