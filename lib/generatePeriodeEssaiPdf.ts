
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
  y: 642,
  size: 10,
});

page.drawText("EMPLOYEUR TEST", {
  x: 455,
  y: 642,
  size: 10,
});

page.drawText("APPRENTI TEST", {
  x: 150,
  y: 610,
  size: 10,
});

  
page.drawText("FORMATION TEST", {
  x: 455,
  y: 610,
  size: 10,
});


page.drawText("FORMATEUR TEST", {
  x: 150,
  y: 590,
  size: 10,
});

page.drawText("MAITRE TEST", {
  x: 455,
  y: 590,
  size: 10,
});

});

  return await pdfDoc.save();
}
