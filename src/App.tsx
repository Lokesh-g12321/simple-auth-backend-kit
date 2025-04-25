import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ComplaintsPage from "./pages/ComplaintsPage";
import PostPage from "./pages/PostPage";
import EventsPage from "./pages/EventsPage";
import LocatorPage from "./pages/LocatorPage";
import RateToiletPage from "./pages/RateToiletPage";
import FeedbackPage from "./pages/FeedbackPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/complaints" element={<ComplaintsPage />} />
          <Route path="/post" element={<PostPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/locator" element={<LocatorPage />} />
          <Route path="/rate-toilet" element={<RateToiletPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Sonner />
      <Toaster />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
