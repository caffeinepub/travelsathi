import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Download,
  Hotel,
  MapPin,
  Sparkles,
  Utensils,
  Wallet,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  DESTINATIONS,
  calculateBudget,
  generateItinerary,
} from "../data/travelData";

interface PlannerPageProps {
  initialDestination?: string;
  savedItineraries: string[];
  onSaveItinerary: (key: string) => void;
}

export default function PlannerPage({
  initialDestination,
  onSaveItinerary,
}: PlannerPageProps) {
  const [destination, setDestination] = useState(initialDestination || "");
  const [days, setDays] = useState("3");
  const [budget, setBudget] = useState("7000");
  const [travelStyle, setTravelStyle] = useState<"budget" | "mid" | "luxury">(
    "budget",
  );
  const [activeTab, setActiveTab] = useState("planner");
  const [itinerary, setItinerary] = useState<
    ReturnType<typeof generateItinerary>
  >([]);
  const [budgetBreakdown, setBudgetBreakdown] = useState<ReturnType<
    typeof calculateBudget
  > | null>(null);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (!destination) {
      toast.error("Please select a destination first");
      return;
    }
    const result = generateItinerary(
      destination,
      Number.parseInt(days),
      Number.parseInt(budget),
    );
    setItinerary(result);
    setGenerated(true);
    toast.success("Itinerary generated!");
  };

  const handleCalculateBudget = () => {
    if (!destination) {
      toast.error("Please select a destination first");
      return;
    }
    const result = calculateBudget(
      destination,
      Number.parseInt(days),
      travelStyle,
    );
    setBudgetBreakdown(result);
  };

  const handleSave = () => {
    if (!destination || itinerary.length === 0) return;
    onSaveItinerary(`${destination}-${days}-${Date.now()}`);
    toast.success("Itinerary saved!");
  };

  const selectedDest = DESTINATIONS.find((d) => d.id === destination);

  return (
    <div data-ocid="planner.page" className="pb-20">
      <div className="bg-gradient-to-br from-teal-600 to-teal-500 px-4 pt-12 pb-6">
        <h1 className="font-display text-2xl font-bold text-white">
          Trip Planner
        </h1>
        <p className="text-teal-100 text-sm mt-0.5">
          Plan your perfect India trip
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="px-4 pt-4"
      >
        <TabsList className="w-full bg-muted/50 rounded-xl h-9 mb-4">
          <TabsTrigger
            value="planner"
            data-ocid="planner.itinerary.tab"
            className="flex-1 text-xs"
          >
            Itinerary
          </TabsTrigger>
          <TabsTrigger
            value="budget"
            data-ocid="planner.budget.tab"
            className="flex-1 text-xs"
          >
            Budget Calc
          </TabsTrigger>
        </TabsList>

        <TabsContent value="planner" className="mt-0 space-y-3">
          <div>
            <p className="text-xs font-semibold text-foreground flex items-center gap-1 mb-1.5">
              <MapPin size={12} className="text-primary" /> Destination
            </p>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger
                data-ocid="planner.destination.select"
                className="w-full text-sm h-10"
              >
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                {DESTINATIONS.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name}, {d.state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground flex items-center gap-1 mb-1.5">
              <Calendar size={12} className="text-primary" /> Number of Days
            </p>
            <input
              data-ocid="planner.days.input"
              type="number"
              min="1"
              max="14"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground flex items-center gap-1 mb-1.5">
              <Wallet size={12} className="text-primary" /> Total Budget (₹)
            </p>
            <input
              data-ocid="planner.budget.input"
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <Button
            data-ocid="planner.submit_button"
            onClick={handleGenerate}
            className="w-full bg-primary hover:bg-primary/90 text-white h-11 text-sm font-display font-bold"
          >
            <Sparkles size={16} className="mr-1.5" /> Generate Itinerary
          </Button>

          <AnimatePresence>
            {generated && itinerary.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-sm">
                    {selectedDest?.name} · {days} Days · ₹{budget}
                  </h3>
                  <button
                    type="button"
                    data-ocid="planner.save_button"
                    onClick={handleSave}
                    className="flex items-center gap-1 text-xs text-primary font-semibold"
                  >
                    <Download size={12} /> Save
                  </button>
                </div>

                {itinerary.map((day) => (
                  <motion.div
                    key={day.day}
                    data-ocid={`planner.day.item.${day.day}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: day.day * 0.1 }}
                    className="bg-card rounded-2xl p-4 card-shadow"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {day.day}
                        </span>
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm">
                          Day {day.day}
                        </p>
                        <p className="text-[10px] text-muted-foreground">
                          Est. cost: ₹{day.estimatedCost.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1.5 mb-3">
                      {day.activities.map((activity, i) => (
                        <div key={activity} className="flex items-start gap-2">
                          <div className="w-4 h-4 bg-primary/10 rounded-full flex items-center justify-center flex-none mt-0.5">
                            <span className="text-primary text-[8px] font-bold">
                              {i + 1}
                            </span>
                          </div>
                          <p className="text-xs text-foreground">{activity}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted/50 rounded-lg px-2 py-1">
                        <Hotel size={10} /> {day.stay}
                      </div>
                      {day.food[0] && (
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground bg-muted/50 rounded-lg px-2 py-1">
                          <Utensils size={10} /> {day.food[0]}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                <div className="bg-primary/5 rounded-xl p-3 flex items-center justify-between">
                  <p className="text-xs font-semibold">Total Estimated Cost</p>
                  <p className="font-display font-bold text-primary">
                    ₹
                    {itinerary
                      .reduce((s, d) => s + d.estimatedCost, 0)
                      .toLocaleString()}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="budget" className="mt-0 space-y-3">
          <div>
            <p className="text-xs font-semibold text-foreground flex items-center gap-1 mb-1.5">
              <MapPin size={12} className="text-primary" /> Destination
            </p>
            <Select value={destination} onValueChange={setDestination}>
              <SelectTrigger className="w-full text-sm h-10">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                {DESTINATIONS.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name}, {d.state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground mb-1.5 flex items-center gap-1">
              <Calendar size={12} className="text-primary" /> Number of Days
            </p>
            <input
              type="number"
              min="1"
              max="14"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="w-full border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground mb-2">
              Travel Style
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(["budget", "mid", "luxury"] as const).map((style) => (
                <button
                  type="button"
                  key={style}
                  onClick={() => setTravelStyle(style)}
                  className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                    travelStyle === style
                      ? "bg-primary text-white border-primary"
                      : "bg-card border-border text-muted-foreground"
                  }`}
                >
                  {style === "budget"
                    ? "🎒 Budget"
                    : style === "mid"
                      ? "✈️ Standard"
                      : "💎 Luxury"}
                </button>
              ))}
            </div>
          </div>

          <Button
            data-ocid="planner.budget.submit_button"
            onClick={handleCalculateBudget}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white h-11 text-sm font-display font-bold"
          >
            Calculate Budget
          </Button>

          <AnimatePresence>
            {budgetBreakdown && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl p-4 card-shadow space-y-3"
              >
                <h3 className="font-display font-bold text-sm">
                  Budget Breakdown · {selectedDest?.name} · {days} Days
                </h3>
                {(
                  [
                    {
                      label: "Transport",
                      value: budgetBreakdown.transport,
                      color: "bg-blue-500",
                      emoji: "✈️",
                    },
                    {
                      label: "Hotels",
                      value: budgetBreakdown.hotel,
                      color: "bg-orange-500",
                      emoji: "🏨",
                    },
                    {
                      label: "Food",
                      value: budgetBreakdown.food,
                      color: "bg-green-500",
                      emoji: "🍛",
                    },
                    {
                      label: "Activities",
                      value: budgetBreakdown.activities,
                      color: "bg-purple-500",
                      emoji: "🎯",
                    },
                  ] as const
                ).map(({ label, value, color, emoji }) => (
                  <div key={label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-foreground">
                        {emoji} {label}
                      </span>
                      <span className="text-xs font-bold">
                        ₹{value.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(value / budgetBreakdown.total) * 100}%`,
                        }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={`h-full rounded-full ${color}`}
                      />
                    </div>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex justify-between items-center">
                  <span className="font-display font-bold text-sm">Total</span>
                  <span className="font-display font-bold text-primary text-lg">
                    ₹{budgetBreakdown.total.toLocaleString()}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  );
}
