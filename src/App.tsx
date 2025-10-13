import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import GameDetail from "./pages/GameDetail";
import Library from "./pages/Library";
import Crowdfunding from "./pages/Crowdfunding";
import Mods from "./pages/Mods";
import Community from "./pages/Community";
import Wallet from "./pages/Wallet";
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
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/jogo/:slug" element={<GameDetail />} />
          <Route path="/biblioteca" element={<Library />} />
          <Route path="/crowdfunding" element={<Crowdfunding />} />
          <Route path="/mods" element={<Mods />} />
          <Route path="/comunidade" element={<Community />} />
          <Route path="/carteira" element={<Wallet />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
