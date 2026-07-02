

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

const Y_GESTION_TEMPS = 575;
const Y_PRODUCTIVITE = 538;
const Y_RESPONSABILITES = 501;
const Y_JUGEMENT = 458;
const Y_COMMUNICATION = 420;
const Y_RELATIONS = 387;
const Y_ADAPTATION = 349;
const Y_TRAVAIL_BIEN_FAIT = 312;


function drawCroix(
  page: any,
  x: number,
  y: number
) {
  

page.drawText("APPRENTI", {
  x: 180,
  y: 600,
  size: 12,
});

page.drawText("FORMATEUR", {
  x: 180,
  y: 555,
  size: 12,
});

page.drawText("MAITRE", {
  x: 700,
  y: 505,
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
  y: 698,
  size: 10,
});

drawMultilineText(
  page,
  data.employeur || "",
  395,
  698,
  35
);

page.drawText(data.apprenti || "", {
  x: 98,
  y: 665,
  size: 10,
});

page.drawText(data.formation || "", {
  x: 375,
  y: 665,
  size: 10,
});

page.drawText(data.formateur || "", {
  x: 100,
  y: 625,
  size: 10,
});

page.drawText(data.maitreApprentissage || "", {
  x: 420,
  y: 625,
  size: 10,
});

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
  data.axes_amelioration || "",
  20,
  282,
  35
);

drawMultilineText(
  page,
  data.commentaires || "",
  305,
  282,
  35
);

function drawNote(
  page: any,
  note: number,
  y: number
) {
  const positions: Record<number, number> = {
    0: 323,
    1: 366,
    2: 421,
    3: 476,
    4: 529,
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
  data.signatureTuteur
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
