
import { supabase } from "../../../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function AffectationEntreprisePage({
  params,
}: {
  params: Promise<{
    entreprise: string;
  }>;
}) {
  const { entreprise } = await params;

  const nomEntreprise =
    decodeURIComponent(entreprise);

  const { data: apprentis } =
    await supabase
      .from("apprentis")
      .select("*")
      .eq("entreprise", nomEntreprise)
      .order("nom");

  const formateurActuel =
    apprentis?.[0]?.formateur ||
    "Non affecté";

const { data: tousLesApprentis } =
  await supabase
    .from("apprentis")
    .select("formateur");

const formateurs = [
  ...new Set(
    (tousLesApprentis || [])
      .map((a) => a.formateur)
      .filter(Boolean)
  ),
].sort();

  return (
    <main
      style={{
        maxWidth: "900px",
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
        🏢 {nomEntreprise}
      </h1>

      <p>
        Gestion des affectations
        formateurs
      </p>

      
<div
  style={{
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
  }}
>
  <h2
    style={{
      color: "#005CA9",
      marginTop: 0,
    }}
  >
    👨‍🏫 Affectation
  </h2>

  <p>
    Formateur actuel :
    <strong>
      {" "}
      {formateurActuel ||
        "⚠️ Non affecté"}
    </strong>
  </p>

  <hr
    style={{
      margin: "20px 0",
    }}
  />

  <p>
    Nouveau formateur :
  </p>

  <select
    style={{
      padding: "10px",
      borderRadius: "8px",
      border:
        "1px solid #ccc",
      minWidth: "250px",
      marginBottom: "20px",
    }}
  >
    <option>
      Sélectionner un formateur
    </option>

    {formateurs.map(
      (formateur) => (
        <option
          key={formateur}
          value={formateur}
        >
          {formateur}
        </option>
      )
    )}
  </select>

  <br />

  <button
    style={{
      backgroundColor:
        "#005CA9",
      color: "white",
      border: "none",
      padding:
        "10px 16px",
      borderRadius: "8px",
      fontWeight: "bold",
      cursor: "pointer",
    }}
  >
    💾 Enregistrer
  </button>
</div>


      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            color: "#005CA9",
            marginTop: 0,
          }}
        >
          👨‍🎓 Apprenants concernés
        </h2>

        <ul>
          {(apprentis || []).map(
            (a: any) => (
              <li key={a.id}>
                {a.prenom} {a.nom}
              </li>
            )
          )}
        </ul>
      </div>
    </main>
  );
}
