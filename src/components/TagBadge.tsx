import type { Tag } from "@/lib/types";
import { cn } from "@/lib/utils";

const TAG_STYLES: Record<string, string> = {
  PRD: "bg-tag-prd text-tag-prd-text",
  Research: "bg-tag-research text-tag-research-text",
  "UI/UX": "bg-tag-uiux text-tag-uiux-text",
  Metrics: "bg-tag-metrics text-tag-metrics-text",
  "A/B Testing": "bg-tag-testing text-tag-testing-text",
  Strategy: "bg-tag-strategy text-tag-strategy-text",
  Growth: "bg-tag-growth text-tag-growth-text",
  Analytics: "bg-tag-analytics text-tag-analytics-text",
  "User Research": "bg-tag-user-research text-tag-user-research-text",
  Roadmap: "bg-tag-roadmap text-tag-roadmap-text",
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
        "tag-badge cursor-default",
        style,
        onClick && "cursor-pointer hover:opacity-80",
        active && "ring-2 ring-primary ring-offset-1",
        className
      )}
    >
      {tag}
    </span>
  );
}
