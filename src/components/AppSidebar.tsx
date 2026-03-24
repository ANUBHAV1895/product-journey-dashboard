import {
  LayoutDashboard,
  FileText,
  Search,
  FlaskConical,
  BookOpen,
  Award,
  Telescope,
  PenTool,
  Sparkles,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type { EntryCategory } from "@/lib/types";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
];

const sectionItems: { title: string; url: string; icon: React.ElementType; category: EntryCategory }[] = [
  { title: "Case Studies", url: "/case-study", icon: Search, category: "case-study" },
  { title: "PRDs", url: "/prd", icon: FileText, category: "prd" },
  { title: "Teardowns", url: "/teardown", icon: Telescope, category: "teardown" },
  { title: "Experiments", url: "/experiment", icon: FlaskConical, category: "experiment" },
  { title: "Learnings", url: "/learning", icon: BookOpen, category: "learning" },
  { title: "Certifications", url: "/certification", icon: Award, category: "certification" },
  { title: "Wireframes", url: "/wireframe", icon: PenTool, category: "wireframe" },
];

const SIDEBAR_ICON_COLORS: Record<EntryCategory, string> = {
  "case-study": "text-[hsl(var(--category-case-study))]",
  prd: "text-[hsl(var(--category-prd))]",
  teardown: "text-[hsl(var(--category-teardown))]",
  experiment: "text-[hsl(var(--category-experiment))]",
  learning: "text-[hsl(var(--category-learning))]",
  certification: "text-[hsl(var(--category-certification))]",
  wireframe: "text-[hsl(var(--category-wireframe))]",
};

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        {!collapsed && (
          <div className="px-4 pt-5 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-hero flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div>
                <h2 className="font-display text-base font-semibold text-sidebar-foreground tracking-tight">
                  PM Portfolio
                </h2>
                <p className="text-[10px] text-sidebar-foreground/60">Product Manager</p>
              </div>
            </div>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/40 uppercase text-[10px] tracking-widest">Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4 text-sidebar-primary" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/40 uppercase text-[10px] tracking-widest">Portfolio</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sectionItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground"
                      activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    >
                      <item.icon className={`mr-2 h-4 w-4 ${SIDEBAR_ICON_COLORS[item.category]}`} />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
