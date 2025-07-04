
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";
import Index from "./pages/Index";
import Learn from "./pages/Learn";
import Debate from "./pages/Debate";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vakya-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SidebarProvider defaultOpen={false}>
            <div className="min-h-screen flex flex-col w-full bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950">
              <AppHeader />
              <div className="flex flex-1 w-full relative">
                <AppSidebar />
                <main className="flex-1 transition-all duration-300 ease-in-out">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/learn" element={<Learn />} />
                    <Route path="/debate" element={<Debate />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
