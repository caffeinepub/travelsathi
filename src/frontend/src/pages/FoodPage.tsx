import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { ALL_FOOD, DESTINATIONS } from "../data/travelData";
import type { FoodPlace } from "../data/travelData";

type FoodType = "all" | "restaurant" | "street_food" | "cafe";

export default function FoodPage() {
  const [filterType, setFilterType] = useState<FoodType>("all");
  const [filterDest, setFilterDest] = useState("all");

  const filtered = ALL_FOOD.filter((f) => {
    const typeOk = filterType === "all" || f.type === filterType;
    const destOk = filterDest === "all" || f.destination === filterDest;
    return typeOk && destOk;
  });

  return (
    <div data-ocid="food.page" className="pb-20">
      <div className="bg-gradient-to-br from-orange-500 to-red-500 px-4 pt-12 pb-6">
        <h1 className="font-display text-2xl font-bold text-white">
          Food Guide
        </h1>
        <p className="text-orange-100 text-sm mt-0.5">
          Discover the best of Indian cuisine
        </p>
      </div>

      <div className="px-4 pt-4 space-y-3">
        <Select value={filterDest} onValueChange={setFilterDest}>
          <SelectTrigger
            data-ocid="food.destination.select"
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
          {(["all", "restaurant", "street_food", "cafe"] as FoodType[]).map(
            (type) => (
              <button
                type="button"
                key={type}
                data-ocid="food.filter.tab"
                onClick={() => setFilterType(type)}
                className={`flex-none px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filterType === type
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {type === "all"
                  ? "🍽 All"
                  : type === "restaurant"
                    ? "🍛 Restaurant"
                    : type === "street_food"
                      ? "🛺 Street Food"
                      : "☕ Café"}
              </button>
            ),
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          {filtered.length} places found
        </p>

        {filtered.length === 0 ? (
          <div data-ocid="food.empty_state" className="text-center py-12">
            <p className="text-4xl mb-3">🍽️</p>
            <p className="text-sm text-muted-foreground">
              No food places match your filters
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((food, i) => (
              <FoodCard key={food.id} food={food} index={i + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FoodCard({ food, index }: { food: FoodPlace; index: number }) {
  const dest = DESTINATIONS.find((d) => d.id === food.destination);

  const typeLabel: Record<FoodPlace["type"], string> = {
    restaurant: "🍛 Restaurant",
    street_food: "🛺 Street Food",
    cafe: "☕ Café",
  };

  const priceLabel: Record<FoodPlace["priceRange"], string> = {
    budget: "₹ Budget",
    mid: "₹₹ Mid-range",
    luxury: "₹₹₹ Luxury",
  };

  const priceColor: Record<FoodPlace["priceRange"], string> = {
    budget: "text-green-600 bg-green-50",
    mid: "text-amber-700 bg-amber-50",
    luxury: "text-purple-700 bg-purple-50",
  };

  return (
    <motion.div
      data-ocid={`food.item.${index}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-card rounded-2xl p-4 card-shadow"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-display font-bold text-sm text-foreground">
            {food.name}
          </p>
          <p className="text-[11px] text-muted-foreground">{food.cuisine}</p>
        </div>
        <div className="flex items-center gap-0.5 flex-none">
          <Star size={11} className="fill-amber-400 text-amber-400" />
          <span className="text-xs font-semibold">{food.rating}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2 flex-wrap">
        <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {typeLabel[food.type]}
        </span>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${priceColor[food.priceRange]}`}
        >
          {priceLabel[food.priceRange]}
        </span>
      </div>
      <div className="mt-2 bg-orange-50 rounded-xl p-2.5">
        <p className="text-[10px] text-orange-700">
          <span className="font-semibold">Must try:</span> {food.specialty}
        </p>
      </div>
      <div className="flex items-center gap-1 mt-2">
        <MapPin size={10} className="text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground">
          {food.location}
        </span>
        {dest && (
          <span className="text-[10px] text-muted-foreground">
            · {dest.name}
          </span>
        )}
      </div>
    </motion.div>
  );
}
