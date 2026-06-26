
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

  page.drawText("TEST", {
    x: 100,
    y: 700,
    size: 14,
  });

  return await pdfDoc.save();
}
