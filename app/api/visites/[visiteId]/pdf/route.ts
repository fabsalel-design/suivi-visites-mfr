
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

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

    const pdfDoc = await PDFDocument.create();

    const page = pdfDoc.addPage([595, 842]);

    const font = await pdfDoc.embedFont(
      StandardFonts.Helvetica
    );

    let y = 800;

    function ligne(
      texte: string,
      taille = 11
    ) {
      page.drawText(String(texte), {
        x: 40,
        y,
        size: taille,
        font,
        color: rgb(0, 0, 0),
      });

      y -= taille + 8;
    }

    ligne(
      "VISITE DE PERIODE D'ESSAI",
      18
    );

    y -= 10;

    ligne(
      `Apprenti : ${apprenti?.prenom || ""} ${apprenti?.nom || ""}`
    );

    ligne(
      `Entreprise : ${apprenti?.entreprise || ""}`
    );

    ligne(
      `Formateur : ${visite.formateur_visiteur || ""}`
    );

    ligne(
      `Date de visite : ${visite.date_visite || ""}`
    );

    ligne(
      `Tuteur : ${apprenti?.tuteur || ""}`
    );

    y -= 15;

    ligne("EVALUATION", 14);

    y -= 5;

    ligne(
      `Intérêt et motivation : ${details?.interet_motivation || ""}`
    );

    ligne(
      `Dynamisme : ${details?.dynamisme || ""}`
    );

    ligne(
      `Esprit d'initiative : ${details?.esprit_initiative || ""}`
    );

    ligne(
      `Sens de l'organisation : ${details?.sens_organisation || ""}`
    );

    ligne(
      `Volonté de changement : ${details?.volonte_changement || ""}`
    );

    ligne(
      `Relations équipe : ${details?.relations_equipe || ""}`
    );

    ligne(
      `Adaptation : ${details?.adaptation || ""}`
    );

    ligne(
      `Présentation : ${details?.presentation || ""}`
    );

    ligne(
      `Compréhension des consignes : ${details?.comprehension_consignes || ""}`
    );

    ligne(
      `Application des règles : ${details?.application_regles || ""}`
    );

    ligne(
      `Aptitudes physiques : ${details?.aptitudes_physiques || ""}`
    );

    y -= 15;

    ligne("POINTS FORTS", 14);

    ligne(
      details?.points_forts ||
        "Non renseigné"
    );

    y -= 10;

    ligne("POINTS FAIBLES", 14);

    ligne(
      details?.points_faibles ||
        "Non renseigné"
    );

    y -= 10;

    ligne("OBSERVATIONS", 14);

    ligne(
      details?.observations ||
        visite.observations ||
        "Non renseigné"
    );

    const pdfBytes =
      await pdfDoc.save();

    return new NextResponse(
      Buffer.from(pdfBytes),
      {
        headers: {
          "Content-Type":
            "application/pdf",
          "Content-Disposition":
            `attachment; filename="Visite_Periode_Essai_${apprenti?.nom || "Apprenti"}_${apprenti?.prenom || ""}.pdf"`,
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
