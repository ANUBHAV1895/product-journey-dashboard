import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TagBadge } from "./TagBadge";
import { Plus, X, Upload } from "lucide-react";
import type { PortfolioEntry, EntryCategory, Tag, EntryLink } from "@/lib/types";
import { ALL_TAGS, CATEGORY_LABELS } from "@/lib/types";

interface EntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entry?: PortfolioEntry | null;
  defaultCategory?: EntryCategory;
  onSave: (data: Omit<PortfolioEntry, "id" | "createdAt" | "updatedAt">) => void;
  onSaveFile?: (entryId: string, fileName: string, dataUrl: string) => void;
}

export function EntryDialog({
  open,
  onOpenChange,
  entry,
  defaultCategory,
  onSave,
}: EntryDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<EntryCategory>(defaultCategory || "case-study");
  const [tags, setTags] = useState<Tag[]>([]);
  const [links, setLinks] = useState<EntryLink[]>([]);
  const [files, setFiles] = useState<string[]>([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState<"in-progress" | "completed" | "archived">("in-progress");
  const [newLinkLabel, setNewLinkLabel] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setDescription(entry.description);
      setCategory(entry.category);
      setTags([...entry.tags]);
      setLinks([...entry.links]);
      setFiles([...entry.files]);
      setDate(entry.date);
      setStatus(entry.status);
    } else {
      setTitle("");
      setDescription("");
      setCategory(defaultCategory || "case-study");
      setTags([]);
      setLinks([]);
      setFiles([]);
      setDate(new Date().toISOString().split("T")[0]);
      setStatus("in-progress");
    }
  }, [entry, open, defaultCategory]);

  const toggleTag = (tag: Tag) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const addLink = () => {
    if (newLinkLabel && newLinkUrl) {
      setLinks((prev) => [...prev, { label: newLinkLabel, url: newLinkUrl }]);
      setNewLinkLabel("");
      setNewLinkUrl("");
    }
  };

  const removeLink = (index: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    const newFiles = Array.from(fileList).map((f) => f.name);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title, description, category, tags, links, files, date, status });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {entry ? "Edit Entry" : "Create New Entry"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as EntryCategory)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as typeof status)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title..."
              className="font-display text-base"
            />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your work..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} max={new Date().toISOString().split("T")[0]} />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_TAGS.map((tag) => (
                <TagBadge
                  key={tag}
                  tag={tag}
                  onClick={() => toggleTag(tag)}
                  active={tags.includes(tag)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Links</Label>
            {links.map((link, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="text-accent">{link.label}</span>
                <span className="text-muted-foreground truncate flex-1">{link.url}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeLink(i)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            <div className="flex gap-2">
              <Input
                value={newLinkLabel}
                onChange={(e) => setNewLinkLabel(e.target.value)}
                placeholder="Label (e.g., Figma)"
                className="flex-1"
              />
              <Input
                value={newLinkUrl}
                onChange={(e) => setNewLinkUrl(e.target.value)}
                placeholder="URL"
                className="flex-[2]"
              />
              <Button variant="outline" size="icon" onClick={addLink}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Files</Label>
            {files.map((file, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="truncate flex-1">{file}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(i)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors border border-dashed border-border rounded-md p-3">
              <Upload className="h-4 w-4" />
              <span>Upload files (PDF, images, docs)</span>
              <input
                type="file"
                multiple
                accept=".pdf,.png,.jpg,.jpeg,.gif,.doc,.docx,.pptx,.xlsx"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!title.trim()}>
              {entry ? "Save Changes" : "Create Entry"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
