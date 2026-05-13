"use client";

import { useState, useTransition } from "react";
import { StarSelector } from "@/components/general/StarRating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitReview, deleteReview } from "@/app/dashboard/review-actions";
import { toast } from "sonner";
import { Loader2, Pencil, Trash2 } from "lucide-react";

interface ExistingReview {
  id: string;
  rating: number;
  comment: string | null;
}

interface ReviewFormProps {
  courseId: string;
  existing: ExistingReview | null;
}

export function ReviewForm({ courseId, existing }: ReviewFormProps) {
  const [editing, setEditing] = useState(!existing);
  const [rating, setRating] = useState(existing?.rating ?? 0);
  const [comment, setComment] = useState(existing?.comment ?? "");
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    if (rating === 0) {
      toast.error("Selecciona una calificación");
      return;
    }
    startTransition(async () => {
      const res = await submitReview(courseId, rating, comment);
      if (res.status === "success") {
        toast.success(res.message);
        setEditing(false);
      } else {
        toast.error(res.message);
      }
    });
  }

  function handleDelete() {
    startTransition(async () => {
      const res = await deleteReview(courseId);
      if (res.status === "success") {
        toast.success(res.message);
        setRating(0);
        setComment("");
        setEditing(true);
      } else {
        toast.error(res.message);
      }
    });
  }

  if (existing && !editing) {
    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className={`text-base ${s <= existing.rating ? "text-amber-400" : "text-muted-foreground/30"}`}
              >
                ★
              </span>
            ))}
            <span className="text-sm font-semibold ml-1">{existing.rating}/5</span>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="size-7"
              onClick={() => setEditing(true)}
              disabled={isPending}
            >
              <Pencil className="size-3.5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="size-7 text-destructive hover:text-destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Trash2 className="size-3.5" />
              )}
            </Button>
          </div>
        </div>
        {existing.comment && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            &ldquo;{existing.comment}&rdquo;
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <StarSelector value={rating} onChange={setRating} />
      <Textarea
        placeholder="Comparte tu experiencia con este curso (opcional)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        className="resize-none text-sm"
      />
      <div className="flex gap-2">
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={isPending || rating === 0}
          className="flex-1"
        >
          {isPending && <Loader2 className="size-3.5 mr-1.5 animate-spin" />}
          {existing ? "Actualizar reseña" : "Publicar reseña"}
        </Button>
        {existing && (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setEditing(false);
              setRating(existing.rating);
              setComment(existing.comment ?? "");
            }}
            disabled={isPending}
          >
            Cancelar
          </Button>
        )}
      </div>
    </div>
  );
}
