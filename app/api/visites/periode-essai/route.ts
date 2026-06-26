
import { generatePeriodeEssaiExcel } from "@/lib/generatePeriodeEssaiExcel";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      apprenti_id,
      date_visite,

      formation_suivie,

      interet_motivation,
      dynamisme,
      esprit_initiative,
      sens_organisation,
      volonte_changement,
      relations_equipe,
      adaptation,
      presentation,
      comprehension_consignes,
      application_regles,
      aptitudes_physiques,

      observations,
      points_forts,
      points_faibles,
    } = body;

    const { data: apprenti } =
      await supabase
        .from("apprentis")
       
.select("*")

        .eq("id", apprenti_id)
        .single();

    const formateurVisiteur =
      apprenti?.formateur || null;

    const {
      data: visite,
      error: visiteError,
    } = await supabase
      .from("visites")
      .insert({
        apprenti_id,
        date_visite,
        type_visite: "periode_essai",
        formateur_visiteur:
          formateurVisiteur,
        realisee: true,
        mode_traitement:
          "application",
        observations,
      })
      .select()
      .single();

    if (visiteError) {
      return NextResponse.json(
        {
          success: false,
          error:
            visiteError.message,
        },
        {
          status: 500,
        }
      );
    }

    const { error: detailsError } =
      await supabase
        .from(
          "visites_periode_essai"
        )
        .insert({
          visite_id: visite.id,

          formation_suivie,

          interet_motivation,
          dynamisme,
          esprit_initiative,
          sens_organisation,
          volonte_changement,
          relations_equipe,
          adaptation,
          presentation,
          comprehension_consignes,
          application_regles,
          aptitudes_physiques,

          observations,
          points_forts,
          points_faibles,
        });

    if (detailsError) {
      return NextResponse.json(
        {
          success: false,
          error:
            detailsError.message,
        },
        {
          status: 500,
        }
      );
    }


const excelBuffer =
  await generatePeriodeEssaiExcel({

  dateEvaluation: date_visite,

  employeur:
    `${apprenti.entreprise || ""} ${
      apprenti.ville_reelle || ""
    }`,

  apprenti:
    `${apprenti.prenom || ""} ${
      apprenti.nom || ""
    }`,

  formation: formation_suivie,

  formateur:
    apprenti.formateur || "",

  maitreApprentissage:
    apprenti.tuteur || "",

  observations,

  pointsForts: points_forts,

  pointsFaibles: points_faibles,

  interet_motivation,
  dynamisme,
  esprit_initiative,
  sens_organisation,
  volonte_changement,
  relations_equipe,
  adaptation,
  presentation,
  comprehension_consignes,
  application_regles,
  aptitudes_physiques,
});
   
return NextResponse.json({
  success: true,
  visite_id: visite.id,
  excel: !!excelBuffer,
  excelData: Buffer.from(
    excelBuffer
 ).toString("base64"),
});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur serveur",
      },
      {
        status: 500,
      }
    );
  }
}
