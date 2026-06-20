
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function ApprentisPage() {
  const { data: apprentis, error } = await supabase
    .from("apprentis")
    .select("*")
    .order("nom");

  return (
    <main style={{ padding: "40px" }}>
      <h1>Liste des apprentis</h1>

      {error && (
        <p>
          Erreur : {error.message}
        </p>
      )}

      <p>
        Nombre d'apprentis :{" "}
        {apprentis?.length || 0}
      </p>

      <hr />

      {apprentis?.map((apprenti) => (
        <div
          key={apprenti.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>
            {apprenti.prenom} {apprenti.nom}
          </h3>

          <p>
            <a
              href={`/apprentis/${apprenti.id}/edit`}
            >
              Modifier
            </a>
          </p>

          <p>
            Entreprise :{" "}
            {apprenti.entreprise}
          </p>

          <p>
            Formateur :{" "}
            {apprenti.formateur}
          </p>

          <p>
            Statut :{" "}
            {apprenti.statut}
          </p>
        </div>
      ))}
    </main>
  );
}
``
