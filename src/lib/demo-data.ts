export type OttOption = {
  id: string;
  name: string;
  monthly: number;
  color: string;
};

export const OTT_CATALOG: OttOption[] = [
  { id: "netflix",  name: "Netflix",           monthly: 649,  color: "#E50914" },
  { id: "prime",    name: "Prime Video",       monthly: 299,  color: "#00A8E1" },
  { id: "hotstar",  name: "JioHotstar",        monthly: 299,  color: "#1F80E0" },
  { id: "zee5",     name: "ZEE5",              monthly: 199,  color: "#8B1FCB" },
  { id: "sonyliv",  name: "Sony LIV",          monthly: 299,  color: "#0F1FA8" },
  { id: "appletv",  name: "Apple TV+",         monthly: 99,   color: "#111111" },
  { id: "chatgpt",  name: "ChatGPT Plus",      monthly: 1999, color: "#10A37F" },
  { id: "linkedin", name: "LinkedIn Premium",  monthly: 1099, color: "#0A66C2" },
  { id: "spotify",  name: "Spotify Premium",   monthly: 119,  color: "#1DB954" },
  { id: "youtube",  name: "YouTube Premium",   monthly: 149,  color: "#FF0000" },
];

export type Bundle = {
  id: string;
  name: string;
  tagline: string;
  price: number;      // monthly INR after bundle discount
  standalone: number; // sum if bought separately
  includes: string[];
  ottSlots: number;
  cashback: number;   // monthly reward INR
  badge?: string;
};

export const BUNDLES: Bundle[] = [
  {
    id: "starter",
    name: "Altura Starter",
    tagline: "Broadband + 1 OTT",
    price: 699,
    standalone: 998,
    includes: ["300 Mbps WiFi", "Unlimited data", "1 OTT of your choice"],
    ottSlots: 1,
    cashback: 30,
  },
  {
    id: "duo",
    name: "Altura Duo",
    tagline: "Broadband + Postpaid SIM + 2 OTT",
    price: 999,
    standalone: 1547,
    includes: ["500 Mbps WiFi", "Postpaid SIM · 75 GB", "Unlimited calls", "2 OTT apps"],
    ottSlots: 2,
    cashback: 60,
    badge: "Popular",
  },
  {
    id: "family",
    name: "Altura Family",
    tagline: "Broadband + SIM + Payments + 3 OTT",
    price: 1299,
    standalone: 2246,
    includes: [
      "1 Gbps WiFi",
      "Postpaid SIM · unlimited",
      "Altura Payments Bank",
      "3 OTT apps",
      "Free UPI cashback",
    ],
    ottSlots: 3,
    cashback: 120,
    badge: "Best Value",
  },
  {
    id: "creator",
    name: "Altura Creator",
    tagline: "Broadband + ChatGPT + LinkedIn + 1 OTT",
    price: 1799,
    standalone: 3396,
    includes: [
      "1 Gbps WiFi",
      "ChatGPT Plus",
      "LinkedIn Premium",
      "1 OTT of your choice",
    ],
    ottSlots: 1,
    cashback: 150,
    badge: "Pro",
  },
  {
    id: "ultra",
    name: "Altura Ultra",
    tagline: "Everything + Fraud Shield",
    price: 2499,
    standalone: 4795,
    includes: [
      "1 Gbps WiFi",
      "Postpaid SIM · unlimited",
      "Payments Bank",
      "4 OTT apps",
      "Fraud Shield insurance included",
    ],
    ottSlots: 4,
    cashback: 250,
  },
];

export type Bill = {
  id: string;
  month: string; // e.g. "June 2026"
  bundle: string;
  amount: number;
  ott: string[];
  savings: number;
  cashback: number;
  status: "Paid" | "Due";
  dueDate: string;
};

export const DEMO_BILLS: Bill[] = [
  { id: "ALT-2026-06", month: "June 2026", bundle: "Altura Family", amount: 1299, ott: ["Netflix", "Prime Video", "JioHotstar"], savings: 947, cashback: 120, status: "Paid", dueDate: "2026-06-15" },
  { id: "ALT-2026-05", month: "May 2026", bundle: "Altura Family", amount: 1299, ott: ["Netflix", "Prime Video", "JioHotstar"], savings: 947, cashback: 120, status: "Paid", dueDate: "2026-05-15" },
  { id: "ALT-2026-04", month: "April 2026", bundle: "Altura Duo", amount: 999, ott: ["Netflix", "Prime Video"], savings: 548, cashback: 60, status: "Paid", dueDate: "2026-04-15" },
  { id: "ALT-2026-03", month: "March 2026", bundle: "Altura Duo", amount: 999, ott: ["Netflix", "Prime Video"], savings: 548, cashback: 60, status: "Paid", dueDate: "2026-03-15" },
  { id: "ALT-2026-07", month: "July 2026", bundle: "Altura Family", amount: 1299, ott: ["Netflix", "Prime Video", "JioHotstar"], savings: 947, cashback: 120, status: "Due", dueDate: "2026-07-15" },
];

export const COVERAGE_CITIES = [
  { name: "Mumbai", x: 22, y: 62, tier: "5G+" },
  { name: "Delhi NCR", x: 40, y: 30, tier: "5G+" },
  { name: "Bengaluru", x: 40, y: 82, tier: "5G+" },
  { name: "Hyderabad", x: 43, y: 72, tier: "5G+" },
  { name: "Chennai", x: 48, y: 88, tier: "5G+" },
  { name: "Kolkata", x: 72, y: 55, tier: "5G+" },
  { name: "Pune", x: 27, y: 66, tier: "5G" },
  { name: "Ahmedabad", x: 24, y: 48, tier: "5G" },
  { name: "Jaipur", x: 34, y: 42, tier: "5G" },
  { name: "Lucknow", x: 50, y: 42, tier: "5G" },
  { name: "Chandigarh", x: 38, y: 22, tier: "5G" },
  { name: "Kochi", x: 38, y: 92, tier: "5G" },
  { name: "Bhubaneswar", x: 63, y: 63, tier: "4G+" },
  { name: "Guwahati", x: 82, y: 42, tier: "4G+" },
  { name: "Indore", x: 34, y: 55, tier: "5G" },
  { name: "Nagpur", x: 44, y: 60, tier: "5G" },
  { name: "Coimbatore", x: 40, y: 88, tier: "5G" },
  { name: "Visakhapatnam", x: 55, y: 72, tier: "5G" },
];
