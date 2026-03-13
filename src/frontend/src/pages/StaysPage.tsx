import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Coffee, Dumbbell, MapPin, Star, Waves, Wifi } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { ALL_STAYS, DESTINATIONS } from "../data/travelData";
import type { Stay } from "../data/travelData";

type StayType = "all" | "hotel" | "hostel" | "homestay" | "resort";

export default function StaysPage() {
  const [filterType, setFilterType] = useState<StayType>("all");
  const [filterDest, setFilterDest] = useState("all");
  const [maxPrice, setMaxPrice] = useState(25000);

  const filtered = ALL_STAYS.filter((s) => {
    const typeOk = filterType === "all" || s.type === filterType;
    const destOk = filterDest === "all" || s.destination === filterDest;
    const priceOk = s.pricePerNight <= maxPrice;
    return typeOk && destOk && priceOk;
  });

  const typeColors: Record<StayType, string> = {
    all: "bg-primary text-white",
    hotel: "bg-blue-500 text-white",
    hostel: "bg-green-500 text-white",
    homestay: "bg-amber-500 text-white",
    resort: "bg-purple-500 text-white",
  };

  return (
    <div data-ocid="stays.page" className="pb-20">
      <div className="bg-gradient-to-br from-blue-600 to-blue-500 px-4 pt-12 pb-6">
        <h1 className="font-display text-2xl font-bold text-white">
          Stay Finder
        </h1>
        <p className="text-blue-100 text-sm mt-0.5">
          Find the perfect place to stay
        </p>
      </div>

      <div className="px-4 pt-4 space-y-3">
        <Select value={filterDest} onValueChange={setFilterDest}>
          <SelectTrigger
            data-ocid="stays.destination.select"
            className="w-full text-sm h-9"
          >
            <SelectValue placeholder="All Destinations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Destinations</SelectItem>
            {DESTINATIONS.map((d) => (
              <SelectItem key={d.id} value={d.id}>
                {d.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {(["all", "hotel", "hostel", "homestay", "resort"] as StayType[]).map(
            (type) => (
              <button
                type="button"
                key={type}
                data-ocid="stays.filter.tab"
                onClick={() => setFilterType(type)}
                className={`flex-none px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                  filterType === type
                    ? typeColors[type]
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {type === "all"
                  ? "All Types"
                  : type === "homestay"
                    ? "🏠 Homestay"
                    : type === "hostel"
                      ? "🎒 Hostel"
                      : type === "hotel"
                        ? "🏨 Hotel"
                        : "🌴 Resort"}
              </button>
            ),
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-semibold text-foreground">
              Max Price per Night
            </span>
            <span className="text-xs font-bold text-primary">
              ₹{maxPrice.toLocaleString()}
            </span>
          </div>
          <input
            id="price-range"
            type="range"
            min="500"
            max="25000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number.parseInt(e.target.value))}
            className="w-full accent-primary"
          />
        </div>

        <p className="text-xs text-muted-foreground">
          {filtered.length} stays found
        </p>

        {filtered.length === 0 ? (
          <div
            data-ocid="stays.empty_state"
            className="text-center py-12 text-muted-foreground"
          >
            <p className="text-4xl mb-3">🏨</p>
            <p className="text-sm">No stays match your filters</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((stay, i) => (
              <StayCard key={stay.id} stay={stay} index={i + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StayCard({ stay, index }: { stay: Stay; index: number }) {
  const dest = DESTINATIONS.find((d) => d.id === stay.destination);
  const typeColors: Record<Stay["type"], string> = {
    hotel: "bg-blue-100 text-blue-700",
    hostel: "bg-green-100 text-green-700",
    homestay: "bg-amber-100 text-amber-700",
    resort: "bg-purple-100 text-purple-700",
  };

  const amenityIcons: Record<string, React.ReactNode> = {
    WiFi: <Wifi size={10} />,
    Pool: <Waves size={10} />,
    Restaurant: <Coffee size={10} />,
    Gym: <Dumbbell size={10} />,
  };

  return (
    <motion.div
      data-ocid={`stays.item.${index}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-card rounded-2xl p-4 card-shadow"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-sm text-foreground truncate">
            {stay.name}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${typeColors[stay.type]}`}
            >
              {stay.type}
            </span>
            <div className="flex items-center gap-0.5">
              <MapPin size={10} className="text-muted-foreground" />
              <span className="text-[10px] text-muted-foreground">
                {stay.location}
              </span>
            </div>
          </div>
          {dest && (
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {dest.name}, {dest.state}
            </p>
          )}
        </div>
        <div className="text-right flex-none">
          <p className="font-display font-bold text-primary text-base">
            ₹{stay.pricePerNight.toLocaleString()}
          </p>
          <p className="text-[10px] text-muted-foreground">per night</p>
          <div className="flex items-center gap-0.5 justify-end mt-1">
            <Star size={10} className="fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-semibold">{stay.rating}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 mt-3">
        {stay.amenities.slice(0, 5).map((amenity) => (
          <span
            key={amenity}
            className="flex items-center gap-1 text-[10px] bg-muted/60 text-muted-foreground px-2 py-1 rounded-full"
          >
            {amenityIcons[amenity] || null}
            {amenity}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
