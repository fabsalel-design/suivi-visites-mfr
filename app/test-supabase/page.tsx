
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function TestSupabasePage() {
  const { data, error } = await supabase
    .from("apprentis")
    .select("*");

  return (
    <main style={{ padding: "40px" }}>
      <h1>Test Supabase</h1>

      <p>Nombre de lignes : {data?.length || 0}</p>

      {error && (
        <p>
          Erreur : {error.message}
        </p>
      )}

      <pre>
        {JSON.stringify(
          {
            data,
            error,
          },
          null,
          2
        )}
      </pre>
    </main>
  );
}
