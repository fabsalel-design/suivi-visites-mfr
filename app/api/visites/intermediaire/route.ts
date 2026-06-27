import {generateIntermediairePdf } from "@/lib/generateIntermediairePdf";
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
  formateur_visiteur,

  conseils,

  points_forts,
  points_faibles,

  autonomie,
  esprit_initiative,
  respect_limites,
  ponctualite_assiduite,
  attitude_generale,

  signature_maitre,
  signature_formateur,
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
  type_visite: "intermediaire",
  formateur_visiteur:
    formateurVisiteur,
  realisee: true,
  mode_traitement:
    "application",
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
         "visites_intermediaires"
        )
   
.insert({
  visite_id: visite.id,

  formation_suivie,

  autonomie,
  esprit_initiative,
  respect_limites,
  ponctualite_assiduite,
  attitude_generale,

  conseils,
  points_forts,
  points_faibles,

  signature_maitre,
  signature_formateur,
})

console.log(
  "SIGNATURE RECUE :",
  signature_maitre
);

console.log(
  "TYPE :",
  typeof signature_maitre
);

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

const pdfBuffer =
await generateIntermediairePdf({
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

    signatureMaitre:
      signature_maitre,

    signatureFormateur:
      signature_formateur,

    conseils,

    pointsForts:
      points_forts,

    pointsFaibles:
      points_faibles,

    autonomie,
    esprit_initiative,
    respect_limites,
    ponctualite_assiduite,
    attitude_generale,
  });

return NextResponse.json({
  success: true,

  visite_id: visite.id,

  pdf: !!pdfBuffer,

  pdfData: Buffer.from(
    pdfBuffer
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
