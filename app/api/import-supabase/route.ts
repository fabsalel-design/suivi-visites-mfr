
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://cbhomuatxxptfcbzveys.supabase.co",
  "TA_PUBLISHABLE_KEY"
);

export async function POST(request: Request) {
  const apprentis = await request.json();

  const { data, error } = await supabase
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
    total: data?.length || apprentis.length,
  });
}
