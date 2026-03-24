import type { PortfolioEntry, EntryCategory } from "@/lib/types";
import { TagBadge } from "./TagBadge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ExternalLink, Calendar, FileIcon } from "lucide-react";
import { CATEGORY_SINGULAR } from "@/lib/types";

interface EntryCardProps {
  entry: PortfolioEntry;
  onEdit: (entry: PortfolioEntry) => void;
  onDelete: (id: string) => void;
}

const CATEGORY_ACCENT: Record<EntryCategory, string> = {
  "case-study": "border-l-[hsl(var(--category-case-study))]",
  prd: "border-l-[hsl(var(--category-prd))]",
  teardown: "border-l-[hsl(var(--category-teardown))]",
  experiment: "border-l-[hsl(var(--category-experiment))]",
  learning: "border-l-[hsl(var(--category-learning))]",
  certification: "border-l-[hsl(var(--category-certification))]",
  wireframe: "border-l-[hsl(var(--category-wireframe))]",
};

const CATEGORY_LABEL_COLOR: Record<EntryCategory, string> = {
  "case-study": "text-[hsl(var(--category-case-study))]",
  prd: "text-[hsl(var(--category-prd))]",
  teardown: "text-[hsl(var(--category-teardown))]",
  experiment: "text-[hsl(var(--category-experiment))]",
  learning: "text-[hsl(var(--category-learning))]",
  certification: "text-[hsl(var(--category-certification))]",
  wireframe: "text-[hsl(var(--category-wireframe))]",
};

export function EntryCard({ entry, onEdit, onDelete }: EntryCardProps) {
  const statusColors = {
    "in-progress": "bg-[hsl(var(--category-experiment)/0.12)] text-[hsl(var(--category-experiment))]",
    completed: "bg-[hsl(var(--category-teardown)/0.12)] text-[hsl(var(--category-teardown))]",
    archived: "bg-muted text-muted-foreground",
  };

  return (
    <div className={`entry-card animate-fade-in group border-l-4 ${CATEGORY_ACCENT[entry.category]}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-[10px] uppercase tracking-widest font-semibold ${CATEGORY_LABEL_COLOR[entry.category]}`}>
              {CATEGORY_SINGULAR[entry.category]}
            </span>
            <span className={`tag-badge text-[10px] ${statusColors[entry.status]}`}>
              {entry.status.replace("-", " ")}
            </span>
          </div>
          <h3 className="font-display text-lg font-semibold text-foreground leading-tight truncate">
            {entry.title}
          </h3>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary" onClick={() => onEdit(entry)}>
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => onDelete(entry.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
        {entry.description}
      </p>

      {entry.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {entry.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(entry.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          {entry.files.length > 0 && (
            <span className="flex items-center gap-1">
              <FileIcon className="h-3 w-3" />
              {entry.files.length} file{entry.files.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
        {entry.links.length > 0 && (
          <div className="flex gap-1.5">
            {entry.links.slice(0, 3).map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-0.5"
              >
                <ExternalLink className="h-3 w-3" />
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
