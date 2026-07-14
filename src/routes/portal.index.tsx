import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  TrendingDown,
  PiggyBank,
  Gauge,
  Wifi,
  Tv,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { DEMO_BILLS, BUNDLES } from "@/lib/demo-data";

export const Route = createFileRoute("/portal/")({
  component: Dashboard,
});

function Dashboard() {
  const current = BUNDLES.find((b) => b.id === "family")!;
  const bill = DEMO_BILLS.find((b) => b.status === "Due")!;
  const yearlyBase = current.standalone * 12;
  const yearlyActual = current.price * 12;
  const yearlySavings = yearlyBase - yearlyActual + current.cashback * 12;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-primary">Your household</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Good morning, Rohan.</h1>
          <p className="mt-1 text-muted-foreground">Here's how much your bundle is doing for you right now.</p>
        </div>
        <Badge variant="secondary" className="rounded-full px-3 py-1"><Sparkles className="mr-1 h-3 w-3" /> {current.name}</Badge>
      </header>

      {/* Savings hero */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2 overflow-hidden border-border/60 shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-mint)" }}>
          <CardContent className="p-8">
            <div className="flex items-center gap-2 text-sm font-medium text-secondary-foreground">
              <PiggyBank className="h-4 w-4" /> You are saving with Altura
            </div>
            <div className="mt-4 flex flex-wrap items-baseline gap-6">
              <div>
                <div className="text-5xl font-semibold tracking-tight">₹{current.standalone - current.price + current.cashback}</div>
                <div className="mt-1 text-sm text-secondary-foreground">this month</div>
              </div>
              <div>
                <div className="text-3xl font-semibold tracking-tight">₹{yearlySavings.toLocaleString("en-IN")}</div>
                <div className="mt-1 text-sm text-secondary-foreground">this year, if you stay</div>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm text-secondary-foreground">
              That's the difference between paying for each service separately and bundling them with Altura — plus your monthly cashback rewards.
            </p>
            <Link to="/portal/bills" className="mt-5 inline-block">
              <Button variant="secondary" className="rounded-full bg-white text-foreground hover:bg-white/90">
                See the maths <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-white shadow-[var(--shadow-card)]">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <TrendingDown className="h-4 w-4" /> Current bill
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-tight">₹{bill.amount}</div>
            <div className="text-xs text-muted-foreground">Due {new Date(bill.dueDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</div>
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>Data used</span><span>412 / 1000 GB</span>
              </div>
              <Progress value={41} />
            </div>
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>Cashback earned</span><span>₹{bill.cashback}</span>
              </div>
              <Progress value={75} />
            </div>
            <Link to="/portal/bills" className="mt-4 block">
              <Button className="w-full rounded-full" size="sm">Pay & download</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Latency card + active services */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2 border-border/60 bg-white shadow-[var(--shadow-card)]">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-primary" />
                <div className="text-sm font-medium">Line health</div>
              </div>
              <Badge variant="secondary" className="rounded-full">Auto-optimising</Badge>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <Stat label="Latency" value="18 ms" tone="good" />
              <Stat label="Down" value="612 Mbps" tone="good" />
              <Stat label="Up" value="284 Mbps" tone="good" />
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Our assistant monitors your line 24×7. If speed dips, we'll message you here and boost the connection automatically.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-white shadow-[var(--shadow-card)]">
          <CardContent className="p-6">
            <div className="text-sm font-medium">Active services</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3"><Wifi className="h-4 w-4 text-primary" /> WiFi · 1 Gbps</li>
              <li className="flex items-center gap-3"><Tv className="h-4 w-4 text-primary" /> Netflix · Prime · JioHotstar</li>
              <li className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-primary" /> Fraud Shield add-on</li>
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">Cancel any service any time. No lock-in, ever.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "good" }) {
  return (
    <div className="rounded-xl bg-secondary/40 p-4">
      <div className={`text-2xl font-semibold ${tone === "good" ? "text-[color:var(--success)]" : ""}`}>{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
