import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request
) {
  const { nom } =
    await request.json();

  const { error } =
    await supabase
      .from("formateurs")
      .insert({
        nom,
      });

  
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
