import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InviteGenerator from "./pages/InviteGenerator";
// import InviteViewer from "./pages/InviteViewer";
import InviteViewer2 from "./pages/InveiteViewer2";
// import GiftSuggestions from "./pages/GiftSuggestions";
import NotFound from "./pages/NotFound";
import AudioPlayer from "./components/AudioPlayer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invites/admin/create" element={<InviteGenerator />} />
          {/* <Route path="/invites/view" element={<InviteViewer />} /> */}
          <Route path="/invites" element={<InviteViewer2 />} />
          {/* <Route path="/presentes" element={<GiftSuggestions />} /> */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AudioPlayer src="/fazendinha.mp3" />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
