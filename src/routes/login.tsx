import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Log in — Altura" }] }),
});

function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState(user?.name ?? "Rohan Verma");
  const [email, setEmail] = useState(user?.email ?? "rohan@example.in");
  const [phone, setPhone] = useState(user?.phone ?? "+91 98200 12345");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    login({ name, email, phone });
    toast.success(`Welcome, ${name.split(" ")[0]} 👋`);
    void navigate({ to: "/portal" });
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2" style={{ background: "var(--gradient-hero)" }}>
      <div className="hidden flex-col justify-between p-10 md:flex">
        <Link to="/" className="flex items-center gap-2 text-foreground">
          <div className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Altura</span>
        </Link>
        <div className="max-w-md">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight">Your connected home, in one calm dashboard.</h1>
          <p className="mt-4 text-muted-foreground">
            Log in to see this month's savings, pick your OTT, download bills, and talk to your Altura executive.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">Demo experience — any details work.</div>
      </div>

      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-md border-border/60 bg-white/95 shadow-[var(--shadow-soft)]">
          <CardContent className="p-8">
            <Link to="/" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3 w-3" /> Back home
            </Link>
            <div className="mb-6 flex gap-2 rounded-full bg-secondary/60 p-1 text-xs">
              <button onClick={() => setMode("login")} className={`flex-1 rounded-full px-3 py-1.5 font-medium transition ${mode === "login" ? "bg-white shadow" : "text-muted-foreground"}`}>Log in</button>
              <button onClick={() => setMode("signup")} className={`flex-1 rounded-full px-3 py-1.5 font-medium transition ${mode === "signup" ? "bg-white shadow" : "text-muted-foreground"}`}>Sign up</button>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {mode === "login" ? "Welcome back" : "Create your Altura ID"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Demo login — no OTP, no password, we trust you.</p>

            <form onSubmit={submit} className="mt-6 space-y-4">
              {mode === "signup" && (
                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
                </div>
              )}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Mobile</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1" />
              </div>
              <Button type="submit" className="w-full rounded-full" size="lg">
                {mode === "login" ? "Log in to portal" : "Create account"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
