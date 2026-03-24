import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TagBadge } from "./TagBadge";
import type { Tag } from "@/lib/types";
import { ALL_TAGS } from "@/lib/types";

interface SearchBarProps {
  query: string;
  onQueryChange: (q: string) => void;
  activeTags: Tag[];
  onToggleTag: (tag: Tag) => void;
}

export function SearchBar({ query, onQueryChange, activeTags, onToggleTag }: SearchBarProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search entries..."
          className="pl-10"
        />
      </div>
      <div className="flex flex-wrap gap-1.5">
        {ALL_TAGS.map((tag) => (
          <TagBadge
            key={tag}
            tag={tag}
            onClick={() => onToggleTag(tag)}
            active={activeTags.includes(tag)}
          />
        ))}
      </div>
    </div>
  );
}
