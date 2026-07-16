import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ShieldCheck,
  Wifi,
  Tv,
  Wallet,
  MapPin,
  Sparkles,
  Unlock,
  PiggyBank,
  HeartHandshake,
  Gauge,
} from "lucide-react";
import { BUNDLES } from "@/lib/demo-data";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Benefits />
      <BundlePreview />
      <SavingsBand />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight">Altura</div>
            <div className="-mt-0.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Communications</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#benefits" className="text-sm text-muted-foreground hover:text-foreground">Benefits</a>
          <a href="#bundles" className="text-sm text-muted-foreground hover:text-foreground">Bundles</a>
          <a href="#savings" className="text-sm text-muted-foreground hover:text-foreground">Savings</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/portal">
            <Button size="sm" className="rounded-full">Open portal <ArrowRight className="ml-1 h-4 w-4" /></Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
        <div className="flex flex-col justify-center">
          <Badge variant="secondary" className="mb-5 w-fit rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-foreground shadow-sm">
            <Unlock className="mr-1.5 h-3 w-3" /> No lock-in · cancel any service any time
          </Badge>
          <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
            One home.<br />
            One honest bill.<br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Everything connected.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Broadband, postpaid SIM, the OTT apps you actually watch, payments, and fraud protection — bundled how <em>you</em> want it. Real savings, real people, no fine print.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/portal/bundles">
              <Button size="lg" className="rounded-full shadow-lg">Build my bundle <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
            <Link to="/portal">
              <Button size="lg" variant="outline" className="rounded-full bg-white/60 backdrop-blur">
                See customer portal
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><PiggyBank className="h-4 w-4 text-[color:var(--savings)]" /> Save up to ₹947/mo</span>
            <span className="flex items-center gap-2"><HeartHandshake className="h-4 w-4 text-primary" /> Real executive on chat</span>
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Optional Fraud Shield</span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-[3rem] bg-white/40 blur-3xl" />
          <img
            src={heroImg}
            alt="Isometric connected home with broadband, OTT and payments"
            className="mx-auto w-full max-w-lg rounded-[2rem] shadow-[var(--shadow-soft)]"
            width={1024}
            height={1024}
          />
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const stats = [
    { k: "1.3%", v: "Churn with bundling" },
    { k: "₹947", v: "Average monthly saving" },
    { k: "0", v: "Days of lock-in" },
    { k: "18+", v: "Cities with 5G+" },
  ];
  return (
    <div className="border-y border-border/60 bg-white/40">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.v}>
            <div className="text-3xl font-semibold tracking-tight text-primary">{s.k}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Benefits() {
  const items = [
    { icon: Wifi, title: "Ultra-fast WiFi", desc: "Up to 1 Gbps fibre with unlimited data, priority routing for streaming and video calls." },
    { icon: Tv, title: "OTT, your way", desc: "Pick from Netflix, Prime, JioHotstar, ZEE5, Sony LIV, YouTube Premium, Spotify and more." },
    { icon: Wallet, title: "Payments bank", desc: "Zero-balance account with UPI cashback rolled into your Altura bill." },
    { icon: ShieldCheck, title: "Fraud Shield", desc: "₹99/mo insurance covering SIM swap, phishing and digital fraud up to ₹2 lakh." },
    { icon: MapPin, title: "Nationwide coverage", desc: "5G+ across all metro cities and expanding 5G in every state capital." },
    { icon: Gauge, title: "Smart latency guard", desc: "Our agent watches speed in real time and auto-boosts your line when it dips." },
  ];
  return (
    <section id="benefits" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 max-w-2xl">
        <div className="text-sm font-medium uppercase tracking-widest text-primary">Benefits</div>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Everything a modern Indian home needs — under one honest bill.</h2>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((it) => (
          <Card key={it.title} className="border-border/60 bg-white/70 shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-soft)]">
            <CardContent className="p-6">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-secondary text-secondary-foreground">
                <it.icon className="h-5 w-5" />
              </div>
              <div className="text-lg font-semibold">{it.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function BundlePreview() {
  return (
    <section id="bundles" className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <div className="text-sm font-medium uppercase tracking-widest text-primary">Bundles</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Mix and match — you're always in control.</h2>
          </div>
          <Link to="/portal/bundles" className="hidden text-sm font-medium text-primary hover:underline md:block">
            Build your own →
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-5">
          {BUNDLES.map((b) => (
            <Card key={b.id} className="relative border-border/60 bg-white shadow-[var(--shadow-card)]">
              {b.badge && (
                <span className="absolute -top-3 left-4 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">
                  {b.badge}
                </span>
              )}
              <CardContent className="p-5">
                <div className="text-sm font-medium text-muted-foreground">{b.name.replace("Altura ", "")}</div>
                <div className="mt-2 text-3xl font-semibold tracking-tight">₹{b.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                <div className="mt-1 text-xs text-muted-foreground line-through">₹{b.standalone} separately</div>
                <div className="mt-4 text-xs leading-relaxed text-muted-foreground">{b.tagline}</div>
                <div className="mt-4 rounded-lg bg-secondary/60 px-3 py-2 text-xs text-secondary-foreground">
                  Save ₹{b.standalone - b.price}/mo
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function SavingsBand() {
  return (
    <section id="savings" className="mx-auto max-w-6xl px-6 py-20">
      <Card className="overflow-hidden border-border/60 bg-white shadow-[var(--shadow-soft)]">
        <div className="grid md:grid-cols-2">
          <div className="p-10 md:p-14">
            <div className="text-sm font-medium uppercase tracking-widest text-primary">Why one provider?</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">More services = <span className="text-[color:var(--savings)]">smaller</span> bill.</h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Everyone worries stacking services makes bills heavier. Altura flips that — every service you add reduces your total. We publish the math on your dashboard, every month.
            </p>
            <Link to="/portal" className="mt-6 inline-block">
              <Button size="lg" className="rounded-full">See your savings dashboard <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
          <div className="border-t border-border/60 bg-secondary/40 p-10 md:border-l md:border-t-0 md:p-14">
            <div className="space-y-4">
              {[
                { label: "Broadband + SIM (separate)", price: 1547 },
                { label: "+ 2 OTT apps (separate)", price: 948 },
                { label: "Total if bought separately", price: 2495, strong: true },
                { label: "Altura Family bundle", price: 1299, save: true },
              ].map((row) => (
                <div key={row.label} className={`flex items-baseline justify-between rounded-xl px-4 py-3 ${row.save ? "bg-[color:var(--savings)]/15" : "bg-white/70"}`}>
                  <span className={row.strong ? "font-medium" : "text-muted-foreground"}>{row.label}</span>
                  <span className={`font-semibold ${row.save ? "text-[color:var(--savings)]" : ""}`}>₹{row.price}</span>
                </div>
              ))}
              <div className="pt-2 text-center text-sm text-muted-foreground">You keep <span className="font-semibold text-foreground">₹1,196</span> every month.</div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/60 bg-white/50">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>© 2026 Altura Communications. Demo experience.</div>
          <div className="flex gap-4">
            <Link to="/portal/coverage" className="hover:text-foreground">Coverage</Link>
            <Link to="/portal/chat" className="hover:text-foreground">Talk to us</Link>
            <Link to="/portal/shield" className="hover:text-foreground">Fraud Shield</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

