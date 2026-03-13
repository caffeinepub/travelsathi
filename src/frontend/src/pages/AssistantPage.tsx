import { Bot, Send, Sparkles, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  DESTINATIONS,
  calculateBudget,
  generateItinerary,
} from "../data/travelData";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const STARTER_PROMPTS = [
  "Plan a 3 day Goa trip under \u20b97000",
  "Best budget destination in India",
  "Plan 5 days in Ladakh",
  "Weekend getaway from Delhi under \u20b95000",
  "Best time to visit Kerala",
];

function generateResponse(message: string): string {
  const lower = message.toLowerCase();
  const dest = DESTINATIONS.find(
    (d) =>
      lower.includes(d.name.toLowerCase()) ||
      lower.includes(d.id.toLowerCase()),
  );
  const daysMatch = lower.match(/(\d+)\s*day/);
  const days = daysMatch ? Number.parseInt(daysMatch[1]) : 3;
  const budgetMatch = lower.match(/[\u20b9rs\s]+(\d[\d,]*)/);
  const budget = budgetMatch
    ? Number.parseInt(budgetMatch[1].replace(/,/g, ""))
    : 7000;

  if (
    lower.includes("best budget") ||
    lower.includes("budget destination") ||
    lower.includes("cheapest")
  ) {
    const budgetDests = DESTINATIONS.filter((d) => d.budgetFriendly);
    return `Here are India's best budget destinations\n\n${budgetDests.map((d, i) => `${i + 1}. ${d.name} (${d.state}) - avg \u20b9${d.avgBudgetPerDay}/day | Best time: ${d.bestSeason}`).join("\n")}\n\nVaranasi and Hampi are the most budget-friendly at under \u20b91,200/day!`;
  }

  if (lower.includes("best time") || lower.includes("when to visit")) {
    if (dest) {
      return `Best time to visit ${dest.name}\n\nSeason: ${dest.bestSeason}\n\n${dest.name} is ideal during this period for pleasant weather.\n\nPro tip: ${dest.tips[0]}`;
    }
    return "Best times to visit popular Indian destinations:\n\nGoa - Nov to Feb (dry season)\nManali/Ladakh - Jun to Sep (snow clears)\nJaipur - Oct to Mar (pleasant weather)\nKerala - Sep to Mar (post-monsoon lush)\nVaranasi - Oct to Mar (best ghats weather)";
  }

  if (lower.includes("weekend") || (days <= 2 && dest)) {
    if (dest) {
      return `Weekend trip to ${dest.name}\n\n${dest.description}\n\nQuick Itinerary:\nDay 1: ${dest.attractions[0]?.name} - ${dest.attractions[1]?.name}\nDay 2: ${dest.attractions[2]?.name || "Local exploration"} - Shopping & departure\n\nBudget: ~\u20b9${(dest.avgBudgetPerDay * 2).toLocaleString()} for 2 days\n\nTip: ${dest.tips[0]}`;
    }
  }

  if (dest) {
    const itinerary = generateItinerary(dest.id, days, budget);
    const budgetCalc = calculateBudget(
      dest.id,
      days,
      budget <= 5000 ? "budget" : budget <= 15000 ? "mid" : "luxury",
    );
    const chosenStay = dest.stays.sort(
      (a, b) => a.pricePerNight - b.pricePerNight,
    )[0];
    return `${days}-Day ${dest.name} Trip Plan\nBudget: \u20b9${budget.toLocaleString()}\n\n${dest.description}\n\n${itinerary.map((day) => `Day ${day.day}:\n${day.activities.map((a) => `- ${a}`).join("\n")}\nStay: ${day.stay}\nFood: ${day.food.join(", ")}`).join("\n\n")}\n\nBudget Breakdown:\n- Transport: \u20b9${budgetCalc.transport.toLocaleString()}\n- Hotels: \u20b9${budgetCalc.hotel.toLocaleString()}\n- Food: \u20b9${budgetCalc.food.toLocaleString()}\n- Activities: \u20b9${budgetCalc.activities.toLocaleString()}\nTotal: \u20b9${budgetCalc.total.toLocaleString()}\n\nRecommended Stay: ${chosenStay?.name} (\u20b9${chosenStay?.pricePerNight.toLocaleString()}/night)\n\nTop Tip: ${dest.tips[0]}`;
  }

  const trending = DESTINATIONS.filter((d) => d.trending).slice(0, 3);
  return `Namaste! \ud83d\ude4f I'm your TravelSathi AI assistant.\n\nI can help you:\n- Plan day-wise itineraries\n- Calculate travel budgets\n- Find best stays & food\n- Suggest hidden spots\n\nTrending destinations right now:\n${trending.map((d) => `- ${d.name} - ${d.tagline}`).join("\n")}\n\nTry asking: Plan a 3-day Goa trip under \u20b97000`;
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content:
        "Namaste! \ud83d\ude4f I am your TravelSathi AI assistant. Ask me to plan a trip, calculate budget, or find the best places to visit in India!\n\nTry: Plan a 3 day Goa trip under \u20b97000",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(
      () => {
        const response = generateResponse(text);
        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsTyping(false);
      },
      800 + Math.random() * 500,
    );
  };

  return (
    <div
      data-ocid="assistant.page"
      className="flex flex-col h-screen pb-16 max-w-[430px] mx-auto"
    >
      <div className="bg-gradient-to-br from-violet-600 to-violet-500 px-4 pt-12 pb-4 flex-none">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-display text-lg font-bold text-white">
              AI Travel Assistant
            </h1>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-violet-100 text-xs">
                Online \u00b7 Always here to help
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto hide-scrollbar px-4 py-2 bg-violet-50 flex-none border-b border-border">
        {STARTER_PROMPTS.map((prompt) => (
          <button
            type="button"
            key={prompt}
            onClick={() => sendMessage(prompt)}
            className="flex-none text-[10px] bg-white text-violet-700 border border-violet-200 px-2.5 py-1.5 rounded-full font-medium whitespace-nowrap hover:bg-violet-50 transition-colors"
          >
            <Sparkles size={9} className="inline mr-1" />
            {prompt}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center flex-none mt-0.5 ${msg.role === "user" ? "bg-primary" : "bg-violet-600"}`}
              >
                {msg.role === "user" ? (
                  <User size={14} className="text-white" />
                ) : (
                  <Bot size={14} className="text-white" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2.5 text-xs ${
                  msg.role === "user"
                    ? "bg-primary text-white rounded-tr-sm"
                    : "bg-card text-foreground rounded-tl-sm card-shadow"
                }`}
              >
                <pre className="whitespace-pre-wrap font-body text-xs leading-relaxed">
                  {msg.content}
                </pre>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex gap-2"
            >
              <div className="w-7 h-7 bg-violet-600 rounded-full flex items-center justify-center flex-none">
                <Bot size={14} className="text-white" />
              </div>
              <div className="bg-card rounded-2xl rounded-tl-sm px-3 py-2.5 card-shadow">
                <div className="flex gap-1 items-center h-4">
                  {([0, 1, 2] as const).map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.15,
                      }}
                      className="w-1.5 h-1.5 bg-violet-400 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-3 bg-white border-t border-border flex-none">
        <div className="flex gap-2">
          <input
            data-ocid="assistant.input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Plan a 3 day Goa trip under \u20b97000..."
            className="flex-1 border border-input rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="button"
            data-ocid="assistant.submit_button"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center disabled:opacity-50"
          >
            <Send size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
