import type { Tag } from "@/lib/types";
import { cn } from "@/lib/utils";

const TAG_STYLES: Record<string, string> = {
  PRD: "bg-tag-prd text-tag-prd-text",
  Research: "bg-tag-research text-tag-research-text",
  "UI/UX": "bg-tag-uiux text-tag-uiux-text",
  Metrics: "bg-tag-metrics text-tag-metrics-text",
  "A/B Testing": "bg-tag-testing text-tag-testing-text",
};

const DEFAULT_STYLE = "bg-secondary text-secondary-foreground";

export function TagBadge({
  tag,
  onClick,
  active,
  className,
}: {
  tag: Tag;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}) {
  const style = TAG_STYLES[tag] || DEFAULT_STYLE;
  return (
    <span
      onClick={onClick}
      className={cn(
        "tag-badge cursor-default transition-all",
        style,
        onClick && "cursor-pointer hover:opacity-80",
        active && "ring-2 ring-accent ring-offset-1",
        className
      )}
    >
      {tag}
    </span>
  );
}
