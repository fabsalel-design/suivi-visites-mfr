
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";
import fs from "fs";
import path from "path";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ visiteId: string }>;
  }
) {
  try {
    const { visiteId } = await params;

    const { data: visite } = await supabase
      .from("visites")
      .select("*")
      .eq("id", visiteId)
      .single();

    if (!visite) {
      return NextResponse.json(
        { error: "Visite introuvable" },
        { status: 404 }
      );
    }

    const { data: apprenti } = await supabase
      .from("apprentis")
      .select("*")
      .eq("id", visite.apprenti_id)
      .single();

    const { data: details } = await supabase
      .from("visites_periode_essai")
      .select("*")
      .eq("visite_id", visite.id)
      .single();

    const pdfDoc =
      await PDFDocument.create();

    const page =
      pdfDoc.addPage([595, 842]);

    const font =
      await pdfDoc.embedFont(
        StandardFonts.Helvetica
      );

    const boldFont =
      await pdfDoc.embedFont(
        StandardFonts.HelveticaBold
      );

    try {
      const logoPath = path.join(
        process.cwd(),
        "public",
        "logo-mfr.jpg"
      );

      const logoBytes =
        fs.readFileSync(logoPath);

      const logo =
        await pdfDoc.embedJpg(
          logoBytes
        );

      page.drawImage(logo, {
        x: 40,
        y: 730,
        width: 120,
        height: 75,
      });
    } catch (e) {
      console.log(
        "Logo non chargé"
      );
    }

    let y = 700;

    function titre(
      texte: string
    ) {
      page.drawText(texte, {
        x: 40,
        y,
        size: 14,
        font: boldFont,
      });

      y -= 22;
    }

    function ligne(
      texte: string
    ) {
      page.drawText(texte, {
        x: 40,
        y,
        size: 10,
        font,
      });

      y -= 15;
    }

    titre("MFR LA PINÈDE");

    ligne(
      "RD 6086 - Lieu-dit La Granelle"
    );

    
ligne("30320 MARGUERITTES");

y -= 10;

page.drawText(
  "ÉVALUATION DE L'APPRENTI EN FIN DE PÉRIODE D'ESSAI",
  {
    x: 40,
    y,
    size: 16,
    font: boldFont,
    color: rgb(0, 0.36, 0.66),
  }
);

y -= 35;

ligne(
  `Date de l'évaluation : ${visite.date_visite || ""}`
);

ligne(
  `Employeur : ${apprenti?.entreprise || ""}`
);

ligne(
  `Nom de l'apprenti : ${apprenti?.prenom || ""} ${apprenti?.nom || ""}`
);

ligne(
  `Formation suivie : ${
    details?.formation_suivie || ""
  }`
);

ligne(
  `Nom du formateur : ${
    visite.formateur_visiteur || ""
  }`
);

ligne(
  `Nom du maître d'apprentissage : ${
    apprenti?.tuteur || ""
  }`
);

y -= 15;

titre("ÉVALUATION");
const tableX = 40;
const tableY = y;
const rowHeight = 18;

const colCritere = 300;
const colNA = 55;
const colECA = 55;
const colACQ = 55;

const totalWidth =
  colCritere +
  colNA +
  colECA +
  colACQ;

const lignes = [
  [
    "Intérêt et motivation",
    details?.interet_motivation,
  ],
  [
    "Dynamisme",
    details?.dynamisme,
  ],
  [
    "Esprit d'initiative",
    details?.esprit_initiative,
  ],
  [
    "Sens de l'organisation",
    details?.sens_organisation,
  ],
  [
    "Volonté de changement",
    details?.volonte_changement,
  ],
  [
    "Relations / équipe",
    details?.relations_equipe,
  ],
  [
    "Adaptation",
    details?.adaptation,
  ],
  [
    "Présentation",
    details?.presentation,
  ],
  [
    "Compréhension consignes",
    details?.comprehension_consignes,
  ],
  [
    "Application règles",
    details?.application_regles,
  ],
  [
    "Aptitudes physiques",
    details?.aptitudes_physiques,
  ],
];

page.drawRectangle({
  x: tableX,
  y: tableY,
  width: totalWidth,
  height: rowHeight,
  borderWidth: 1,
});

page.drawText(
  "Critères à apprécier",
  {
    x: tableX + 5,
    y: tableY + 5,
    size: 9,
    font: boldFont,
  }
);

page.drawText("NA", {
  x: tableX + colCritere + 18,
  y: tableY + 5,
  size: 9,
  font: boldFont,
});

page.drawText("ECA", {
  x:
    tableX +
    colCritere +
    colNA +
    15,
  y: tableY + 5,
  size: 9,
  font: boldFont,
});

page.drawText("ACQ", {
  x:
    tableX +
    colCritere +
    colNA +
    colECA +
    15,
  y: tableY + 5,
  size: 9,
  font: boldFont,
});

for (
  let i = 0;
  i < lignes.length;
  i++
) {
  const yLigne =
    tableY -
    rowHeight * (i + 1);

  page.drawRectangle({
    x: tableX,
    y: yLigne,
    width: totalWidth,
    height: rowHeight,
    borderWidth: 1,
  });

  const [libelle, valeur] =
    lignes[i];

  page.drawText(libelle, {
    x: tableX + 5,
    y: yLigne + 5,
    size: 8,
    font,
  });

  const texte =
    String(valeur || "");

  const estAcquise =
    texte.includes(
      "cherche"
    ) ||
    texte.includes(
      "activement"
    ) ||
    texte.includes(
      "Très"
    ) ||
    texte.includes(
      "Rigoureuse"
    ) ||
    texte.includes(
      "Facile"
    );

  const estEnCours =
    !estAcquise &&
    texte.length > 0;

  if (estAcquise) {
    page.drawText("X", {
      x:
        tableX +
        colCritere +
        colNA +
        colECA +
        20,
      y: yLigne + 5,
      size: 10,
      font: boldFont,
    });
  } else if (estEnCours) {
    page.drawText("X", {
      x:
        tableX +
        colCritere +
        colNA +
        20,
      y: yLigne + 5,
      size: 10,
      font: boldFont,
    });
  } else {
    page.drawText("X", {
      x:
        tableX +
        colCritere +
        20,
      y: yLigne + 5,
      size: 10,
      font: boldFont,
    });
  }
}

y =
  tableY -
  rowHeight *
    (lignes.length + 1) -
  20;

        "Présentation",
        details?.presentation,
      ],
      [
        "Compréhension des consignes",
        details?.comprehension_consignes,
      ],
      [
        "Application des règles",
        details?.application_regles,
      ],
      [
        "Aptitudes physiques",
        details?.aptitudes_physiques,
      ],
    ];

    criteres.forEach(
      ([nom, valeur]) => {
        ligne(
          `${nom} : ${valeur || ""}`
        );
      }
    );

    y -= 10;

    titre(
      "OBSERVATIONS GÉNÉRALES"
    );

    ligne(
      details?.observations ||
        visite.observations ||
        "Non renseigné"
    );

    y -= 10;

    titre("POINTS FORTS");

    ligne(
      details?.points_forts ||
        "Non renseigné"
    );

    y -= 10;

    titre("POINTS FAIBLES");

    ligne(
      details?.points_faibles ||
        "Non renseigné"
    );

    y -= 25;

    page.drawText(
      "Visa maître d'apprentissage",
      {
        x: 40,
        y,
        size: 11,
        font: boldFont,
      }
    );

    page.drawText(
      "Visa CFA / Formateur",
      {
        x: 320,
        y,
        size: 11,
        font: boldFont,
      }
    );

    y -= 60;

    page.drawLine({
      start: { x: 40, y },
      end: { x: 220, y },
      thickness: 1,
    });

    page.drawLine({
      start: { x: 320, y },
      end: { x: 500, y },
      thickness: 1,
    });

    const pdfBytes =
      await pdfDoc.save();

    return new NextResponse(
      Buffer.from(pdfBytes),
      {
        headers: {
          "Content-Type":
            "application/pdf",
          "Content-Disposition":
            `attachment; filename="Evaluation_Periode_Essai_${apprenti?.nom || "Apprenti"}.pdf"`,
        },
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          "Erreur génération PDF",
      },
      {
        status: 500,
      }
    );
  }
}
