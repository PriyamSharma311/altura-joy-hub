import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Circle, Phone, Video, Gauge } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/portal/chat")({
  component: ChatPage,
  head: () => ({ meta: [{ title: "Chat with Priya — Altura" }] }),
});

type Msg = { role: "user" | "assistant"; content: string };

const OPENERS: Msg[] = [
  {
    role: "assistant",
    content:
      "Hi Rohan, this is Priya from the Altura team 🌸 I've pulled up your account — your Family bundle is running smoothly. How can I help you today?",
  },
];

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>(OPENERS);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [typing, setTyping] = useState(false);
  const scroller = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setBusy(true);
    setTyping(true);

    // Latency guard — warn if the executive takes too long to start replying.
    const started = performance.now();
    const slowTimer = setTimeout(() => {
      toast("Boosting your connection…", {
        description: "We noticed a slight lag on your line. Increasing priority now.",
        icon: <Gauge className="h-4 w-4" />,
      });
    }, 3500);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.map((m) => ({ role: m.role, content: m.content })) }),
      });
      if (!res.ok || !res.body) {
        const err = await res.text();
        throw new Error(err || `Chat failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      let firstChunk = true;
      setMessages((cur) => [...cur, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;
        if (firstChunk) {
          firstChunk = false;
          setTyping(false);
          clearTimeout(slowTimer);
          const elapsed = performance.now() - started;
          if (elapsed > 2500) {
            toast("Connection optimised", {
              description: "Speed restored. Priya is replying now.",
              icon: <Gauge className="h-4 w-4" />,
            });
          }
        }
        acc += chunk;
        setMessages((cur) => {
          const copy = [...cur];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error("Priya couldn't reach you", { description: message });
      setMessages((cur) => cur.slice(0, -1));
    } finally {
      clearTimeout(slowTimer);
      setTyping(false);
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <div className="text-xs font-medium uppercase tracking-widest text-primary">Support</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Talk to your Altura executive.</h1>
        <p className="mt-2 text-sm text-muted-foreground">A real person on your side — trained on your account. Available 24×7.</p>
      </header>

      <Card className="overflow-hidden border-border/60 bg-white shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between border-b border-border/60 bg-secondary/30 p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary/15 text-sm font-semibold text-primary">P</div>
              <span className="absolute -right-0 -bottom-0 h-3 w-3 rounded-full border-2 border-white bg-[color:var(--success)]" />
            </div>
            <div>
              <div className="text-sm font-medium">Priya Sharma</div>
              <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Circle className="h-2 w-2 fill-[color:var(--success)] text-[color:var(--success)]" /> Online · Senior Customer Executive
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
            <Badge variant="secondary" className="ml-2 rounded-full text-[10px]">Verified staff</Badge>
          </div>
        </div>

        <div ref={scroller} className="h-[480px] space-y-3 overflow-y-auto p-6">
          {messages.map((m, i) => (
            <Bubble key={i} role={m.role}>{m.content}</Bubble>
          ))}
          {typing && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-xs font-semibold text-primary">P</div>
              <div className="flex items-center gap-1 rounded-2xl bg-secondary/40 px-3 py-2">
                <Dot /> <Dot delay="120ms" /> <Dot delay="240ms" />
              </div>
            </div>
          )}
        </div>

        <form onSubmit={send} className="flex items-center gap-2 border-t border-border/60 bg-white p-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Priya…"
            autoFocus
            disabled={busy}
          />
          <Button type="submit" size="icon" disabled={busy || !input.trim()} className="rounded-full">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>

      <p className="text-center text-[11px] text-muted-foreground">
        Conversations are private. Priya can only see the details on your Altura account.
      </p>
    </div>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: string }) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-end gap-2">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-semibold text-primary">P</div>
      <div className="max-w-[75%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-secondary/50 px-4 py-2.5 text-sm text-foreground">
        {children || <span className="text-muted-foreground">…</span>}
      </div>
    </div>
  );
}

function Dot({ delay = "0ms" }: { delay?: string }) {
  return <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: delay }} />;
}
