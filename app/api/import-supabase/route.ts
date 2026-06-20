
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://cbhomuatxxptfcbzveys.supabase.co",
  "sb_publishable_4vPEKeE_FYXBu6jm_YvlHw_zKUR_aNz"
);

export async function POST(request: Request) {
  const apprentis = await request.json();

  const { error } = await supabase
    .from("apprentis")
    .insert(apprentis);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    total: Array.isArray(apprentis)
      ? apprentis.length
      : 0,
  });
}
