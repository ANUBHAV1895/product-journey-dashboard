import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import CaseStudyPage from "./pages/CaseStudyPage";
import PrdPage from "./pages/PrdPage";
import TeardownPage from "./pages/TeardownPage";
import ExperimentPage from "./pages/ExperimentPage";
import LearningPage from "./pages/LearningPage";
import CertificationPage from "./pages/CertificationPage";
import WireframePage from "./pages/WireframePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/case-study" element={<CaseStudyPage />} />
          <Route path="/prd" element={<PrdPage />} />
          <Route path="/teardown" element={<TeardownPage />} />
          <Route path="/experiment" element={<ExperimentPage />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/certification" element={<CertificationPage />} />
          <Route path="/wireframe" element={<WireframePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
