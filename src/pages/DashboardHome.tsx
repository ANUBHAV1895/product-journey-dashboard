import { usePortfolio } from "@/hooks/usePortfolio";
import { CATEGORY_LABELS, type EntryCategory } from "@/lib/types";
import { Link } from "react-router-dom";
import {
  FileText,
  Search,
  FlaskConical,
  BookOpen,
  Award,
  Telescope,
  ArrowRight,
  PenTool,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
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

const CATEGORY_BG_TINTS: Record<EntryCategory, string> = {
  "case-study": "bg-[hsl(var(--category-case-study)/0.08)] border-[hsl(var(--category-case-study)/0.18)] hover:border-[hsl(var(--category-case-study)/0.35)]",
  prd: "bg-[hsl(var(--category-prd)/0.08)] border-[hsl(var(--category-prd)/0.18)] hover:border-[hsl(var(--category-prd)/0.35)]",
  teardown: "bg-[hsl(var(--category-teardown)/0.08)] border-[hsl(var(--category-teardown)/0.18)] hover:border-[hsl(var(--category-teardown)/0.35)]",
  experiment: "bg-[hsl(var(--category-experiment)/0.08)] border-[hsl(var(--category-experiment)/0.18)] hover:border-[hsl(var(--category-experiment)/0.35)]",
  learning: "bg-[hsl(var(--category-learning)/0.08)] border-[hsl(var(--category-learning)/0.18)] hover:border-[hsl(var(--category-learning)/0.35)]",
  certification: "bg-[hsl(var(--category-certification)/0.08)] border-[hsl(var(--category-certification)/0.18)] hover:border-[hsl(var(--category-certification)/0.35)]",
  wireframe: "bg-[hsl(var(--category-wireframe)/0.08)] border-[hsl(var(--category-wireframe)/0.18)] hover:border-[hsl(var(--category-wireframe)/0.35)]",
};

const CATEGORY_TEXT: Record<EntryCategory, string> = {
  "case-study": "text-[hsl(var(--category-case-study))]",
  prd: "text-[hsl(var(--category-prd))]",
  teardown: "text-[hsl(var(--category-teardown))]",
  experiment: "text-[hsl(var(--category-experiment))]",
  learning: "text-[hsl(var(--category-learning))]",
  certification: "text-[hsl(var(--category-certification))]",
  wireframe: "text-[hsl(var(--category-wireframe))]",
};

const DOT_COLORS: Record<EntryCategory, string> = {
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
      {/* Hero Profile Section */}
      <section className="relative overflow-hidden rounded-2xl gradient-hero p-6 md:p-8 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="relative flex items-start justify-between">
          <div className="flex-1">
            {editing ? (
              <div className="space-y-3 max-w-md">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="font-display text-2xl font-bold bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  placeholder="Your Name"
                />
                <Input
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  placeholder="Your Role"
                />
                <Textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={3}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  placeholder="Short bio..."
                />
                <Button size="sm" onClick={handleSaveProfile} className="bg-white text-primary hover:bg-white/90">
                  <Check className="h-3.5 w-3.5 mr-1" /> Save
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-white/70" />
                  <span className="text-xs font-medium text-white/70 uppercase tracking-widest">Portfolio Dashboard</span>
                </div>
                <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                  {profile.name}
                </h1>
                <p className="text-white/80 font-medium mt-1 text-lg">{profile.role}</p>
                <p className="text-white/60 mt-2 max-w-2xl leading-relaxed text-sm">
                  {profile.bio}
                </p>
              </>
            )}
          </div>
          {!editing && (
            <Button
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white hover:bg-white/10"
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
        <div className="entry-card text-center gradient-card-1 border-transparent">
          <div className="flex items-center justify-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <p className="text-2xl font-display font-bold text-primary">{entries.length}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Total Entries</p>
        </div>
        <div className="entry-card text-center gradient-card-2 border-transparent">
          <div className="flex items-center justify-center gap-2 mb-1">
            <CheckCircle2 className="h-4 w-4 text-accent" />
          </div>
          <p className="text-2xl font-display font-bold text-accent">{completedCount}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Completed</p>
        </div>
        <div className="entry-card text-center gradient-card-3 border-transparent">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-[hsl(var(--category-experiment))]" />
          </div>
          <p className="text-2xl font-display font-bold text-[hsl(var(--category-experiment))]">{inProgressCount}</p>
          <p className="text-xs text-muted-foreground mt-0.5">In Progress</p>
        </div>
      </section>

      {/* Category Grid */}
      <section>
        <h2 className="section-title mb-4">Portfolio Sections</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categoryCounts.map(({ category, label, count, Icon, route }) => (
            <Link
              key={category}
              to={route}
              className={`rounded-xl border p-4 transition-all duration-300 group/card flex items-center gap-3 shadow-sm hover:shadow-lg hover:-translate-y-1 ${CATEGORY_BG_TINTS[category]}`}
            >
              <div className={`h-10 w-10 rounded-xl ${CATEGORY_COLORS[category]} flex items-center justify-center shrink-0 shadow-md`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{label}</p>
                <p className={`text-xs font-semibold ${CATEGORY_TEXT[category]}`}>{count} entries</p>
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
          <div className="space-y-1.5">
            {recentEntries.map((entry) => (
              <Link
                key={entry.id}
                to={CATEGORY_ROUTES[entry.category]}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/60 transition-all duration-200 group"
              >
                <div className={`colorful-dot ${DOT_COLORS[entry.category]}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{entry.title}</p>
                  <p className="text-xs text-muted-foreground">
                    <span className={`font-medium ${CATEGORY_TEXT[entry.category]}`}>
                      {CATEGORY_LABELS[entry.category]}
                    </span>
                    {" · "}
                    {new Date(entry.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
