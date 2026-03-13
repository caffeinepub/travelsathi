import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Bus,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  Heart,
  IndianRupee,
  Lightbulb,
  MapPin,
  Plane,
  Star,
  Train,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { DESTINATIONS, getCategoryGradient } from "../data/travelData";

interface DestinationDetailPageProps {
  destinationId: string;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
  onPlanTrip: (destinationId: string) => void;
}

export default function DestinationDetailPage({
  destinationId,
  onBack,
  isSaved,
  onToggleSave,
  onPlanTrip,
}: DestinationDetailPageProps) {
  const dest = DESTINATIONS.find((d) => d.id === destinationId);
  const [activeTab, setActiveTab] = useState("attractions");

  if (!dest) return null;

  const gradientClass = getCategoryGradient(dest.category);

  const routeIcon = (mode: string) => {
    if (mode === "flight") return <Plane size={14} />;
    if (mode === "train") return <Train size={14} />;
    return <Bus size={14} />;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed inset-0 bg-background z-40 overflow-y-auto max-w-[430px] mx-auto left-0 right-0"
      >
        <div className={`relative h-72 ${gradientClass}`}>
          <img
            src={dest.image}
            alt={dest.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 pt-12">
            <button
              type="button"
              onClick={onBack}
              className="w-9 h-9 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <ArrowLeft size={18} className="text-white" />
            </button>
            <button
              type="button"
              data-ocid="destination.save_button"
              onClick={onToggleSave}
              className="w-9 h-9 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center"
            >
              <Heart
                size={18}
                className={isSaved ? "fill-red-400 text-red-400" : "text-white"}
              />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <Badge className="bg-primary/80 text-white border-0 mb-2 text-xs capitalize backdrop-blur-sm">
              {dest.category}
            </Badge>
            <h1 className="font-display text-3xl font-bold text-white leading-tight">
              {dest.name}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <div className="flex items-center gap-1">
                <MapPin size={12} className="text-white/80" />
                <span className="text-white/90 text-xs">{dest.state}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span className="text-white/90 text-xs">
                  {dest.rating} ({dest.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex divide-x divide-border border-b border-border">
          <div className="flex-1 text-center py-3">
            <p className="font-display font-bold text-sm text-primary">
              ₹{dest.avgBudgetPerDay.toLocaleString()}
            </p>
            <p className="text-[10px] text-muted-foreground">per day avg</p>
          </div>
          <div className="flex-1 text-center py-3">
            <p className="font-display font-bold text-sm text-foreground">
              {dest.bestSeason.split(" ")[0]}
            </p>
            <p className="text-[10px] text-muted-foreground">Best season</p>
          </div>
          <div className="flex-1 text-center py-3">
            <p className="font-display font-bold text-sm text-foreground">
              {dest.attractions.length}
            </p>
            <p className="text-[10px] text-muted-foreground">Attractions</p>
          </div>
        </div>

        <div className="px-4 py-4 pb-24">
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {dest.description}
          </p>

          <button
            type="button"
            data-ocid="destination.plan_button"
            onClick={() => onPlanTrip(destinationId)}
            className="w-full bg-primary text-white rounded-xl py-3 font-display font-bold text-sm mb-4 flex items-center justify-center gap-2"
          >
            <MapPin size={16} /> Plan a Trip to {dest.name}
          </button>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full bg-muted/50 rounded-xl h-9 mb-4">
              <TabsTrigger
                value="attractions"
                data-ocid="destination.attractions.tab"
                className="flex-1 text-xs"
              >
                Attractions
              </TabsTrigger>
              <TabsTrigger
                value="routes"
                data-ocid="destination.routes.tab"
                className="flex-1 text-xs"
              >
                How to Reach
              </TabsTrigger>
              <TabsTrigger
                value="tips"
                data-ocid="destination.tips.tab"
                className="flex-1 text-xs"
              >
                Tips
              </TabsTrigger>
            </TabsList>

            <TabsContent value="attractions" className="space-y-2 mt-0">
              <div className="flex items-center gap-2 bg-amber-50 rounded-xl p-3 mb-3">
                <Clock size={14} className="text-amber-600" />
                <div>
                  <p className="text-xs font-semibold text-amber-800">
                    Best Time to Visit
                  </p>
                  <p className="text-xs text-amber-700">{dest.bestSeason}</p>
                </div>
              </div>

              <p className="text-xs font-bold text-foreground flex items-center gap-1 mb-1">
                <Eye size={12} className="text-primary" /> Top Attractions
              </p>
              {dest.attractions
                .filter((a) => a.type === "top")
                .map((attr) => (
                  <div
                    key={attr.name}
                    className="bg-card rounded-xl p-3 card-shadow"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-xs text-foreground">
                        {attr.name}
                      </p>
                      <span className="text-[10px] text-primary font-semibold whitespace-nowrap">
                        {attr.entryFee}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {attr.description}
                    </p>
                  </div>
                ))}

              <p className="text-xs font-bold text-foreground flex items-center gap-1 mt-3 mb-1">
                <EyeOff size={12} className="text-teal-600" /> Hidden Local
                Spots
              </p>
              {dest.attractions
                .filter((a) => a.type === "hidden")
                .map((attr) => (
                  <div key={attr.name} className="bg-teal-50 rounded-xl p-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-xs text-teal-800">
                        {attr.name}
                      </p>
                      <span className="text-[10px] text-teal-600 font-semibold whitespace-nowrap">
                        {attr.entryFee}
                      </span>
                    </div>
                    <p className="text-[11px] text-teal-700 mt-0.5">
                      {attr.description}
                    </p>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="routes" className="space-y-2 mt-0">
              {dest.routes.map((route) => (
                <div
                  key={`${route.mode}-${route.from}`}
                  className="bg-card rounded-xl p-3 card-shadow"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-primary">
                      {routeIcon(route.mode)}
                    </span>
                    <span className="font-semibold text-xs capitalize text-foreground">
                      {route.mode}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      from {route.from}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    {route.details}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full">
                      ⏱ {route.duration}
                    </span>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {route.cost}
                    </span>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="tips" className="space-y-2 mt-0">
              {dest.tips.map((tip) => (
                <div
                  key={tip}
                  className="flex gap-2 bg-orange-50 rounded-xl p-3"
                >
                  <Lightbulb
                    size={14}
                    className="text-orange-500 flex-none mt-0.5"
                  />
                  <p className="text-xs text-orange-800">{tip}</p>
                </div>
              ))}
              <div className="flex items-center gap-2 bg-green-50 rounded-xl p-3">
                <IndianRupee size={14} className="text-green-600" />
                <div>
                  <p className="text-xs font-semibold text-green-800">
                    Average Budget
                  </p>
                  <p className="text-xs text-green-700">
                    ₹{dest.avgBudgetPerDay.toLocaleString()}/day per person
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-card rounded-xl p-3 card-shadow">
                <CheckCircle size={14} className="text-primary" />
                <div>
                  <p className="text-xs font-semibold">Best Season</p>
                  <p className="text-xs text-muted-foreground">
                    {dest.bestSeason}
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
