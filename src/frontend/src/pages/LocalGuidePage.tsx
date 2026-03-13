import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle, Lightbulb, MapPin, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { DESTINATIONS, SEED_LOCAL_TIPS } from "../data/travelData";
import type { LocalTip } from "../data/travelData";

interface LocalGuidePageProps {
  onBack: () => void;
}

const CATEGORIES = [
  "Beach",
  "Food",
  "Scenic",
  "Spiritual",
  "Adventure",
  "Shopping",
  "Cultural",
  "Nature",
];

export default function LocalGuidePage({ onBack }: LocalGuidePageProps) {
  const [tips, setTips] = useState<LocalTip[]>(SEED_LOCAL_TIPS);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    destination: "",
    description: "",
    category: "",
    submittedBy: "",
  });
  const [filterDest, setFilterDest] = useState("all");

  const handleSubmit = () => {
    if (!form.name || !form.destination || !form.description) {
      toast.error("Please fill in all required fields");
      return;
    }
    const newTip: LocalTip = {
      id: `lt${Date.now()}`,
      ...form,
      submittedBy: form.submittedBy || "Anonymous",
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTips((prev) => [newTip, ...prev]);
    setForm({
      name: "",
      destination: "",
      description: "",
      category: "",
      submittedBy: "",
    });
    setShowForm(false);
    toast.success("Tip submitted! It will be reviewed shortly.");
  };

  const approvedTips = tips.filter((t) => t.status === "approved");
  const filteredTips =
    filterDest === "all"
      ? approvedTips
      : approvedTips.filter((t) => t.destination === filterDest);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-0 bg-background z-40 overflow-y-auto max-w-[430px] mx-auto left-0 right-0 pb-6"
    >
      <div className="bg-gradient-to-br from-teal-600 to-green-500 px-4 pt-12 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div>
            <h1 className="font-display text-xl font-bold text-white">
              Local Guide
            </h1>
            <p className="text-teal-100 text-xs">Hidden spots from locals</p>
          </div>
        </div>
        <button
          type="button"
          data-ocid="localguide.open_modal_button"
          onClick={() => setShowForm(true)}
          className="w-full bg-white text-teal-700 rounded-xl py-2.5 font-display font-bold text-sm flex items-center justify-center gap-2"
        >
          <Plus size={16} /> Share a Hidden Spot
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center max-w-[430px] mx-auto left-0 right-0"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              data-ocid="localguide.dialog"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full bg-white rounded-t-3xl p-5 space-y-3"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-border rounded-full mx-auto mb-2" />
              <h3 className="font-display font-bold text-base">
                Share a Hidden Spot
              </h3>

              <div>
                <p className="text-xs font-semibold mb-1">Spot Name *</p>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g. Secret Butterfly Beach"
                  className="w-full border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <p className="text-xs font-semibold mb-1">Destination *</p>
                <Select
                  value={form.destination}
                  onValueChange={(v) =>
                    setForm((prev) => ({ ...prev, destination: v }))
                  }
                >
                  <SelectTrigger className="text-sm h-9">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {DESTINATIONS.map((d) => (
                      <SelectItem key={d.id} value={d.id}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <p className="text-xs font-semibold mb-1">Category</p>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() =>
                        setForm((prev) => ({ ...prev, category: cat }))
                      }
                      className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                        form.category === cat
                          ? "bg-primary text-white border-primary"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold mb-1">Description *</p>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe the hidden spot, how to reach it, what makes it special..."
                  className="text-sm resize-none"
                  rows={3}
                />
              </div>

              <div>
                <p className="text-xs font-semibold mb-1">
                  Your Name (optional)
                </p>
                <input
                  value={form.submittedBy}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      submittedBy: e.target.value,
                    }))
                  }
                  placeholder="Anonymous"
                  className="w-full border border-input rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  variant="outline"
                  data-ocid="localguide.cancel_button"
                  onClick={() => setShowForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  data-ocid="localguide.submit_button"
                  onClick={handleSubmit}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white"
                >
                  Submit Tip
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-4 pt-4 space-y-3">
        <Select value={filterDest} onValueChange={setFilterDest}>
          <SelectTrigger className="text-sm h-9">
            <SelectValue placeholder="Filter by destination" />
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

        {filteredTips.length === 0 ? (
          <div data-ocid="localguide.empty_state" className="text-center py-12">
            <p className="text-4xl mb-3">🗺️</p>
            <p className="text-sm text-muted-foreground">
              No approved tips yet for this destination
            </p>
          </div>
        ) : (
          filteredTips.map((tip, i) => {
            const dest = DESTINATIONS.find((d) => d.id === tip.destination);
            return (
              <motion.div
                key={tip.id}
                data-ocid={`localguide.item.${i + 1}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-card rounded-2xl p-4 card-shadow"
              >
                <div className="flex items-start gap-2 mb-2">
                  <Lightbulb
                    size={14}
                    className="text-teal-600 flex-none mt-0.5"
                  />
                  <div className="flex-1">
                    <p className="font-display font-bold text-sm">{tip.name}</p>
                    {tip.category && (
                      <span className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">
                        {tip.category}
                      </span>
                    )}
                  </div>
                  <CheckCircle size={14} className="text-green-500 flex-none" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tip.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <MapPin size={10} className="text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">
                    {dest?.name || tip.destination}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    · by {tip.submittedBy}
                  </span>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
