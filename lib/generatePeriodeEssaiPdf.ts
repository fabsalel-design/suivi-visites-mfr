
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
  x: 265,
  y: 503,
  size: 10,
});

page.drawText("EMPLOYEUR TEST", {
  x: 695,
  y: 463,
  size: 10,
});

page.drawText("APPRENTI TEST", {
  x: 300,
  y: 423,
  size: 10,
});

  return await pdfDoc.save();
}
