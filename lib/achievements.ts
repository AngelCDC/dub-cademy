export type AchievementKey =
  // Constancia
  | "STREAK_3"
  | "STREAK_7"
  | "STREAK_14"
  | "STREAK_30"
  | "STREAK_60"
  | "STREAK_100"
  | "RETURN"
  // Volumen — lecciones
  | "FIRST_LESSON"
  | "LESSONS_10"
  | "LESSONS_50"
  | "LESSONS_100"
  | "LESSONS_500"
  // Volumen — cursos
  | "FIRST_COURSE"
  | "COURSES_3"
  | "COURSES_5"
  | "COURSES_10"
  // Calidad
  | "PERFECT_QUIZ"
  | "PERFECT_QUIZ_3"
  | "NO_ERRORS_COURSE"
  | "COMEBACK_100"
  | "UNSTOPPABLE"
  // Exploración
  | "FIRST_STEP"
  | "EXPLORER"
  | "MULTIDISCIPLINARY"
  | "POLYMATH"
  // Velocidad
  | "PRODUCTIVE_DAY"
  | "MARATHON"
  | "SPRINT_COURSE";

export type AchievementDimension =
  | "constancia"
  | "volumen"
  | "calidad"
  | "exploracion"
  | "velocidad";

export type AchievementDifficulty = "easy" | "medium" | "hard";

export interface AchievementDefinition {
  key: AchievementKey;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  dimension: AchievementDimension;
  difficulty: AchievementDifficulty;
}

export const ACHIEVEMENTS: Record<AchievementKey, AchievementDefinition> = {
  // ── Constancia ──────────────────────────────────────────────────────────────
  STREAK_3: {
    key: "STREAK_3",
    name: "En Racha",
    description: "3 días consecutivos de aprendizaje",
    icon: "🔥",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-500/10 ring-orange-500/20",
    dimension: "constancia",
    difficulty: "easy",
  },
  STREAK_7: {
    key: "STREAK_7",
    name: "Una Semana",
    description: "7 días consecutivos de aprendizaje",
    icon: "⚡",
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-500/10 ring-yellow-500/20",
    dimension: "constancia",
    difficulty: "medium",
  },
  STREAK_14: {
    key: "STREAK_14",
    name: "Quincena",
    description: "14 días consecutivos de aprendizaje",
    icon: "🌙",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10 ring-blue-500/20",
    dimension: "constancia",
    difficulty: "medium",
  },
  STREAK_30: {
    key: "STREAK_30",
    name: "Mes de Fuego",
    description: "30 días consecutivos de aprendizaje",
    icon: "💎",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500/10 ring-purple-500/20",
    dimension: "constancia",
    difficulty: "hard",
  },
  STREAK_60: {
    key: "STREAK_60",
    name: "Dos Meses",
    description: "60 días consecutivos de aprendizaje",
    icon: "🌟",
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-500/10 ring-indigo-500/20",
    dimension: "constancia",
    difficulty: "hard",
  },
  STREAK_100: {
    key: "STREAK_100",
    name: "Centenario",
    description: "100 días consecutivos de aprendizaje",
    icon: "👑",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10 ring-amber-500/20",
    dimension: "constancia",
    difficulty: "hard",
  },
  RETURN: {
    key: "RETURN",
    name: "Regreso",
    description: "Volviste a aprender tras 7+ días de inactividad",
    icon: "🔄",
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-500/10 ring-teal-500/20",
    dimension: "constancia",
    difficulty: "easy",
  },

  // ── Volumen — lecciones ──────────────────────────────────────────────────────
  FIRST_LESSON: {
    key: "FIRST_LESSON",
    name: "Primera Lección",
    description: "Completaste tu primera lección",
    icon: "🎯",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10 ring-blue-500/20",
    dimension: "volumen",
    difficulty: "easy",
  },
  LESSONS_10: {
    key: "LESSONS_10",
    name: "Lector Ávido",
    description: "10 lecciones completadas",
    icon: "📖",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-500/10 ring-green-500/20",
    dimension: "volumen",
    difficulty: "easy",
  },
  LESSONS_50: {
    key: "LESSONS_50",
    name: "Medio Camino",
    description: "50 lecciones completadas",
    icon: "🏃",
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-500/10 ring-cyan-500/20",
    dimension: "volumen",
    difficulty: "medium",
  },
  LESSONS_100: {
    key: "LESSONS_100",
    name: "Cien Lecciones",
    description: "100 lecciones completadas",
    icon: "💯",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10 ring-emerald-500/20",
    dimension: "volumen",
    difficulty: "medium",
  },
  LESSONS_500: {
    key: "LESSONS_500",
    name: "Biblioteca",
    description: "500 lecciones completadas",
    icon: "📚",
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-500/10 ring-violet-500/20",
    dimension: "volumen",
    difficulty: "hard",
  },

  // ── Volumen — cursos ─────────────────────────────────────────────────────────
  FIRST_COURSE: {
    key: "FIRST_COURSE",
    name: "Primer Curso",
    description: "Completaste tu primer curso completo",
    icon: "🏆",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10 ring-amber-500/20",
    dimension: "volumen",
    difficulty: "easy",
  },
  COURSES_3: {
    key: "COURSES_3",
    name: "Estudiante Dedicado",
    description: "Completaste 3 cursos",
    icon: "🎒",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10 ring-emerald-500/20",
    dimension: "volumen",
    difficulty: "medium",
  },
  COURSES_5: {
    key: "COURSES_5",
    name: "Graduado",
    description: "Completaste 5 cursos",
    icon: "🎓",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10 ring-blue-500/20",
    dimension: "volumen",
    difficulty: "medium",
  },
  COURSES_10: {
    key: "COURSES_10",
    name: "Maestro",
    description: "Completaste 10 cursos",
    icon: "🧙",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500/10 ring-purple-500/20",
    dimension: "volumen",
    difficulty: "hard",
  },

  // ── Calidad ──────────────────────────────────────────────────────────────────
  PERFECT_QUIZ: {
    key: "PERFECT_QUIZ",
    name: "Perfección",
    description: "100% en cualquier quiz",
    icon: "⭐",
    color: "text-cyan-600 dark:text-cyan-400",
    bgColor: "bg-cyan-500/10 ring-cyan-500/20",
    dimension: "calidad",
    difficulty: "medium",
  },
  PERFECT_QUIZ_3: {
    key: "PERFECT_QUIZ_3",
    name: "Triple Perfecto",
    description: "100% en 3 quizzes distintos",
    icon: "🌠",
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-500/10 ring-yellow-500/20",
    dimension: "calidad",
    difficulty: "medium",
  },
  NO_ERRORS_COURSE: {
    key: "NO_ERRORS_COURSE",
    name: "Sin Errores",
    description: "Promedio ≥90% en todos los quizzes de un curso",
    icon: "🎯",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-500/10 ring-green-500/20",
    dimension: "calidad",
    difficulty: "medium",
  },
  COMEBACK_100: {
    key: "COMEBACK_100",
    name: "Revancha",
    description: "Fallaste y luego sacaste 100% en el mismo quiz",
    icon: "💪",
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-500/10 ring-orange-500/20",
    dimension: "calidad",
    difficulty: "easy",
  },
  UNSTOPPABLE: {
    key: "UNSTOPPABLE",
    name: "Imparable",
    description: "100% en 5 quizzes consecutivos",
    icon: "🚀",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-500/10 ring-red-500/20",
    dimension: "calidad",
    difficulty: "hard",
  },

  // ── Exploración ──────────────────────────────────────────────────────────────
  FIRST_STEP: {
    key: "FIRST_STEP",
    name: "Primer Paso",
    description: "Iniciaste tu primer curso",
    icon: "👣",
    color: "text-pink-600 dark:text-pink-400",
    bgColor: "bg-pink-500/10 ring-pink-500/20",
    dimension: "exploracion",
    difficulty: "easy",
  },
  EXPLORER: {
    key: "EXPLORER",
    name: "Explorador",
    description: "Cursos en 2 categorías distintas",
    icon: "🧭",
    color: "text-teal-600 dark:text-teal-400",
    bgColor: "bg-teal-500/10 ring-teal-500/20",
    dimension: "exploracion",
    difficulty: "easy",
  },
  MULTIDISCIPLINARY: {
    key: "MULTIDISCIPLINARY",
    name: "Multidisciplinar",
    description: "Cursos en 4 categorías distintas",
    icon: "🌍",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10 ring-blue-500/20",
    dimension: "exploracion",
    difficulty: "medium",
  },
  POLYMATH: {
    key: "POLYMATH",
    name: "Polímata",
    description: "Cursos en 6+ categorías distintas",
    icon: "🌌",
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-500/10 ring-indigo-500/20",
    dimension: "exploracion",
    difficulty: "hard",
  },

  // ── Velocidad ────────────────────────────────────────────────────────────────
  PRODUCTIVE_DAY: {
    key: "PRODUCTIVE_DAY",
    name: "Día Productivo",
    description: "5 lecciones completadas en un mismo día",
    icon: "⚡",
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-500/10 ring-yellow-500/20",
    dimension: "velocidad",
    difficulty: "easy",
  },
  MARATHON: {
    key: "MARATHON",
    name: "Maratón",
    description: "10 lecciones completadas en un mismo día",
    icon: "🏃",
    color: "text-purple-600 dark:text-purple-400",
    bgColor: "bg-purple-500/10 ring-purple-500/20",
    dimension: "velocidad",
    difficulty: "hard",
  },
  SPRINT_COURSE: {
    key: "SPRINT_COURSE",
    name: "Sprint",
    description: "Completaste un curso en 7 días o menos",
    icon: "🏎️",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-500/10 ring-red-500/20",
    dimension: "velocidad",
    difficulty: "medium",
  },
};

export const ACHIEVEMENT_LIST = Object.values(ACHIEVEMENTS);

export const DIMENSION_LABELS: Record<AchievementDimension, string> = {
  constancia: "Constancia",
  volumen: "Volumen",
  calidad: "Calidad",
  exploracion: "Exploración",
  velocidad: "Velocidad",
};

export const DIMENSIONS: AchievementDimension[] = [
  "constancia",
  "volumen",
  "calidad",
  "exploracion",
  "velocidad",
];
