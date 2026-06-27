
import { NextResponse } from "next/server";
import { generatePeriodeEssaiPdf } from "@/lib/generatePeriodeEssaiPdf";

export async function GET() {
 
const pdfBytes =
  await generatePeriodeEssaiPdf({
    dateEvaluation: "25/06/2026",
    employeur: "EMPLOYEUR TEST",
    apprenti: "APPRENTI TEST",
    formation: "FORMATION TEST",
    formateur: "FORMATEUR TEST",
    maitreApprentissage: "MAITRE TEST",

    interet_motivation: "NON_ACQUISE",
    dynamisme: "EN_COURS",
    esprit_initiative: "ACQUISE",
    sens_organisation: "NON_ACQUISE",
    volonte_changement: "EN_COURS",
    relations_equipe: "ACQUISE",
    adaptation: "NON_ACQUISE",
    presentation: "EN_COURS",
    comprehension_consignes: "ACQUISE",
    application_regles: "NON_ACQUISE",
    aptitudes_physiques: "EN_COURS",
  });

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type":
        "application/pdf",
      "Content-Disposition":
        'attachment; filename="test.pdf"',
    },
  });
}
