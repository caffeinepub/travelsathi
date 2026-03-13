import {
  BedDouble,
  Bot,
  Home,
  Map as MapIcon,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "motion/react";

type Page = "home" | "planner" | "stays" | "food" | "assistant";

interface BottomNavProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const navItems = [
  { id: "home" as Page, label: "Home", icon: Home },
  { id: "planner" as Page, label: "Planner", icon: MapIcon },
  { id: "stays" as Page, label: "Stays", icon: BedDouble },
  { id: "food" as Page, label: "Food", icon: UtensilsCrossed },
  { id: "assistant" as Page, label: "AI Chat", icon: Bot },
];

export default function BottomNav({ activePage, onNavigate }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-border z-50"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              type="button"
              key={item.id}
              data-ocid={`nav.${item.id}.link`}
              onClick={() => onNavigate(item.id)}
              className="flex flex-col items-center justify-center flex-1 h-full gap-0.5 relative"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <Icon
                  size={20}
                  className={
                    isActive ? "text-primary" : "text-muted-foreground"
                  }
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
              </motion.div>
              <span
                className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
