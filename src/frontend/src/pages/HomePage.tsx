import { Badge } from "@/components/ui/badge";
import {
  Bell,
  ChevronRight,
  Heart,
  MapPin,
  Search,
  Settings,
  Star,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { UserRole } from "../backend";
import { DESTINATIONS, getCategoryGradient } from "../data/travelData";
import type { Destination } from "../data/travelData";

interface HomePageProps {
  onDestinationSelect: (id: string) => void;
  savedDestinations: string[];
  onToggleSave: (id: string) => void;
  onNavigateToAdmin?: () => void;
  userRole?: UserRole;
  onNavigateToSaved?: () => void;
}

export default function HomePage({
  onDestinationSelect,
  savedDestinations,
  onToggleSave,
  onNavigateToAdmin,
  userRole,
  onNavigateToSaved,
}: HomePageProps) {
  const [search, setSearch] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const trending = DESTINATIONS.filter((d) => d.trending);
  const budget = DESTINATIONS.filter((d) => d.budgetFriendly);
  const filtered = search
    ? DESTINATIONS.filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.state.toLowerCase().includes(search.toLowerCase()) ||
          d.category.toLowerCase().includes(search.toLowerCase()),
      )
    : null;

  return (
    <div data-ocid="home.page" className="pb-20">
      <div className="bg-gradient-to-br from-orange-500 to-orange-400 px-4 pt-12 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <img
              src="/assets/generated/travelsathi-logo-transparent.dim_200x200.png"
              alt="TravelSathi"
              className="w-9 h-9 object-contain"
            />
            <div>
              <h1 className="font-display text-white text-xl font-bold leading-none">
                TravelSathi
              </h1>
              <p className="text-orange-100 text-xs">
                Apka safar, hamara saath
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center"
            >
              <Bell size={16} className="text-white" />
            </button>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowUserMenu((v) => !v)}
                className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center"
              >
                <User size={16} className="text-white" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 top-11 bg-white rounded-xl shadow-lg border border-border z-50 w-44 py-1">
                  {onNavigateToSaved && (
                    <button
                      type="button"
                      onClick={() => {
                        onNavigateToSaved();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted/50"
                    >
                      <Heart size={14} /> Saved Places
                    </button>
                  )}
                  {userRole === UserRole.admin && onNavigateToAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        onNavigateToAdmin();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted/50"
                    >
                      <Settings size={14} /> Admin Panel
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            data-ocid="home.search_input"
            type="text"
            placeholder="Search destinations, states..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white rounded-xl pl-10 pr-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="px-4 py-5 space-y-7">
        {filtered && (
          <section>
            <h2 className="font-display text-base font-bold mb-3 text-foreground">
              Search Results ({filtered.length})
            </h2>
            {filtered.length === 0 ? (
              <div
                data-ocid="home.empty_state"
                className="text-center py-8 text-muted-foreground text-sm"
              >
                No destinations found for "{search}"
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {filtered.map((dest, i) => (
                  <DestinationCard
                    key={dest.id}
                    dest={dest}
                    index={i + 1}
                    onSelect={onDestinationSelect}
                    isSaved={savedDestinations.includes(dest.id)}
                    onToggleSave={onToggleSave}
                    size="grid"
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {!filtered && (
          <>
            <section>
              <SectionHeader
                title="Trending Now"
                icon={<TrendingUp size={15} />}
              />
              <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
                {trending.map((dest, i) => (
                  <DestinationCard
                    key={dest.id}
                    dest={dest}
                    index={i + 1}
                    onSelect={onDestinationSelect}
                    isSaved={savedDestinations.includes(dest.id)}
                    onToggleSave={onToggleSave}
                    size="horizontal"
                  />
                ))}
              </div>
            </section>

            <section>
              <SectionHeader title="Budget Picks" icon={<Wallet size={15} />} />
              <div className="flex gap-3 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
                {budget.map((dest, i) => (
                  <DestinationCard
                    key={dest.id}
                    dest={dest}
                    index={i + 1}
                    onSelect={onDestinationSelect}
                    isSaved={savedDestinations.includes(dest.id)}
                    onToggleSave={onToggleSave}
                    size="horizontal"
                  />
                ))}
              </div>
            </section>

            <section>
              <SectionHeader title="All Destinations" />
              <div className="grid grid-cols-2 gap-3">
                {DESTINATIONS.map((dest, i) => (
                  <DestinationCard
                    key={dest.id}
                    dest={dest}
                    index={i + 1}
                    onSelect={onDestinationSelect}
                    isSaved={savedDestinations.includes(dest.id)}
                    onToggleSave={onToggleSave}
                    size="grid"
                  />
                ))}
              </div>
            </section>

            <section>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-teal-600 to-teal-500 rounded-2xl p-4 text-white"
              >
                <p className="font-display font-bold text-base">
                  Know a hidden gem?
                </p>
                <p className="text-teal-100 text-xs mt-0.5 mb-3">
                  Share local tips and help fellow travelers discover secret
                  spots
                </p>
                <button
                  type="button"
                  data-ocid="home.localguide.button"
                  className="bg-white text-teal-600 text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1"
                >
                  Share a Tip <ChevronRight size={12} />
                </button>
              </motion.div>
            </section>
          </>
        )}
      </div>

      <footer className="px-4 py-6 text-center border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}

function SectionHeader({
  title,
  icon,
}: { title: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 mb-3">
      {icon && <span className="text-primary">{icon}</span>}
      <h2 className="font-display text-base font-bold text-foreground">
        {title}
      </h2>
    </div>
  );
}

interface DestinationCardProps {
  dest: Destination;
  index: number;
  onSelect: (id: string) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  size: "horizontal" | "grid";
}

function DestinationCard({
  dest,
  index,
  onSelect,
  isSaved,
  onToggleSave,
  size,
}: DestinationCardProps) {
  const gradientClass = getCategoryGradient(dest.category);

  if (size === "horizontal") {
    return (
      <motion.div
        data-ocid={`destinations.item.${index}`}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="flex-none w-48 rounded-2xl overflow-hidden card-shadow cursor-pointer bg-white"
        onClick={() => onSelect(dest.id)}
      >
        <div className={`relative h-28 ${gradientClass}`}>
          <img
            src={dest.image}
            alt={dest.name}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            type="button"
            data-ocid={`destinations.save_button.${index}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(dest.id);
            }}
            className="absolute top-2 right-2 w-7 h-7 bg-white/80 rounded-full flex items-center justify-center"
          >
            <Heart
              size={12}
              className={
                isSaved ? "fill-red-500 text-red-500" : "text-muted-foreground"
              }
            />
          </button>
          <div className="absolute bottom-2 left-2">
            <Badge className="bg-white/20 text-white border-0 text-[10px] backdrop-blur-sm">
              {dest.category}
            </Badge>
          </div>
        </div>
        <div className="p-2.5">
          <p className="font-display font-bold text-sm text-foreground">
            {dest.name}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin size={10} className="text-muted-foreground" />
            <p className="text-[10px] text-muted-foreground truncate">
              {dest.state}
            </p>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Star size={10} className="fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-semibold">{dest.rating}</span>
            <span className="text-[10px] text-muted-foreground">
              · from ₹{dest.avgBudgetPerDay}/day
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      data-ocid={`destinations.item.${index}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="rounded-2xl overflow-hidden card-shadow cursor-pointer bg-white"
      onClick={() => onSelect(dest.id)}
    >
      <div className={`relative h-24 ${gradientClass}`}>
        <img
          src={dest.image}
          alt={dest.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <button
          type="button"
          data-ocid={`destinations.save_button.${index}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(dest.id);
          }}
          className="absolute top-2 right-2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center"
        >
          <Heart
            size={10}
            className={
              isSaved ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }
          />
        </button>
      </div>
      <div className="p-2">
        <p className="font-display font-bold text-xs text-foreground">
          {dest.name}
        </p>
        <p className="text-[10px] text-muted-foreground">{dest.state}</p>
        <div className="flex items-center gap-1 mt-1">
          <Star size={9} className="fill-amber-400 text-amber-400" />
          <span className="text-[10px] font-semibold">{dest.rating}</span>
        </div>
      </div>
    </motion.div>
  );
}
