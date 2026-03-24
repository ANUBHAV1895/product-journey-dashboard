import { usePortfolio } from "@/hooks/usePortfolio";
import { CATEGORY_LABELS, type EntryCategory } from "@/lib/types";
import { Link } from "react-router-dom";
import {
  FileText,
  ClipboardList,
  Search,
  FlaskConical,
  BookOpen,
  Award,
  Telescope,
  ArrowRight,
  PenTool,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Check } from "lucide-react";

const CATEGORY_ICONS: Record<EntryCategory, React.ElementType> = {
  "case-study": Search,
  prd: FileText,
  teardown: Telescope,
  experiment: FlaskConical,
  learning: BookOpen,
  certification: Award,
  wireframe: PenTool,
};

const CATEGORY_ROUTES: Record<EntryCategory, string> = {
  "case-study": "/case-study",
  prd: "/prd",
  teardown: "/teardown",
  experiment: "/experiment",
  learning: "/learning",
  certification: "/certification",
  wireframe: "/wireframe",
};

const CATEGORY_COLORS: Record<EntryCategory, string> = {
  "case-study": "bg-[hsl(var(--category-case-study))]",
  prd: "bg-[hsl(var(--category-prd))]",
  teardown: "bg-[hsl(var(--category-teardown))]",
  experiment: "bg-[hsl(var(--category-experiment))]",
  learning: "bg-[hsl(var(--category-learning))]",
  certification: "bg-[hsl(var(--category-certification))]",
  wireframe: "bg-[hsl(var(--category-wireframe))]",
};

export default function DashboardHome() {
  const { entries, profile, setProfile } = usePortfolio();
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(profile.name);
  const [editRole, setEditRole] = useState(profile.role);
  const [editBio, setEditBio] = useState(profile.bio);

  const handleSaveProfile = () => {
    setProfile({ name: editName, role: editRole, bio: editBio });
    setEditing(false);
  };

  const categoryCounts = (Object.keys(CATEGORY_LABELS) as EntryCategory[]).map((cat) => ({
    category: cat,
    label: CATEGORY_LABELS[cat],
    count: entries.filter((e) => e.category === cat).length,
    Icon: CATEGORY_ICONS[cat],
    route: CATEGORY_ROUTES[cat],
  }));

  const recentEntries = entries.slice(0, 5);
  const completedCount = entries.filter((e) => e.status === "completed").length;
  const inProgressCount = entries.filter((e) => e.status === "in-progress").length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Profile Section */}
      <section className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {editing ? (
              <div className="space-y-3 max-w-md">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="font-display text-2xl font-bold"
                  placeholder="Your Name"
                />
                <Input
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  placeholder="Your Role"
                />
                <Textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={3}
                  placeholder="Short bio..."
                />
                <Button size="sm" onClick={handleSaveProfile}>
                  <Check className="h-3.5 w-3.5 mr-1" /> Save
                </Button>
              </div>
            ) : (
              <>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  {profile.name}
                </h1>
                <p className="text-accent font-medium mt-1">{profile.role}</p>
                <p className="text-muted-foreground mt-2 max-w-2xl leading-relaxed text-sm">
                  {profile.bio}
                </p>
              </>
            )}
          </div>
          {!editing && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                setEditName(profile.name);
                setEditRole(profile.role);
                setEditBio(profile.bio);
                setEditing(true);
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4">
        <div className="entry-card text-center bg-[hsl(var(--category-prd)/0.08)] border-[hsl(var(--category-prd)/0.2)]">
          <p className="text-2xl font-display font-bold text-primary">{entries.length}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Total Entries</p>
        </div>
        <div className="entry-card text-center bg-[hsl(var(--category-teardown)/0.08)] border-[hsl(var(--category-teardown)/0.2)]">
          <p className="text-2xl font-display font-bold text-accent">{completedCount}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Completed</p>
        </div>
        <div className="entry-card text-center bg-[hsl(var(--category-experiment)/0.08)] border-[hsl(var(--category-experiment)/0.2)]">
          <p className="text-2xl font-display font-bold text-[hsl(var(--category-experiment))]">{inProgressCount}</p>
          <p className="text-xs text-muted-foreground mt-0.5">In Progress</p>
        </div>
      </section>

      {/* Category Grid */}
      <section>
        <h2 className="section-title mb-4">Portfolio Sections</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categoryCounts.map(({ category, label, count, Icon, route }) => (
            <Link key={category} to={route} className="entry-card group/card flex items-center gap-3">
              <div className={`h-10 w-10 rounded-lg ${CATEGORY_COLORS[category]} flex items-center justify-center shrink-0`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{label}</p>
                <p className="text-xs text-muted-foreground">{count} entries</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover/card:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Entries */}
      {recentEntries.length > 0 && (
        <section>
          <h2 className="section-title mb-4">Recent Activity</h2>
          <div className="space-y-2">
            {recentEntries.map((entry) => (
              <Link
                key={entry.id}
                to={CATEGORY_ROUTES[entry.category]}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="h-2 w-2 rounded-full bg-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{entry.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {CATEGORY_LABELS[entry.category]} ·{" "}
                    {new Date(entry.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
