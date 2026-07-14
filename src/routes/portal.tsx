import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  Receipt,
  MapPin,
  MessageCircle,
  ShieldCheck,
  LogOut,
  Sparkles,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/portal")({
  component: PortalLayout,
  head: () => ({ meta: [{ title: "My Altura — Portal" }] }),
});

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const nav: NavItem[] = [
  { to: "/portal", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/portal/bundles", label: "Bundles & OTT", icon: Package },
  { to: "/portal/bills", label: "Bills", icon: Receipt },
  { to: "/portal/coverage", label: "Coverage", icon: MapPin },
  { to: "/portal/chat", label: "Talk to Priya", icon: MessageCircle },
  { to: "/portal/shield", label: "Fraud Shield", icon: ShieldCheck },
];

function PortalLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Auto-provision a demo user so /portal works without an explicit login.
    if (!user && typeof window !== "undefined") {
      const raw = window.localStorage.getItem("altura_user");
      if (!raw) {
        window.localStorage.setItem(
          "altura_user",
          JSON.stringify({ name: "Rohan Verma", email: "rohan@example.in", phone: "+91 98200 12345" }),
        );
        // Force a rerender by navigating in place.
        void navigate({ to: pathname as never, replace: true });
      }
    }
  }, [user, navigate, pathname]);

  const displayUser = user ?? { name: "Rohan Verma", email: "rohan@example.in", phone: "" };

  return (
    <div className="min-h-screen bg-[color:var(--muted)]/40">
      <div className="mx-auto flex max-w-7xl gap-6 p-4 md:p-6">
        {/* Sidebar */}
        <aside className={`${open ? "fixed inset-0 z-40 block bg-background/80 backdrop-blur md:static md:bg-transparent md:backdrop-blur-none" : "hidden"} md:sticky md:top-6 md:block md:h-[calc(100vh-3rem)] md:w-64 md:shrink-0`}>
          <div className="flex h-full w-64 flex-col rounded-2xl border border-border/60 bg-white p-4 shadow-[var(--shadow-card)]">
            <Link to="/" className="mb-6 flex items-center gap-2 px-2 pt-1">
              <div className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: "var(--gradient-primary)" }}>
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight">Altura</div>
                <div className="-mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">Portal</div>
              </div>
            </Link>

            <nav className="flex-1 space-y-1">
              {nav.map((item) => {
                const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                      active
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" /> {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-4 rounded-xl bg-secondary/40 p-3">
              <div className="text-sm font-medium">{displayUser.name}</div>
              <div className="truncate text-xs text-muted-foreground">{displayUser.email}</div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 w-full justify-start text-muted-foreground"
                onClick={() => {
                  logout();
                  toast("Logged out", { description: "See you soon!" });
                  void navigate({ to: "/" });
                }}
              >
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </Button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          <div className="mb-4 flex items-center justify-between md:hidden">
            <Button variant="outline" size="sm" onClick={() => setOpen((v) => !v)}>
              <Menu className="mr-2 h-4 w-4" /> Menu
            </Button>
            <div className="text-sm text-muted-foreground">Hi, {displayUser.name.split(" ")[0]}</div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
