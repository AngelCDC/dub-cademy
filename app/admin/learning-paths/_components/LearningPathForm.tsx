"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { GripVertical, Plus, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { tryCatch } from "@/hooks/try-catch";
import { ApiResponse } from "@/lib/types";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PathCourse = {
  id: string;
  title: string;
  duration: number;
  level: string;
};

export type PathFormData = {
  title: string;
  description: string;
  slug: string;
  price: number;
  status: "Draft" | "Published";
  courseIds: string[];
};

interface InitialData {
  title: string;
  description: string;
  slug: string;
  price: number;
  status: "Draft" | "Published";
  courses: PathCourse[];
}

interface Props {
  initialData?: InitialData;
  availableCourses: PathCourse[];
  action: (data: PathFormData) => Promise<ApiResponse>;
  submitLabel?: string;
}

// ─── Slugify helper ───────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// ─── Sortable course row ──────────────────────────────────────────────────────

function SortableCourseRow({
  course,
  index,
  onRemove,
}: {
  course: PathCourse;
  index: number;
  onRemove: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: course.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-3 rounded-lg border bg-card px-3 py-2.5 text-sm",
        isDragging ? "shadow-lg opacity-80 z-50" : "shadow-none"
      )}
    >
      {/* Drag handle */}
      <button
        type="button"
        className="cursor-grab touch-none text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
        aria-label="Arrastrar para reordenar"
      >
        <GripVertical className="size-4" />
      </button>

      {/* Position badge */}
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
        {index + 1}
      </span>

      {/* Course info */}
      <div className="flex-1 min-w-0">
        <p className="font-medium truncate">{course.title}</p>
        <p className="text-xs text-muted-foreground">{course.duration}h · {course.level}</p>
      </div>

      {/* Remove button */}
      <button
        type="button"
        onClick={() => onRemove(course.id)}
        className="shrink-0 text-muted-foreground hover:text-destructive transition-colors"
        aria-label="Quitar curso"
      >
        <Trash2 className="size-4" />
      </button>
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

export function LearningPathForm({
  initialData,
  availableCourses,
  action,
  submitLabel = "Guardar",
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  // Form state
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [slugManual, setSlugManual] = useState(!!initialData?.slug);
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [price, setPrice] = useState(String(initialData?.price ?? 0));
  const [status, setStatus] = useState<"Draft" | "Published">(
    initialData?.status ?? "Draft"
  );
  const [courses, setCourses] = useState<PathCourse[]>(initialData?.courses ?? []);
  const [selectedToAdd, setSelectedToAdd] = useState<string>("");

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManual && title) {
      setSlug(slugify(title));
    }
  }, [title, slugManual]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setCourses((prev) => {
      const oldIdx = prev.findIndex((c) => c.id === active.id);
      const newIdx = prev.findIndex((c) => c.id === over.id);
      return arrayMove(prev, oldIdx, newIdx);
    });
  }

  function addCourse() {
    if (!selectedToAdd) return;
    const course = availableCourses.find((c) => c.id === selectedToAdd);
    if (!course || courses.some((c) => c.id === course.id)) return;
    setCourses((prev) => [...prev, course]);
    setSelectedToAdd("");
  }

  function removeCourse(id: string) {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }

  const notAdded = availableCourses.filter(
    (c) => !courses.some((cc) => cc.id === c.id)
  );

  const totalHours = courses.reduce((s, c) => s + c.duration, 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) { toast.error("El título es obligatorio"); return; }
    if (!slug.trim()) { toast.error("El slug es obligatorio"); return; }
    if (courses.length === 0) { toast.error("Añade al menos un curso"); return; }

    const data: PathFormData = {
      title: title.trim(),
      description: description.trim(),
      slug: slug.trim(),
      price: Number(price) || 0,
      status,
      courseIds: courses.map((c) => c.id),
    };

    startTransition(async () => {
      const { data: result, error } = await tryCatch(action(data));
      if (error) { toast.error("Error inesperado"); return; }
      if (result.status === "error") { toast.error(result.message); return; }
      toast.success(result.message);
      router.push("/admin/learning-paths");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {/* Basic info */}
      <Card className="p-6 border-0 shadow-sm ring-1 ring-border/50 space-y-5">
        <h2 className="text-base font-semibold">Información general</h2>

        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej. Ruta Full Stack Web"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL) *</Label>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugManual(true); }}
            placeholder="ruta-full-stack-web"
            required
          />
          <p className="text-xs text-muted-foreground">
            /rutas/<span className="font-mono text-foreground">{slug || "…"}</span>
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe qué aprenderá el estudiante con esta ruta…"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Precio (€)</Label>
            <Input
              id="price"
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
            />
          </div>
          <div className="space-y-2">
            <Label>Estado</Label>
            <Select value={status} onValueChange={(v) => setStatus(v as "Draft" | "Published")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Draft">Borrador</SelectItem>
                <SelectItem value="Published">Publicado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Course list */}
      <Card className="p-6 border-0 shadow-sm ring-1 ring-border/50 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Cursos de la ruta</h2>
          {courses.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {courses.length} cursos · {totalHours}h total
            </span>
          )}
        </div>

        {/* DnD sortable list */}
        {courses.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6 border-2 border-dashed rounded-lg">
            Añade cursos desde el selector de abajo
          </p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={courses.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {courses.map((course, i) => (
                  <SortableCourseRow
                    key={course.id}
                    course={course}
                    index={i}
                    onRemove={removeCourse}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {/* Add course selector */}
        {notAdded.length > 0 && (
          <div className="flex gap-2 pt-2 border-t border-border/50">
            <Select value={selectedToAdd} onValueChange={setSelectedToAdd}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Seleccionar curso a añadir…" />
              </SelectTrigger>
              <SelectContent>
                {notAdded.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.title} ({c.duration}h)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="outline"
              onClick={addCourse}
              disabled={!selectedToAdd}
            >
              <Plus className="size-4 mr-1.5" />
              Añadir
            </Button>
          </div>
        )}

        {notAdded.length === 0 && availableCourses.length > 0 && courses.length > 0 && (
          <p className="text-xs text-muted-foreground text-center py-2">
            Todos los cursos publicados ya están en esta ruta.
          </p>
        )}
      </Card>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? <Loader2 className="size-4 mr-2 animate-spin" /> : null}
          {submitLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/learning-paths")}
          disabled={pending}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
