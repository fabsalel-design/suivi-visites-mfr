
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
        color: rgb(
          0,
          0.36,
          0.66
        ),
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
      `Nom du formateur : ${visite.formateur_visiteur || ""}`
    );

    ligne(
      `Nom du maître d'apprentissage : ${apprenti?.tuteur || ""}`
    );

    y -= 15;

    titre("ÉVALUATION");

    const criteres = [
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
        "Relations équipe",
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
