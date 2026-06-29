import {generateIntermediairePdf } from "@/lib/generateIntermediairePdf";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
   

const {
  apprenti_id,
  date_visite,
  formation_suivie,

  gestion_temps,
  productivite,
  sens_responsabilites,
  jugement,
  communication,
  sens_relations,
  capacite_adaptation,
  travail_bien_fait,

  reprise_apprenti,

  axes_amelioration,
  commentaires,

  signature_tuteur,
  signature_apprenti,
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
type_visite: "fin_formation",
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
         "visites_fin_formation"
        )
   

.insert({
  visite_id: visite.id,

  formation_suivie,

  gestion_temps,
  productivite,
  sens_responsabilites,
  jugement,
  communication,
  sens_relations,
  capacite_adaptation,
  travail_bien_fait,

  reprise_apprenti,

  axes_amelioration,
  commentaires,

  signature_tuteur,
  signature_apprenti,
})

console.log(
  "SIGNATURE RECUE :",
  signature_tuteur
);
  
console.log(
  "TYPE :",
  typeof signature_tuteur
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
await generateFinFormationPdf({
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

  
gestion_temps,
productivite,
sens_responsabilites,
jugement,
communication,
sens_relations,
capacite_adaptation,
travail_bien_fait,

reprise_apprenti,

axes_amelioration,
commentaires,

signatureTuteur:
  signature_tuteur,

signatureApprenti:
  signature_apprenti,

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
  console.error(
    "ERREUR INTERMEDIAIRE :",
    error
  );

  return NextResponse.json(
    {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : String(error),
    },
    {
      status: 500,
    }
  );
}

}
