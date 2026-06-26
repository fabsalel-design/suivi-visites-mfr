
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function generatePeriodeEssaiPdf() {
  const filePath = path.join(
    process.cwd(),
    "templates",
    "evaluation_apprenti FINAL.pdf"
  );

  const pdfBytes =
    fs.readFileSync(filePath);

  const pdfDoc =
    await PDFDocument.load(pdfBytes);

  const page =
    pdfDoc.getPage(0);

page.drawText("DATE TEST", {
  x: 150,
  y: 650,
  size: 10,
});

page.drawText("EMPLOYEUR TEST", {
  x: 360,
  y: 630,
  size: 10,
});

page.drawText("APPRENTI TEST", {
  x: 150,
  y: 610,
  size: 10,
});

  return await pdfDoc.save();
}
