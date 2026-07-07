
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://cbhomuatxxptfcbzveys.supabase.co",
 "sb_publishable_4vPEKeE_FYXBu6jm_YvlHw_zKUR_aNz"
);

export async function POST(request: Request) {
  const { entreprise, formateur } =
    await request.json();

console.log(
  "UPDATE",
  entreprise,
  formateur
);
  
  const { error } = await supabase
    .from("apprentis")
    .update({
      formateur,
    })
    .eq("entreprise", entreprise);

console.log(
  "ERREUR",
  error
);
  
  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

 
return NextResponse.json({
  success: true,
  entreprise,
  formateur,
  error,
});
