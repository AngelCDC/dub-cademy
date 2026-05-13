export type AchievementKey =
  | "FIRST_LESSON"
  | "FIRST_COURSE"
  | "STREAK_3"
  | "STREAK_7"
  | "STREAK_30"
  | "COURSES_3"
  | "PERFECT_QUIZ";

export interface AchievementDefinition {
  key: AchievementKey;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
}

export const ACHIEVEMENTS: Record<AchievementKey, AchievementDefinition> = {
  FIRST_LESSON: {
    key: "FIRST_LESSON",
    name: "Primera Lección",
    description: "Completaste tu primera lección",
    icon: "🎯",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10 ring-blue-500/20",
  },
  FIRST_COURSE: {
    key: "FIRST_COURSE",
    name: "Primer Curso",
    description: "Completaste tu primer curso completo",
    icon: "🏆",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10 ring-amber-500/20",
  },
  STREAK_3: {
    key: "STREAK_3",
    name: "En Racha",
    description: "3 días consecutivos de aprendizaje",
    icon: "🔥",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-500/10 ring-orange-500/20",
  },
  STREAK_7: {
    key: "STREAK_7",
    name: "Una Semana",
    description: "7 días consecutivos de aprendizaje",
    icon: "⚡",
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-500/10 ring-yellow-500/20",
  },
  STREAK_30: {
    key: "STREAK_30",
    name: "Mes de Fuego",
    description: "30 días consecutivos de aprendizaje",
    icon: "💎",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500/10 ring-purple-500/20",
  },
  COURSES_3: {
    key: "COURSES_3",
    name: "Estudiante Dedicado",
    description: "Completaste 3 cursos",
    icon: "📚",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10 ring-emerald-500/20",
  },
  PERFECT_QUIZ: {
    key: "PERFECT_QUIZ",
    name: "Perfección",
    description: "Obtuviste 100% en un quiz",
    icon: "⭐",
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-500/10 ring-cyan-500/20",
  },
};

export const ACHIEVEMENT_LIST = Object.values(ACHIEVEMENTS);
