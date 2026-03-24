import { useState } from "react";
import { usePortfolio } from "@/hooks/usePortfolio";
import type { EntryCategory, PortfolioEntry, Tag } from "@/lib/types";
import { CATEGORY_LABELS } from "@/lib/types";
import { EntryCard } from "@/components/EntryCard";
import { EntryDialog } from "@/components/EntryDialog";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface SectionPageProps {
  category: EntryCategory;
}

export default function SectionPage({ category }: SectionPageProps) {
  const { searchEntries, addEntry, updateEntry, deleteEntry, saveFile } = usePortfolio();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<PortfolioEntry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<Tag[]>([]);

  const filteredEntries = searchEntries(query, category, activeTags);

  const toggleTag = (tag: Tag) => {
    setActiveTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleSave = (data: Omit<PortfolioEntry, "id" | "createdAt" | "updatedAt">) => {
    if (editingEntry) {
      updateEntry(editingEntry.id, data);
    } else {
      addEntry(data);
    }
    setEditingEntry(null);
  };

  const handleEdit = (entry: PortfolioEntry) => {
    setEditingEntry(entry);
    setDialogOpen(true);
  };

  const handleNew = () => {
    setEditingEntry(null);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteEntry(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="section-title">{CATEGORY_LABELS[category]}</h1>
        <Button onClick={handleNew} size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Create New</span>
        </Button>
      </div>

      <SearchBar
        query={query}
        onQueryChange={setQuery}
        activeTags={activeTags}
        onToggleTag={toggleTag}
      />

      {filteredEntries.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-sm">No entries yet.</p>
          <Button variant="outline" className="mt-3" onClick={handleNew}>
            <Plus className="h-4 w-4 mr-1.5" />
            Add your first entry
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredEntries.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
              onEdit={handleEdit}
              onDelete={(id) => setDeleteId(id)}
            />
          ))}
        </div>
      )}

      <EntryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        entry={editingEntry}
        defaultCategory={category}
        onSave={handleSave}
        onSaveFile={saveFile}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
