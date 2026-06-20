
import { supabase } from "../../lib/supabase";

export default async function TestSupabasePage() {
  const { data, error } = await supabase
    .from("apprentis")
    .select("*");

  return (
    <main style={{ padding: "40px" }}>
      <h1>Test Supabase</h1>

      {error && (
        <p>
          Erreur : {error.message}
        </p>
      )}

      {data?.map((apprenti) => (
        <div
          key={apprenti.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <h2>
            {apprenti.prenom} {apprenti.nom}
          </h2>

          <p>
            Entreprise : {apprenti.entreprise}
          </p>

          <p>
            Formateur : {apprenti.formateur}
          </p>
        </div>
      ))}
    </main>
  );
}
