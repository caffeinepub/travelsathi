import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CheckCircle,
  Hotel,
  MapPin,
  MessageSquare,
  Settings,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ALL_STAYS, DESTINATIONS, SEED_LOCAL_TIPS } from "../data/travelData";
import type { LocalTip } from "../data/travelData";

interface AdminPageProps {
  onBack: () => void;
}

export default function AdminPage({ onBack }: AdminPageProps) {
  const [submissions, setSubmissions] = useState<LocalTip[]>(SEED_LOCAL_TIPS);

  const handleApprove = (id: string) => {
    setSubmissions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "approved" } : t)),
    );
    toast.success("Submission approved!");
  };

  const handleReject = (id: string) => {
    setSubmissions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "rejected" } : t)),
    );
    toast.error("Submission rejected");
  };

  const pending = submissions.filter((t) => t.status === "pending");
  const approved = submissions.filter((t) => t.status === "approved");

  return (
    <motion.div
      data-ocid="admin.page"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed inset-0 bg-background z-40 overflow-y-auto max-w-[430px] mx-auto left-0 right-0 pb-6"
    >
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 px-4 pt-12 pb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="flex items-center gap-2">
            <Settings size={18} className="text-white" />
            <h1 className="font-display text-xl font-bold text-white">
              Admin Panel
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-white/10 rounded-xl p-2.5 text-center">
            <p className="font-bold text-white text-lg">
              {DESTINATIONS.length}
            </p>
            <p className="text-white/70 text-[10px]">Destinations</p>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 text-center">
            <p className="font-bold text-white text-lg">{ALL_STAYS.length}</p>
            <p className="text-white/70 text-[10px]">Stays Listed</p>
          </div>
          <div className="bg-white/10 rounded-xl p-2.5 text-center">
            <p className="font-bold text-amber-400 text-lg">{pending.length}</p>
            <p className="text-white/70 text-[10px]">Pending Tips</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="submissions" className="px-4 pt-4">
        <TabsList className="w-full bg-muted/50 rounded-xl h-9 mb-4">
          <TabsTrigger
            value="submissions"
            data-ocid="admin.submissions.tab"
            className="flex-1 text-xs"
          >
            <MessageSquare size={11} className="mr-1" />
            Submissions {pending.length > 0 && `(${pending.length})`}
          </TabsTrigger>
          <TabsTrigger
            value="destinations"
            data-ocid="admin.destinations.tab"
            className="flex-1 text-xs"
          >
            <MapPin size={11} className="mr-1" /> Destinations
          </TabsTrigger>
          <TabsTrigger
            value="stays"
            data-ocid="admin.stays.tab"
            className="flex-1 text-xs"
          >
            <Hotel size={11} className="mr-1" /> Stays
          </TabsTrigger>
        </TabsList>

        <TabsContent value="submissions" className="mt-0 space-y-3">
          {pending.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle size={32} className="text-green-500 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                All caught up! No pending submissions.
              </p>
            </div>
          )}
          {pending.length > 0 && (
            <>
              <p className="text-xs font-bold text-amber-600">
                ⏳ Pending Review ({pending.length})
              </p>
              {pending.map((tip, i) => (
                <motion.div
                  key={tip.id}
                  data-ocid={`admin.submission.item.${i + 1}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-2xl p-4 card-shadow border-l-4 border-amber-400"
                >
                  <p className="font-display font-bold text-sm">{tip.name}</p>
                  <p className="text-[10px] text-muted-foreground mb-1">
                    {DESTINATIONS.find((d) => d.id === tip.destination)?.name} ·{" "}
                    {tip.category} · by {tip.submittedBy}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {tip.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      data-ocid={`admin.approve_button.${i + 1}`}
                      size="sm"
                      onClick={() => handleApprove(tip.id)}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white h-8 text-xs"
                    >
                      <CheckCircle size={12} className="mr-1" /> Approve
                    </Button>
                    <Button
                      data-ocid={`admin.delete_button.${i + 1}`}
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(tip.id)}
                      className="flex-1 h-8 text-xs"
                    >
                      <XCircle size={12} className="mr-1" /> Reject
                    </Button>
                  </div>
                </motion.div>
              ))}
            </>
          )}
          {approved.length > 0 && (
            <>
              <p className="text-xs font-bold text-green-600 mt-4">
                ✅ Approved ({approved.length})
              </p>
              {approved.map((tip) => (
                <div key={tip.id} className="bg-green-50 rounded-xl p-3">
                  <p className="font-semibold text-xs text-green-800">
                    {tip.name}
                  </p>
                  <p className="text-[10px] text-green-600">
                    {DESTINATIONS.find((d) => d.id === tip.destination)?.name} ·{" "}
                    {tip.submittedBy}
                  </p>
                </div>
              ))}
            </>
          )}
        </TabsContent>

        <TabsContent value="destinations" className="mt-0 space-y-2">
          {DESTINATIONS.map((dest, i) => (
            <div
              key={dest.id}
              data-ocid={`admin.destination.item.${i + 1}`}
              className="bg-card rounded-xl p-3 card-shadow flex items-center gap-3"
            >
              <div
                className={`w-10 h-10 rounded-xl flex-none ${
                  dest.category === "beach"
                    ? "gradient-beach"
                    : dest.category === "mountain"
                      ? "gradient-mountain"
                      : dest.category === "heritage"
                        ? "gradient-heritage"
                        : dest.category === "spiritual"
                          ? "gradient-spiritual"
                          : dest.category === "nature"
                            ? "gradient-nature"
                            : "gradient-adventure"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-sm truncate">
                  {dest.name}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {dest.state} · {dest.category}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant="outline" className="text-[10px] h-5">
                  {dest.stays.length} stays
                </Badge>
                {dest.trending && (
                  <Badge className="bg-primary text-white text-[10px] h-5">
                    Trending
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="stays" className="mt-0 space-y-2">
          {ALL_STAYS.map((stay, i) => (
            <div
              key={stay.id}
              data-ocid={`admin.stay.item.${i + 1}`}
              className="bg-card rounded-xl p-3 card-shadow"
            >
              <div className="flex items-center justify-between">
                <p className="font-display font-bold text-xs">{stay.name}</p>
                <span className="text-xs font-bold text-primary">
                  ₹{stay.pricePerNight.toLocaleString()}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground">
                {DESTINATIONS.find((d) => d.id === stay.destination)?.name} ·{" "}
                {stay.type} · ⭐{stay.rating}
              </p>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
