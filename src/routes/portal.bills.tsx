import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Download, FileDown, Receipt } from "lucide-react";
import { DEMO_BILLS, type Bill } from "@/lib/demo-data";
import jsPDF from "jspdf";
import { toast } from "sonner";

export const Route = createFileRoute("/portal/bills")({
  component: BillsPage,
  head: () => ({ meta: [{ title: "Bills — Altura" }] }),
});

function downloadPdf(bill: Bill) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const w = doc.internal.pageSize.getWidth();

  // Header band
  doc.setFillColor(72, 133, 214);
  doc.rect(0, 0, w, 90, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Altura Communications", 40, 45);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("One home. One honest bill.", 40, 65);
  doc.setFontSize(10);
  doc.text(`Invoice ${bill.id}`, w - 40, 45, { align: "right" });
  doc.text(bill.month, w - 40, 62, { align: "right" });

  doc.setTextColor(20, 20, 30);
  let y = 130;

  doc.setFont("helvetica", "bold"); doc.setFontSize(12);
  doc.text("Billed to", 40, y);
  doc.setFont("helvetica", "normal");
  y += 18;
  doc.text("Rohan Verma", 40, y); y += 14;
  doc.text("rohan@example.in", 40, y); y += 14;
  doc.text("+91 98200 12345", 40, y); y += 28;

  doc.setFont("helvetica", "bold"); doc.text("Description", 40, y); doc.text("Amount (INR)", w - 40, y, { align: "right" });
  doc.setDrawColor(220); doc.line(40, y + 6, w - 40, y + 6);
  y += 24;
  doc.setFont("helvetica", "normal");

  const lines = [
    [`${bill.bundle} — monthly bundle`, bill.amount],
    [`OTT apps: ${bill.ott.join(", ")}`, 0],
    ["Bundle savings vs standalone", -bill.savings],
    ["Loyalty cashback", -bill.cashback],
  ] as const;
  for (const [label, val] of lines) {
    doc.text(String(label), 40, y);
    doc.text(val === 0 ? "—" : `₹ ${val.toLocaleString("en-IN")}`, w - 40, y, { align: "right" });
    y += 20;
  }

  y += 10;
  doc.setDrawColor(160); doc.line(40, y, w - 40, y); y += 24;
  doc.setFont("helvetica", "bold"); doc.setFontSize(13);
  doc.text("Total payable", 40, y);
  doc.text(`₹ ${(bill.amount - bill.cashback).toLocaleString("en-IN")}`, w - 40, y, { align: "right" });

  y += 40;
  doc.setFont("helvetica", "normal"); doc.setFontSize(10);
  doc.setTextColor(90);
  doc.text(`Status: ${bill.status}   ·   Due: ${bill.dueDate}`, 40, y); y += 16;
  doc.text("No lock-in. Cancel any service any time from the Altura portal.", 40, y); y += 30;
  doc.setFontSize(9);
  doc.text("Altura Communications Pvt. Ltd. · Demo invoice · GSTIN: 29AAACA0000A1Z5", 40, y);

  doc.save(`Altura_${bill.id}.pdf`);
}

function BillsPage() {
  const totalYear = DEMO_BILLS.filter((b) => b.status === "Paid").reduce((s, b) => s + b.amount, 0);
  const totalSaved = DEMO_BILLS.reduce((s, b) => s + b.savings + b.cashback, 0);

  return (
    <div className="space-y-6">
      <header>
        <div className="text-xs font-medium uppercase tracking-widest text-primary">Bills</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Every bill, one place.</h1>
        <p className="mt-2 text-sm text-muted-foreground">Download PDF invoices for broadband, SIM, OTT and add-ons — all consolidated.</p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard label="Paid this year" value={`₹${totalYear.toLocaleString("en-IN")}`} />
        <SummaryCard label="Saved this year" value={`₹${totalSaved.toLocaleString("en-IN")}`} tone="good" />
        <SummaryCard label="Cashback earned" value={`₹${DEMO_BILLS.reduce((s, b) => s + b.cashback, 0)}`} />
      </div>

      <Card className="border-border/60 bg-white shadow-[var(--shadow-card)]">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Bundle</TableHead>
                <TableHead>OTT</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DEMO_BILLS.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.month}</TableCell>
                  <TableCell>{b.bundle}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {b.ott.map((name) => {
                        const opt = OTT_CATALOG.find((o) => o.name === name);
                        if (!opt) return null;
                        return (
                          <span
                            key={name}
                            title={name}
                            className="grid h-6 w-6 place-items-center rounded-md bg-white ring-1 ring-border/60"
                          >
                            <img src={ottLogoUrl(opt)} alt={name} loading="lazy" className="h-3.5 w-3.5 object-contain" />
                          </span>
                        );
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">₹{b.amount.toLocaleString("en-IN")}</TableCell>
                  <TableCell>
                    <Badge variant={b.status === "Paid" ? "secondary" : "default"} className="rounded-full">
                      {b.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        downloadPdf(b);
                        toast.success(`Downloaded ${b.id}.pdf`);
                      }}
                    >
                      <Download className="mr-1 h-4 w-4" /> PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-border/60 bg-secondary/30 shadow-none">
        <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
          <div className="flex items-center gap-3">
            <Receipt className="h-5 w-5 text-primary" />
            <div>
              <div className="text-sm font-medium">Generate a demo invoice</div>
              <div className="text-xs text-muted-foreground">Download a fresh PDF using your current bundle.</div>
            </div>
          </div>
          <Button
            className="rounded-full"
            onClick={() => {
              const demo: Bill = {
                id: `ALT-DEMO-${Date.now().toString().slice(-6)}`,
                month: new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
                bundle: "Altura Family",
                amount: 1299,
                ott: ["Netflix", "Prime Video", "JioHotstar"],
                savings: 947,
                cashback: 120,
                status: "Due",
                dueDate: new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10),
              };
              downloadPdf(demo);
              toast.success("Fresh invoice generated");
            }}
          >
            <FileDown className="mr-2 h-4 w-4" /> Generate & download
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryCard({ label, value, tone }: { label: string; value: string; tone?: "good" }) {
  return (
    <Card className="border-border/60 bg-white shadow-[var(--shadow-card)]">
      <CardContent className="p-6">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className={`mt-2 text-3xl font-semibold tracking-tight ${tone === "good" ? "text-[color:var(--success)]" : ""}`}>{value}</div>
      </CardContent>
    </Card>
  );
}
