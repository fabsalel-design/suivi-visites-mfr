
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
