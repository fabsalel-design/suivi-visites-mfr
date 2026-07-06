
import { supabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function AffectationsPage() {
  const { data: apprentis } = await supabase
    .from("apprentis")
    .select("*")
    .order("ville_reelle");

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "30px",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "#005CA9",
        }}
      >
        👥 Affectations formateurs
      </h1>

      <p>
        Gestion des affectations des apprenants
      </p>

      {(apprentis || []).map((apprenti) => (
        <div
          key={apprenti.id}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "15px",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h3
            style={{
              marginTop: 0,
              color: "#005CA9",
            }}
          >
            {apprenti.prenom} {apprenti.nom}
          </h3>

          <p>
            📍 {apprenti.ville_reelle}
          </p>

          <p>
            🏢 {apprenti.entreprise}
          </p>

          <p>
            👨‍🏫 {apprenti.formateur}
          </p>
        </div>
      ))}
    </main>
  );
}
