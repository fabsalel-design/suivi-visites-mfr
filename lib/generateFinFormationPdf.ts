

import {
  PDFDocument,
  rgb,
} from "pdf-lib";

import fs from "fs";
import path from "path";

export async function generateFinFormationPdf(
  data: any
) {
console.log(data);
  
const filePath = path.join(
  process.cwd(),
  "templates",
  "evaluation fin de formation.pdf"
);


  const pdfBytes =
    fs.readFileSync(filePath);

  const pdfDoc =
    await PDFDocument.load(pdfBytes);

  const page =
    pdfDoc.getPage(0);

const Y_GESTION_TEMPS = 580;
const Y_PRODUCTIVITE = 550;
const Y_RESPONSABILITES = 510;
const Y_JUGEMENT = 465;
const Y_COMMUNICATION = 420;
const Y_RELATIONS = 375;
const Y_ADAPTATION = 330;
const Y_TRAVAIL_BIEN_FAIT = 285;


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
  y: number,
  maxChars: number = 60
) {

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
  
page.drawText(data.dateEvaluation || "", {
  x: 105,
  y: 642,
  size: 10,
});

drawMultilineText(
  page,
  data.employeur || "",
  390,
  642,
  35
);


drawNote(
  page,
  Number(data.gestion_temps),
  Y_GESTION_TEMPS
);

drawNote(
  page,
  Number(data.productivite),
  Y_PRODUCTIVITE
);

drawNote(
  page,
  Number(data.sens_responsabilites),
  Y_RESPONSABILITES
);

drawNote(
  page,
  Number(data.jugement),
  Y_JUGEMENT
);

drawNote(
  page,
  Number(data.communication),
  Y_COMMUNICATION
);

drawNote(
  page,
  Number(data.sens_relations),
  Y_RELATIONS
);

drawNote(
  page,
  Number(data.capacite_adaptation),
  Y_ADAPTATION
);

drawNote(
  page,
  Number(data.travail_bien_fait),
  Y_TRAVAIL_BIEN_FAIT
);



drawMultilineText(
  page,
 data.pointsForts || "",
  20,
  320,
  75
);

drawMultilineText(
  page,
  data.pointsFaibles || "",
  20,
  227,
  75
);

drawMultilineText(
  page,
 data.conseils || "",
  20,
  160,
  75
);


function drawNote(
  page: any,
  note: number,
  y: number
) {
 
const positions: Record<number, number> = {
  0: 125,
  1: 215,
  2: 305,
  3: 395,
  4: 485,
  };

  const x = positions[note];

  if (x === undefined) return;

  page.drawText("O", {
    x: x - 8,
    y: y - 8,
    size: 16,
  });
}

console.log(
  "SIGNATURE PDF :",
  data.signatureMaitre
    ? "OUI"
    : "NON"
);

if (data.signatureMaitre) {
  const base64 =
    data.signatureMaitre.replace(
      /^data:image\/png;base64,/,
      ""
    );

  const signatureImage =
    await pdfDoc.embedPng(base64);

  page.drawImage(
    signatureImage,
    {
      x: 430,
      y: 125,
      width: 120,
      height: 50,
    }
  );
}

if (data.signatureFormateur) {
  const base64 =
    data.signatureFormateur.replace(
      /^data:image\/png;base64,/,
      ""
    );

  const signatureImage =
    await pdfDoc.embedPng(base64);


page.drawImage(
  signatureImage,
  {
    x: 430,
    y: 260,
    width: 120,
    height: 50,
  }
);
}

console.log(
  "SIGNATURE FORMATEUR PDF :",
  data.signatureFormateur
    ? "OUI"
    : "NON"
);

  return await pdfDoc.save();
}
