
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://cbhomuatxxptfcbzveys.supabase.co",
  "TON_ANON_KEY_ICI"
);

export async function POST(request: Request) {
  const { entreprise, formateur } =
    await request.json();

  const { error } = await supabase
    .from("apprentis")
    .update({
      formateur,
    })
    .eq("entreprise", entreprise);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}
