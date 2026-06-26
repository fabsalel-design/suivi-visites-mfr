
import { NextResponse } from "next/server";
import { generatePeriodeEssaiPdf } from "@/lib/generatePeriodeEssaiPdf";

export async function GET() {
  const pdfBytes =
    await generatePeriodeEssaiPdf();

  return new NextResponse(pdfBytes, {
    headers: {
      "Content-Type":
        "application/pdf",
      "Content-Disposition":
        'attachment; filename="test.pdf"',
    },
  });
}
