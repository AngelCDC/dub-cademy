"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const RANGES = [
  { label: "30 días", value: 30 },
  { label: "90 días", value: 90 },
  { label: "6 meses", value: 180 },
  { label: "1 año", value: 365 },
] as const;

interface Props {
  current: number;
}

export function AnalyticsDateFilter({ current }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setRange(value: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("range", String(value));
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
      {RANGES.map((r) => (
        <button
          key={r.value}
          onClick={() => setRange(r.value)}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-medium transition-all",
            current === r.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
