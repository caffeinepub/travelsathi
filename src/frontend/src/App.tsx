import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence } from "motion/react";
import { useState } from "react";

import { UserRole } from "./backend";
import BottomNav from "./components/BottomNav";
import { useUserRole } from "./hooks/useQueries";
import AdminPage from "./pages/AdminPage";
import AssistantPage from "./pages/AssistantPage";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import FoodPage from "./pages/FoodPage";
import HomePage from "./pages/HomePage";
import LocalGuidePage from "./pages/LocalGuidePage";
import LoginPage from "./pages/LoginPage";
import PlannerPage from "./pages/PlannerPage";
import SavedPage from "./pages/SavedPage";
import StaysPage from "./pages/StaysPage";

const queryClient = new QueryClient();

type Page = "home" | "planner" | "stays" | "food" | "assistant";
type Overlay = "destination" | "localguide" | "admin" | "saved" | null;

function AppInner() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState<Page>("home");
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(
    null,
  );
  const [plannerDestination, setPlannerDestination] = useState<
    string | undefined
  >(undefined);
  const [savedDestinations, setSavedDestinations] = useState<string[]>([]);
  const [savedItineraries, setSavedItineraries] = useState<string[]>([]);

  const { data: userRole } = useUserRole();

  const handleDestinationSelect = (id: string) => {
    setSelectedDestination(id);
    setOverlay("destination");
  };

  const handleToggleSave = (id: string) => {
    setSavedDestinations((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const handlePlanTrip = (destinationId: string) => {
    setPlannerDestination(destinationId);
    setOverlay(null);
    setActivePage("planner");
  };

  const handleSaveItinerary = (key: string) => {
    setSavedItineraries((prev) => [...prev, key]);
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-[430px] mx-auto min-h-screen">
        <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile container */}
      <div className="max-w-[430px] mx-auto relative min-h-screen bg-background overflow-hidden">
        {/* Main pages */}
        {activePage === "home" && (
          <HomePage
            onDestinationSelect={handleDestinationSelect}
            savedDestinations={savedDestinations}
            onToggleSave={handleToggleSave}
            onNavigateToAdmin={
              userRole === UserRole.admin
                ? () => setOverlay("admin")
                : undefined
            }
            userRole={userRole}
            onNavigateToSaved={() => setOverlay("saved")}
          />
        )}
        {activePage === "planner" && (
          <PlannerPage
            initialDestination={plannerDestination}
            savedItineraries={savedItineraries}
            onSaveItinerary={handleSaveItinerary}
          />
        )}
        {activePage === "stays" && <StaysPage />}
        {activePage === "food" && <FoodPage />}
        {activePage === "assistant" && <AssistantPage />}

        {/* Overlays */}
        <AnimatePresence>
          {overlay === "destination" && selectedDestination && (
            <DestinationDetailPage
              key="destination"
              destinationId={selectedDestination}
              onBack={() => setOverlay(null)}
              isSaved={savedDestinations.includes(selectedDestination)}
              onToggleSave={() => handleToggleSave(selectedDestination)}
              onPlanTrip={handlePlanTrip}
            />
          )}
          {overlay === "localguide" && (
            <LocalGuidePage key="localguide" onBack={() => setOverlay(null)} />
          )}
          {overlay === "admin" && (
            <AdminPage key="admin" onBack={() => setOverlay(null)} />
          )}
          {overlay === "saved" && (
            <SavedPage
              key="saved"
              onBack={() => setOverlay(null)}
              savedDestinations={savedDestinations}
              savedItineraries={savedItineraries}
              onRemoveSaved={handleToggleSave}
              onDestinationSelect={(id) => {
                setSelectedDestination(id);
                setOverlay("destination");
              }}
            />
          )}
        </AnimatePresence>

        {/* Bottom Nav - only show when no full overlay is open */}
        {!overlay && (
          <BottomNav activePage={activePage} onNavigate={setActivePage} />
        )}
      </div>

      <Toaster position="top-center" />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInner />
    </QueryClientProvider>
  );
}
