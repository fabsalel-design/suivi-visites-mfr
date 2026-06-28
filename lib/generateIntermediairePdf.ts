import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function generateIntermediairePdf(
  data: any
) {

  const filePath = path.join(
    process.cwd(),
    "templates",
    "evaluation_intermediaire FINAL.pdf"
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
  
page.drawText(data.dateEvaluation || "", {
  x: 105,
  y: 642,
  size: 10,
});

page.drawText(data.employeur || "", {
  x: 390,
  y: 642,
  size: 10,

});

page.drawText(data.apprenti || "", {
  x: 95,
  y: 613,
  size: 10,
});

page.drawText(data.formation || "", {
x: 365,
  y: 613,
  size: 10,
});

page.drawText(data.formateur || "", {
  x: 100,
  y: 585,
  size: 10,
});

page.drawText(data.maitreApprentissage || "", {
 x: 420,
  y: 585,
  size: 10,
});

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
  data.autonomie,
  Y_INTERET_MOTIVATION
);

drawEvaluation(
  page,
  data.esprit_initiative,
  Y_DYNAMISME
);

drawEvaluation(
  page,
  data.respect_limites,
  Y_ESPRIT_INITIATIVE
);

drawEvaluation(
  page,
  data.ponctualite_assiduite,
  Y_SENS_ORGANISATION
);

drawEvaluation(
  page,
  data.attitude_generale,
  Y_VOLONTE_CHANGEMENT
);


drawMultilineText(
  page,
 data.conseils || "",
  120,
  230
);

drawMultilineText(
  page,
  data.pointsForts || "",
  120,
  195
);

drawMultilineText(
  page,
  data.pointsFaibles || "",
  120,
  145
);

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
      y: 175,
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
      y: 115,
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
