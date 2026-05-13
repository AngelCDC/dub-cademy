"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { AchievementDefinition } from "@/lib/achievements";

interface AchievementToastProps {
  achievement: AchievementDefinition;
}

export function AchievementToast({ achievement }: AchievementToastProps) {
  return (
    <div
      className={cn(
        "relative flex items-start gap-3.5 w-[340px] rounded-xl p-4",
        "bg-background border border-border/60 shadow-xl ring-1 ring-inset ring-white/10",
        "overflow-hidden"
      )}
    >
      {/* Gradient top stripe */}
      <div
        className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl"
        style={{
          background:
            "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.4) 100%)",
        }}
      />

      {/* Logo */}
      <div className="shrink-0 mt-0.5">
        <Image
          src="/LogoDubois.png"
          alt="Dubois Academy"
          width={28}
          height={28}
          className="rounded-md"
        />
      </div>

      {/* Center content */}
      <div className="flex-1 min-w-0">
        <p className="text-[11px] font-semibold text-primary uppercase tracking-widest mb-1.5">
          🏅 Logro desbloqueado
        </p>
        <p className="text-sm font-bold text-foreground leading-tight truncate">
          {achievement.name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
          {achievement.description}
        </p>
      </div>

      {/* Achievement icon bubble */}
      <div
        className={cn(
          "shrink-0 flex size-11 items-center justify-center rounded-xl text-xl ring-1",
          achievement.bgColor
        )}
      >
        {achievement.icon}
      </div>
    </div>
  );
}
