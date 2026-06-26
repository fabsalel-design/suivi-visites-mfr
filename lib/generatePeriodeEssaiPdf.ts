
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

const X_NON_ACQUISE = 275;
const X_EN_COURS = 410;
const X_ACQUISE = 550;
  
const Y_DYNAMISME = 502;
const Y_ESPRIT_INITIATIVE = 472; 
const Y_INTERET_MOTIVATION = 523;
const Y_SENS_ORGANISATION = 437;
const Y_VOLONTE_CHANGEMENT = 402;
const Y_RELATIONS_EQUIPE = 367;
const Y_ADAPTATION = 332;
const Y_PRESENTATION = 297;
const Y_COMPREHENSION_CONSIGNES = 262;
const Y_APPLICATION_REGLES = 227;
const Y_APTITUDES_PHYSIQUES = 203;
  
function drawCroix(
  page: any,
  x: number,
  y: number
) {
  page.drawText("X", {
    x,
    y,
    size: 12,
  });
}

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
  y: 585,
  size: 10,
});

page.drawText("MAITRE TEST", {
  x: 455,
  y: 585,
  size: 10,
});

drawCroix(page, X_NON_ACQUISE, 385);

  return await pdfDoc.save();
}
