import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Download, FileDown, Receipt } from "lucide-react";
import { DEMO_BILLS, OTT_CATALOG, type Bill } from "@/lib/demo-data";
import { OttLogo } from "@/components/ott-logo";
import jsPDF from "jspdf";
import { toast } from "sonner";

export const Route = createFileRoute("/portal/bills")({
  component: BillsPage,
  head: () => ({ meta: [{ title: "Bills — Altura" }] }),
});

function downloadPdf(bill: Bill) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();
  const money = (n: number) => `Rs. ${Math.abs(n).toLocaleString("en-IN")}`;

  // Top brand bar
  doc.setFillColor(226, 33, 45);
  doc.rect(0, 0, w, 6, "F");

  // Brand
  doc.setTextColor(20, 20, 24);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Altura", 40, 60);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text("COMMUNICATIONS", 40, 74);

  // Invoice meta (right side)
  doc.setTextColor(20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("INVOICE", w - 40, 52, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(110);
  doc.text(bill.id, w - 40, 66, { align: "right" });
  doc.text(bill.month, w - 40, 78, { align: "right" });

  // Billed-to / Bill-for columns
  let y = 120;
  doc.setFont("helvetica", "bold"); doc.setFontSize(9);
  doc.setTextColor(140);
  doc.text("BILLED TO", 40, y);
  doc.text("BILLING PERIOD", w / 2, y);
  y += 16;
  doc.setFont("helvetica", "normal"); doc.setFontSize(11);
  doc.setTextColor(20);
  doc.text("Rohan Verma", 40, y);
  doc.text(bill.month, w / 2, y);
  y += 14;
  doc.setFontSize(10); doc.setTextColor(90);
  doc.text("rohan@example.in", 40, y);
  doc.text(`Due ${new Date(bill.dueDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}`, w / 2, y);
  y += 14;
  doc.text("+91 98200 12345", 40, y);

  // Line items table
  y += 40;
  doc.setDrawColor(230); doc.setLineWidth(0.5);
  doc.line(40, y, w - 40, y);
  y += 18;
  doc.setFont("helvetica", "bold"); doc.setFontSize(9);
  doc.setTextColor(140);
  doc.text("DESCRIPTION", 40, y);
  doc.text("AMOUNT", w - 40, y, { align: "right" });
  y += 10;
  doc.line(40, y, w - 40, y);
  y += 22;

  doc.setFont("helvetica", "normal"); doc.setFontSize(11);
  doc.setTextColor(20);

  const rows: Array<{ label: string; sub?: string; amount: number; isCredit?: boolean }> = [
    { label: bill.bundle, sub: `Included: ${bill.ott.join(" · ")}`, amount: bill.amount },
    { label: "Bundle savings vs buying separately", amount: -bill.savings, isCredit: true },
    { label: "Loyalty cashback", amount: -bill.cashback, isCredit: true },
  ];

  for (const r of rows) {
    doc.setTextColor(20);
    doc.setFont("helvetica", "normal");
    doc.text(r.label, 40, y);
    if (r.isCredit) doc.setTextColor(20, 140, 90);
    doc.text(`${r.amount < 0 ? "-" : ""}${money(r.amount)}`, w - 40, y, { align: "right" });
    if (r.sub) {
      y += 14;
      doc.setFontSize(9); doc.setTextColor(130);
      doc.text(r.sub, 40, y);
      doc.setFontSize(11);
    }
    y += 24;
  }

  // Totals
  y += 6;
  doc.setDrawColor(230); doc.line(40, y, w - 40, y); y += 22;
  doc.setFont("helvetica", "normal"); doc.setFontSize(11);
  doc.setTextColor(90);
  doc.text("Subtotal", 40, y);
  doc.setTextColor(20);
  doc.text(money(bill.amount), w - 40, y, { align: "right" });
  y += 20;
  doc.setTextColor(90);
  doc.text("Credits applied", 40, y);
  doc.setTextColor(20, 140, 90);
  doc.text(`-${money(bill.cashback)}`, w - 40, y, { align: "right" });
  y += 26;

  // Total payable — big
  doc.setFillColor(248, 248, 250);
  doc.roundedRect(40, y - 18, w - 80, 46, 6, 6, "F");
  doc.setFont("helvetica", "bold"); doc.setFontSize(12);
  doc.setTextColor(90);
  doc.text("TOTAL PAYABLE", 56, y);
  doc.setFontSize(20);
  doc.setTextColor(20);
  doc.text(money(bill.amount - bill.cashback), w - 56, y + 4, { align: "right" });
  y += 48;

  // Status pill
  y += 20;
  const paid = bill.status === "Paid";
  const pillColor: [number, number, number] = paid ? [230, 245, 235] : [253, 235, 220];
  const pillText: [number, number, number] = paid ? [20, 120, 80] : [180, 90, 20];
  doc.setFillColor(...pillColor);
  doc.roundedRect(40, y - 12, 90, 22, 11, 11, "F");
  doc.setFont("helvetica", "bold"); doc.setFontSize(10);
  doc.setTextColor(...pillText);
  doc.text(bill.status.toUpperCase(), 85, y + 2, { align: "center" });

  // Footer
  doc.setFont("helvetica", "normal"); doc.setFontSize(9);
  doc.setTextColor(140);
  doc.text("No lock-in. Cancel any service any time from your Altura portal.", 40, h - 60);
  doc.text("Altura Communications Pvt. Ltd.  ·  GSTIN 29AAACA0000A1Z5  ·  hello@altura.in", 40, h - 46);
  doc.setFontSize(8);
  doc.text("This is a demo invoice generated by the Altura portal.", 40, h - 32);

  doc.save(`Altura-${bill.id}.pdf`);
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
                            <OttLogo option={opt} size={16} rounded={4} />
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
