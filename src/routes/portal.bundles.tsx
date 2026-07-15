import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { BUNDLES, OTT_CATALOG, type Bundle } from "@/lib/demo-data";
import { OttLogo } from "@/components/ott-logo";
import { Check, Gift, Sparkles, Unlock, Crown } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/portal/bundles")({
  component: BundlesPage,
  head: () => ({ meta: [{ title: "Bundles & OTT — Altura" }] }),
});

function BundlesPage() {
  const [selected, setSelected] = useState<Bundle>(BUNDLES[2]);
  const [ott, setOtt] = useState<string[]>(["netflix", "prime", "hotstar"]);
  const [yearly, setYearly] = useState(false);
  const [addShield, setAddShield] = useState(false);

  const toggleOtt = (id: string) => {
    setOtt((cur) => {
      if (cur.includes(id)) return cur.filter((x) => x !== id);
      if (cur.length >= selected.ottSlots) {
        toast("OTT slots full", { description: `${selected.name} includes ${selected.ottSlots} OTT app(s). Upgrade for more.` });
        return cur;
      }
      return [...cur, id];
    });
  };

  const monthly = selected.price + (addShield ? 99 : 0);
  const isPremium = selected.id === "creator" || selected.id === "ultra";
  // Premium 12+1: pay 12 months, get 13 months of service. Non-premium yearly: 10% off.
  const total = yearly ? (isPremium ? monthly * 12 : monthly * 12 * 0.9) : monthly;
  const bonusMonth = yearly && isPremium ? monthly : 0;
  const separately = useMemo(() => {
    const ottSum = ott.reduce((s, id) => s + (OTT_CATALOG.find((o) => o.id === id)?.monthly ?? 0), 0);
    // rough per-service standalone estimate
    return selected.standalone + ottSum - selected.ottSlots * 250;
  }, [ott, selected]);
  const save = Math.max(0, separately - monthly);

  return (
    <div className="space-y-6">
      <header>
        <div className="text-xs font-medium uppercase tracking-widest text-primary">Build your bundle</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Pick a base. Pick your OTT. Done.</h1>
        <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Unlock className="h-4 w-4 text-primary" /> No lock-in. Change or cancel anything from your portal, any time.
        </p>
      </header>

      {/* Bundle cards */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {BUNDLES.map((b) => {
          const active = b.id === selected.id;
          return (
            <button
              key={b.id}
              onClick={() => {
                setSelected(b);
                setOtt((cur) => cur.slice(0, b.ottSlots));
              }}
              className={`relative rounded-2xl border p-5 text-left transition ${
                active
                  ? "border-primary bg-white shadow-[var(--shadow-soft)]"
                  : "border-border/60 bg-white/70 hover:border-primary/50"
              }`}
            >
              {b.badge && (
                <span className="absolute -top-3 left-4 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                  {b.badge}
                </span>
              )}
              <div className="text-xs font-medium text-muted-foreground">{b.name.replace("Altura ", "")}</div>
              <div className="mt-2 text-2xl font-semibold tracking-tight">₹{b.price}<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
              <div className="mt-1 text-[11px] text-muted-foreground">{b.tagline}</div>
              <ul className="mt-3 space-y-1 text-[11px] text-muted-foreground">
                {b.includes.slice(0, 3).map((i) => (
                  <li key={i} className="flex items-start gap-1.5"><Check className="mt-0.5 h-3 w-3 shrink-0 text-primary" />{i}</li>
                ))}
              </ul>
              <div className="mt-3 rounded-lg bg-secondary/50 px-2 py-1 text-[11px] text-secondary-foreground">
                <Gift className="mr-1 inline h-3 w-3" />₹{b.cashback}/mo cashback
              </div>
            </button>
          );
        })}
      </div>

      {/* Customisation */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-border/60 bg-white shadow-[var(--shadow-card)] lg:col-span-2">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Choose your OTT</div>
                <div className="text-xs text-muted-foreground">{ott.length} of {selected.ottSlots} slots used · {selected.name}</div>
              </div>
              <Badge variant="secondary" className="rounded-full">Swap any time</Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {OTT_CATALOG.map((o) => {
                const on = ott.includes(o.id);
                return (
                  <button
                    key={o.id}
                    onClick={() => toggleOtt(o.id)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${
                      on ? "border-primary bg-primary/5" : "border-border/60 bg-white hover:border-primary/40"
                    }`}
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white ring-1 ring-border/60">
                      <OttLogo option={o} size={22} />
                    </span>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{o.name}</div>
                      <div className="text-[11px] text-muted-foreground">₹{o.monthly}/mo standalone</div>
                    </div>
                    {on && <Check className="h-4 w-4 text-primary" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-secondary/40 p-4">
              <div>
                <div className="text-sm font-medium">Add Fraud Shield</div>
                <div className="text-xs text-muted-foreground">Insurance against SIM swap, phishing, digital fraud — up to ₹2 lakh.</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">₹99/mo</span>
                <Switch checked={addShield} onCheckedChange={setAddShield} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-white shadow-[var(--shadow-soft)]">
          <CardContent className="p-6">
            <div className="text-sm font-medium">Your bundle</div>
            <div className="mt-4 space-y-2 text-sm">
              <Row label={selected.name} value={`₹${selected.price}`} />
              {addShield && <Row label="Fraud Shield" value="₹99" />}
              <Row label="OTT apps" value={ott.length ? `${ott.length} included` : "none"} muted />
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-secondary/40 p-3">
              <div className="text-sm">
                Pay yearly {isPremium ? (
                  <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    <Crown className="h-3 w-3" /> 12 + 1 free
                  </span>
                ) : (
                  <span className="text-muted-foreground">(10% off)</span>
                )}
              </div>
              <Switch checked={yearly} onCheckedChange={setYearly} />
            </div>

            {yearly && isPremium && (
              <div className="mt-3 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs text-foreground/80">
                <div className="flex items-center gap-1.5 font-medium text-primary">
                  <Crown className="h-3.5 w-3.5" /> Premium 12 + 1 offer
                </div>
                <p className="mt-1">
                  Pay for 12 months, enjoy <span className="font-semibold">13 full months</span> of service. That's an extra ₹{Math.round(bonusMonth).toLocaleString("en-IN")} of value — a real 1-month saving on top of your bundle discount.
                </p>
              </div>
            )}

            <div className="mt-6 border-t border-border/60 pt-4">
              <div className="flex items-baseline justify-between">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">You pay</div>
                <div className="text-3xl font-semibold tracking-tight">
                  ₹{Math.round(total).toLocaleString("en-IN")}
                  <span className="text-xs font-normal text-muted-foreground">/{yearly ? "yr" : "mo"}</span>
                </div>
              </div>
              <div className="mt-1 flex items-baseline justify-between text-xs text-muted-foreground">
                <span>Buying separately</span>
                <span className="line-through">₹{separately.toLocaleString("en-IN")}/mo</span>
              </div>
              {yearly && isPremium && (
                <div className="mt-1 flex items-baseline justify-between text-xs text-primary">
                  <span>Bonus month included</span>
                  <span className="font-semibold">+₹{Math.round(bonusMonth).toLocaleString("en-IN")} value</span>
                </div>
              )}
              <div className="mt-3 rounded-xl bg-[color:var(--savings)]/15 p-3 text-sm">
                <Sparkles className="mr-1 inline h-4 w-4 text-[color:var(--savings)]" />
                You save <span className="font-semibold">₹{save.toLocaleString("en-IN")}/mo</span> · ₹{(save * 12 + bonusMonth).toLocaleString("en-IN")}/year
              </div>
              <Button className="mt-5 w-full rounded-full" size="lg" onClick={() => toast.success("Bundle activated (demo)", { description: `${selected.name} is live on your account.` })}>
                Activate bundle
              </Button>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">Cancel any time from this portal. No fees.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? "text-muted-foreground" : ""}>{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
