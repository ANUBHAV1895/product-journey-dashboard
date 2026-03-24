import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-12 flex items-center border-b border-border px-4 bg-background/90 backdrop-blur-md sticky top-0 z-10">
            <SidebarTrigger className="mr-3" />
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground font-body">Product Manager Portfolio</span>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-8 max-w-6xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
