import {
  ArrowLeft,
  Heart,
  Map as MapIcon,
  MapPin,
  Star,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { DESTINATIONS } from "../data/travelData";

interface SavedPageProps {
  onBack: () => void;
  savedDestinations: string[];
  savedItineraries: string[];
  onRemoveSaved: (id: string) => void;
  onDestinationSelect: (id: string) => void;
}

export default function SavedPage({
  onBack,
  savedDestinations,
  savedItineraries,
  onRemoveSaved,
  onDestinationSelect,
}: SavedPageProps) {
  const savedDests = DESTINATIONS.filter((d) =>
    savedDestinations.includes(d.id),
  );

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-0 bg-background z-40 overflow-y-auto max-w-[430px] mx-auto left-0 right-0 pb-6"
    >
      <div className="bg-gradient-to-br from-pink-500 to-rose-500 px-4 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div>
            <h1 className="font-display text-xl font-bold text-white">
              Saved Places
            </h1>
            <p className="text-pink-100 text-xs">
              {savedDests.length} destinations saved
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 pt-4 space-y-4">
        <section>
          <h2 className="font-display font-bold text-sm flex items-center gap-1.5 mb-3">
            <Heart size={14} className="text-pink-500" /> Saved Destinations
          </h2>

          {savedDests.length === 0 ? (
            <div
              data-ocid="saved.destinations.empty_state"
              className="text-center py-8 text-muted-foreground"
            >
              <p className="text-3xl mb-2">💙</p>
              <p className="text-sm">No saved destinations yet</p>
              <p className="text-xs mt-1">
                Tap the heart icon on any destination to save it
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {savedDests.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  data-ocid={`saved.destination.item.${i + 1}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-xl p-3 card-shadow flex items-center gap-3"
                >
                  <button
                    type="button"
                    className="w-12 h-12 rounded-xl flex-none overflow-hidden cursor-pointer"
                    onClick={() => onDestinationSelect(dest.id)}
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-1 min-w-0 text-left"
                    onClick={() => onDestinationSelect(dest.id)}
                  >
                    <p className="font-display font-bold text-sm">
                      {dest.name}
                    </p>
                    <div className="flex items-center gap-1">
                      <MapPin size={10} className="text-muted-foreground" />
                      <p className="text-[10px] text-muted-foreground">
                        {dest.state}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <Star
                        size={9}
                        className="fill-amber-400 text-amber-400"
                      />
                      <span className="text-[10px] font-semibold">
                        {dest.rating}
                      </span>
                    </div>
                  </button>
                  <button
                    type="button"
                    data-ocid={`saved.delete_button.${i + 1}`}
                    onClick={() => onRemoveSaved(dest.id)}
                    className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-destructive rounded-full hover:bg-muted"
                  >
                    <Trash2 size={14} />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="font-display font-bold text-sm flex items-center gap-1.5 mb-3">
            <MapIcon size={14} className="text-teal-500" /> Saved Itineraries
          </h2>

          {savedItineraries.length === 0 ? (
            <div
              data-ocid="saved.itineraries.empty_state"
              className="text-center py-8 text-muted-foreground"
            >
              <p className="text-3xl mb-2">🗺️</p>
              <p className="text-sm">No saved itineraries yet</p>
              <p className="text-xs mt-1">
                Generate and save a trip plan from the Planner tab
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {savedItineraries.map((key, i) => {
                const parts = key.split("-");
                const destId = parts[0];
                const tripDays = parts[1];
                const dest = DESTINATIONS.find((d) => d.id === destId);
                return (
                  <div
                    key={key}
                    data-ocid={`saved.itinerary.item.${i + 1}`}
                    className="bg-card rounded-xl p-3 card-shadow flex items-center gap-3"
                  >
                    <div className="w-9 h-9 bg-teal-100 rounded-xl flex items-center justify-center flex-none">
                      <MapIcon size={16} className="text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">
                        {dest?.name || destId} Trip
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {tripDays} days · Saved plan
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </motion.div>
  );
}
