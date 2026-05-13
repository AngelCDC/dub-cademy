import { toast } from "sonner";
import { createElement } from "react";
import { AchievementKey, ACHIEVEMENTS } from "@/lib/achievements";
import { AchievementToast } from "@/components/general/AchievementToast";

/**
 * Shows a staggered sequence of achievement toast popups.
 * Each toast is delayed by 800ms from the previous one to avoid overlap.
 */
export function showAchievementToasts(keys: AchievementKey[]): void {
  if (!keys || keys.length === 0) return;

  keys.forEach((key, index) => {
    const achievement = ACHIEVEMENTS[key];
    if (!achievement) return;

    setTimeout(() => {
      toast.custom(
        () => createElement(AchievementToast, { achievement }),
        {
          duration: 6000,
          position: "bottom-right",
        }
      );
    }, index * 900);
  });
}
