
import { supabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function AffectationsPage() {
 
const { data: apprentis } = await supabase
  .from("apprentis")
  .select("*")
  .order("ville_reelle")
  .order("nom");

const villes =
  apprentis?.reduce(
    (acc: any, apprenti: any) => {
     
const ville =
  apprenti.ville_reelle
    ? `${apprenti.ville_reelle} (${String(
        apprenti.code_postal_reel || ""
      ).substring(0, 2)})`
    : "Ville non renseignée";


      if (!acc[ville]) {
        acc[ville] = [];
      }

      acc[ville].push(apprenti);

      return acc;
    },
    {}
  ) || {};

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

      

{Object.entries(villes).map(
  ([ville, liste]: any) => (
    <div key={ville}>
      <h2
        style={{
          color: "#005CA9",
          marginTop: "30px",
          marginBottom: "15px",
        }}
      >
        📍 {ville} ({liste.length})
      </h2>

      {liste.map((apprenti: any) => (
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
            🏢 {apprenti.entreprise}
          </p>

          <p>
            👨‍🏫 {apprenti.formateur}
          </p>

          <p>
            📅 {apprenti.date_debut} → {apprenti.date_fin}
          </p>
        </div>
      ))}
    </div>
  )
)}

    </main>
  );
}
