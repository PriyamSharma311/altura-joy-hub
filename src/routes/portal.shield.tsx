import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Check, AlertTriangle, Lock, IndianRupee } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/portal/shield")({
  component: ShieldPage,
  head: () => ({ meta: [{ title: "Fraud Shield — Altura" }] }),
});

function ShieldPage() {
  const [on, setOn] = useState(false);

  return (
    <div className="space-y-6">
      <header>
        <div className="text-xs font-medium uppercase tracking-widest text-primary">Add-on</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Altura Fraud Shield</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Insurance-backed protection for the modern Indian household. Because more of your life is online than ever.
        </p>
      </header>

      <Card className="overflow-hidden border-border/60 shadow-[var(--shadow-soft)]" style={{ background: "var(--gradient-mint)" }}>
        <CardContent className="grid gap-8 p-8 md:grid-cols-2 md:p-10">
          <div>
            <Badge className="rounded-full bg-white/80 text-foreground">Underwritten by Bajaj Allianz</Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Cover up to <span className="text-primary">₹2 lakh</span> against digital fraud.</h2>
            <p className="mt-3 text-secondary-foreground">
              SIM swap, phishing, UPI fraud, unauthorised OTT charges — if it happens through a service you hold with Altura, we cover the loss.
            </p>
            <div className="mt-6 flex items-baseline gap-2">
              <IndianRupee className="h-5 w-5 text-foreground" />
              <div className="text-5xl font-semibold tracking-tight">99</div>
              <div className="text-sm text-muted-foreground">per month</div>
            </div>
            <Button
              size="lg"
              className="mt-6 rounded-full"
              onClick={() => {
                setOn((v) => !v);
                toast.success(on ? "Fraud Shield paused" : "Fraud Shield active", {
                  description: on ? "You've opted out. No cancellation fee." : "You're covered starting today.",
                });
              }}
            >
              <ShieldCheck className="mr-2 h-4 w-4" /> {on ? "Turn off protection" : "Activate protection"}
            </Button>
            <p className="mt-2 text-[11px] text-muted-foreground">Cancel any time. No lock-in, refunded on daily basis.</p>
          </div>

          <div className="grid gap-3 self-start">
            {[
              { icon: Lock, title: "SIM swap protection", desc: "Instant SIM re-issue plus reimbursement for unauthorised transactions." },
              { icon: AlertTriangle, title: "Phishing & scam calls", desc: "AI screens your calls and messages. If a scam gets through, we pay." },
              { icon: ShieldCheck, title: "UPI & card fraud", desc: "Money moved out of your linked account? File a claim in-app; settled in 72 hrs." },
              { icon: Check, title: "OTT billing errors", desc: "Refund guarantee on wrong OTT charges routed through your Altura bill." },
            ].map((f) => (
              <div key={f.title} className="flex gap-3 rounded-2xl bg-white/85 p-4 shadow-sm">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <f.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">{f.title}</div>
                  <div className="text-xs text-muted-foreground">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-white shadow-[var(--shadow-card)]">
        <CardContent className="p-6">
          <div className="text-sm font-medium">How claims work</div>
          <ol className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              ["Report", "Tap 'File a claim' in your portal or tell Priya on chat."],
              ["Verify", "Our team checks the transaction against your Altura services."],
              ["Reimburse", "Approved claims settle to your linked account in 72 hours."],
            ].map(([t, d], i) => (
              <li key={t} className="rounded-xl bg-secondary/40 p-4">
                <div className="text-xs font-semibold text-primary">STEP {i + 1}</div>
                <div className="mt-1 text-sm font-medium">{t}</div>
                <div className="mt-1 text-xs text-muted-foreground">{d}</div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
