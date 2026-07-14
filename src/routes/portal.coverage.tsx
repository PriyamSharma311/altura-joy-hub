import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { COVERAGE_CITIES } from "@/lib/demo-data";
import { useState } from "react";
import { Search, MapPin } from "lucide-react";

export const Route = createFileRoute("/portal/coverage")({
  component: CoveragePage,
  head: () => ({ meta: [{ title: "Coverage — Altura" }] }),
});

function CoveragePage() {
  const [q, setQ] = useState("");
  const cities = COVERAGE_CITIES.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-6">
      <header>
        <div className="text-xs font-medium uppercase tracking-widest text-primary">Coverage</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Altura across India.</h1>
        <p className="mt-2 text-sm text-muted-foreground">18+ cities with 5G+, expanding to every state capital.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border/60 bg-white shadow-[var(--shadow-card)] lg:col-span-2">
          <CardContent className="p-6">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl" style={{ background: "var(--gradient-mint)" }}>
              {/* Stylised India silhouette */}
              <svg viewBox="0 0 100 120" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="in" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.85 0.06 200)" />
                    <stop offset="100%" stopColor="oklch(0.9 0.07 145)" />
                  </linearGradient>
                </defs>
                <path
                  d="M40 8 L55 10 L62 18 L70 22 L78 26 L82 34 L86 42 L85 50 L78 52 L74 58 L80 66 L78 74 L70 80 L64 84 L60 92 L55 100 L48 108 L42 108 L38 100 L34 92 L28 82 L22 74 L18 66 L14 58 L18 50 L20 42 L22 34 L26 26 L30 18 L34 10 Z"
                  fill="url(#in)"
                  stroke="oklch(0.55 0.14 235 / 0.35)"
                  strokeWidth="0.4"
                />
                {/* Pulse pings on cities */}
                {cities.map((c) => (
                  <g key={c.name}>
                    <circle cx={c.x} cy={c.y} r="1.4" fill="oklch(0.55 0.14 235)" />
                    <circle cx={c.x} cy={c.y} r="2.5" fill="oklch(0.55 0.14 235)" opacity="0.25">
                      <animate attributeName="r" values="2.5;4.5;2.5" dur="2.4s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.35;0;0.35" dur="2.4s" repeatCount="indefinite" />
                    </circle>
                  </g>
                ))}
                {cities.filter((c) => c.tier === "5G+").map((c) => (
                  <text key={`t-${c.name}`} x={c.x + 2} y={c.y + 1.5} fontSize="2.2" fill="oklch(0.24 0.03 240)" fontFamily="ui-sans-serif" fontWeight="600">
                    {c.name}
                  </text>
                ))}
              </svg>

              <div className="absolute bottom-4 left-4 flex gap-2 text-[11px]">
                <span className="rounded-full bg-white/90 px-3 py-1 shadow"><span className="mr-1 inline-block h-2 w-2 rounded-full bg-primary" />5G+ live</span>
                <span className="rounded-full bg-white/90 px-3 py-1 shadow"><span className="mr-1 inline-block h-2 w-2 rounded-full bg-secondary-foreground" />Expanding</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-white shadow-[var(--shadow-card)]">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search city" className="pl-9" />
            </div>
            <div className="mt-4 max-h-[500px] space-y-2 overflow-auto pr-1">
              {cities.map((c) => (
                <div key={c.name} className="flex items-center justify-between rounded-xl bg-secondary/30 px-3 py-2.5">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3.5 w-3.5 text-primary" /> {c.name}
                  </div>
                  <Badge variant="secondary" className="rounded-full text-[10px]">{c.tier}</Badge>
                </div>
              ))}
              {cities.length === 0 && <div className="text-sm text-muted-foreground">No matches. We're expanding fast — check back soon.</div>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
