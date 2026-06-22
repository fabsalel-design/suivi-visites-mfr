
import { NextResponse } from "next/server";
import { supabase } from "../../../../../lib/supabase";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from("apprentis")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Erreur serveur",
      },
      { status: 500 }
    );
  }
}
