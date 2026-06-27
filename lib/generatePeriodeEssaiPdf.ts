
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function generatePeriodeEssaiPdf(
  data: any
) {

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

const X_NON_ACQUISE = 265;
const X_EN_COURS = 410;
const X_ACQUISE = 550;

const Y_INTERET_MOTIVATION = 523;
const Y_DYNAMISME = 502;
const Y_ESPRIT_INITIATIVE = 472;
const Y_SENS_ORGANISATION = 442;

const Y_VOLONTE_CHANGEMENT = 420;
const Y_RELATIONS_EQUIPE = 395;

const Y_ADAPTATION = 367;
const Y_PRESENTATION = 346;

const Y_COMPREHENSION_CONSIGNES = 323;
const Y_APPLICATION_REGLES = 295;
const Y_APTITUDES_PHYSIQUES = 270;
  
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

function drawMultilineText(
  page: any,
  text: string,
  x: number,
  y: number
) {
  const maxChars = 60;

  const words = text.split(" ");
  const lines: string[] = [];

  let currentLine = "";

  for (const word of words) {
    const testLine =
      currentLine.length === 0
        ? word
        : `${currentLine} ${word}`;

    if (testLine.length > maxChars) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  lines.forEach((line, index) => {
    page.drawText(line, {
      x,
      y: y - index * 12,
      size: 10,
    });
  });
}
  
function drawEvaluation(
  page: any,
  valeur: string,
  y: number
) {
  if (valeur === "NON_ACQUISE") {
    drawCroix(
      page,
      X_NON_ACQUISE,
      y
    );
  }

  if (valeur === "EN_COURS") {
    drawCroix(
      page,
      X_EN_COURS,
      y
    );
  }

  if (valeur === "ACQUISE") {
    drawCroix(
      page,
      X_ACQUISE,
      y
    );
  }
}


drawEvaluation(
  page,
  data.interet_motivation,
  Y_INTERET_MOTIVATION
);

drawEvaluation(
  page,
  data.dynamisme,
  Y_DYNAMISME
);

drawEvaluation(
  page,
  data.esprit_initiative,
  Y_ESPRIT_INITIATIVE
);

drawEvaluation(
  page,
  data.sens_organisation,
  Y_SENS_ORGANISATION
);

drawEvaluation(
  page,
  data.volonte_changement,
  Y_VOLONTE_CHANGEMENT
);

drawEvaluation(
  page,
  data.relations_equipe,
  Y_RELATIONS_EQUIPE
);

drawEvaluation(
  page,
  data.adaptation,
  Y_ADAPTATION
);

drawEvaluation(
  page,
  data.presentation,
  Y_PRESENTATION
);

drawEvaluation(
  page,
  data.comprehension_consignes,
  Y_COMPREHENSION_CONSIGNES
);

drawEvaluation(
  page,
  data.application_regles,
  Y_APPLICATION_REGLES
);

drawEvaluation(
  page,
  data.aptitudes_physiques,
  Y_APTITUDES_PHYSIQUES
);

drawMultilineText(
  page,
  data.observations || "",
  120,
  220
);

drawMultilineText(
  page,
  data.pointsForts || "",
  120,
  185
);

drawMultilineText(
  page,
  data.pointsFaibles || "",
  120,
  145
);


  return await pdfDoc.save();
}
