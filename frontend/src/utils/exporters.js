import { currency, dateLabel } from "./formatters";

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export const exportTransactionsCsv = (transactions, filename = "finora-transactions.csv") => {
  const headers = ["Title", "Amount", "Type", "Category", "Notes", "Date"];
  const rows = transactions.map((item) => [
    item.title,
    item.amount,
    item.type,
    item.category,
    item.notes || "",
    dateLabel(item.date)
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

export const exportTransactionsPdf = async (transactions, filename = "finora-report.pdf") => {
  const [{ jsPDF }, html2canvasModule] = await Promise.all([
    import("jspdf"),
    import("html2canvas")
  ]);
  const html2canvas = html2canvasModule.default;
  const report = document.createElement("section");
  report.style.cssText = [
    "position:fixed",
    "left:-10000px",
    "top:0",
    "width:960px",
    "background:#ffffff",
    "color:#0f172a",
    "font-family:Inter, Arial, sans-serif",
    "padding:36px"
  ].join(";");
  report.innerHTML = `
    <div style="display:flex;justify-content:space-between;gap:24px;align-items:flex-start;margin-bottom:26px;">
      <div>
        <div style="font-size:13px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:#0284c7;">Finora Report</div>
        <h1 style="margin:8px 0 0;font-size:30px;line-height:1.15;">Expense Tracker Export</h1>
        <p style="margin:8px 0 0;color:#64748b;font-size:13px;font-weight:600;">Generated ${escapeHtml(new Date().toLocaleString())}</p>
      </div>
      <div style="border:1px solid #e2e8f0;border-radius:14px;padding:14px 16px;text-align:right;">
        <div style="font-size:12px;font-weight:800;color:#64748b;text-transform:uppercase;">Rows</div>
        <div style="font-size:26px;font-weight:900;">${transactions.length}</div>
      </div>
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:13px;">
      <thead>
        <tr style="background:#0f172a;color:#ffffff;">
          <th style="padding:12px;text-align:left;border-top-left-radius:10px;">Title</th>
          <th style="padding:12px;text-align:left;">Category</th>
          <th style="padding:12px;text-align:left;">Type</th>
          <th style="padding:12px;text-align:left;">Date</th>
          <th style="padding:12px;text-align:right;border-top-right-radius:10px;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${transactions.map((item, index) => `
          <tr style="background:${index % 2 ? "#ffffff" : "#f8fafc"};">
            <td style="padding:12px;border-bottom:1px solid #e2e8f0;font-weight:800;">${escapeHtml(item.title)}</td>
            <td style="padding:12px;border-bottom:1px solid #e2e8f0;color:#475569;font-weight:700;">${escapeHtml(item.category)}</td>
            <td style="padding:12px;border-bottom:1px solid #e2e8f0;color:${item.type === "income" ? "#059669" : "#e11d48"};font-weight:900;text-transform:capitalize;">${escapeHtml(item.type)}</td>
            <td style="padding:12px;border-bottom:1px solid #e2e8f0;color:#64748b;font-weight:700;">${escapeHtml(dateLabel(item.date))}</td>
            <td style="padding:12px;border-bottom:1px solid #e2e8f0;text-align:right;font-weight:900;">${escapeHtml(currency(item.amount))}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  document.body.appendChild(report);
  let canvas;
  try {
    canvas = await html2canvas(report, {
      backgroundColor: "#ffffff",
      scale: 2,
      useCORS: true
    });
  } finally {
    report.remove();
  }

  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  const imageWidth = pageWidth - margin * 2;
  const imageHeight = (canvas.height * imageWidth) / canvas.width;
  const image = canvas.toDataURL("image/png");
  const usableHeight = pageHeight - margin * 2;

  let heightLeft = imageHeight;
  let y = margin;
  doc.addImage(image, "PNG", margin, y, imageWidth, imageHeight);
  heightLeft -= usableHeight;

  while (heightLeft > 0) {
    doc.addPage();
    y = margin - (imageHeight - heightLeft);
    doc.addImage(image, "PNG", margin, y, imageWidth, imageHeight);
    heightLeft -= usableHeight;
  }

  doc.save(filename);
};
