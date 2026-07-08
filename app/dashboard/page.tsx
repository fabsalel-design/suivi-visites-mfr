import Link from "next/link";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { data: apprentis, error } = await supabase
    .from("apprentis")
    .select("*");

const totalApprentis =
  new Set(
    apprentis?.map(
      (a) =>
        a.gestibase_id ||
        `${a.nom}-${a.prenom}`
    ) || []
  ).size;


  const entreprises = [
    ...new Set(
      apprentis?.map((a) => a.entreprise) || []
    ),
  ];

  const formateurs = [
    ...new Set(
      apprentis?.map((a) => a.formateur) || []
    ),
  ];

 const visitesRealisees =
  apprentis?.filter(
    (a) => a.statut?.trim() === "Terminée"
  ).length || 0;

  const visitesRestantes =
    totalApprentis - visitesRealisees;

  const avancement =
    totalApprentis > 0
      ? Math.round(
          (visitesRealisees / totalApprentis) * 100
        )
      : 0;
  
const sansFormateur =
  apprentis?.filter(
    (a) =>
      !a.formateur ||
      a.formateur === "Non affecté"
  ).length || 0;

const priorites = [];

if (sansFormateur > 0) {
  priorites.push(
    `⚠️ ${sansFormateur} apprenant(s) sans formateur`
  );
} else {
  priorites.push(
    "✅ Tous les apprenants sont affectés"
  );
}

if (visitesRestantes > 0) {
  priorites.push(
    `📅 ${visitesRestantes} visite(s) à réaliser`
  );
}

priorites.push(
  `🏢 ${entreprises.length} entreprises à suivre`
);


return (
  <main
    style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "30px",
      backgroundColor: "#f5f7fa",
      minHeight: "100vh",
    }}
  >
    <div style={{ marginBottom: "30px" }}>
      <h1
        style={{
          color: "#005CA9",
          marginBottom: "5px",
        }}
      >
        Bonjour Fabrice 👋
      </h1>

      <p
        style={{
          color: "#666",
          margin: 0,
        }}
      >
        Centre de pilotage des visites supérieur
      </p>
    </div>

    {error && (
      <p>Erreur : {error.message}</p>
    )}

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ color: "#666" }}>
          👨‍🎓 Apprentis
        </div>
        <div
          style={{
            fontSize: "42px",
            fontWeight: "bold",
            color: "#005CA9",
          }}
        >
          {totalApprentis}
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ color: "#666" }}>
          🏢 Entreprises
        </div>
        <div
          style={{
            fontSize: "42px",
            fontWeight: "bold",
            color: "#005CA9",
          }}
        >
          {entreprises.length}
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ color: "#666" }}>
          👥 Formateurs
        </div>
        <div
          style={{
            fontSize: "42px",
            fontWeight: "bold",
            color: "#005CA9",
          }}
        >
          {formateurs.length}
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ color: "#666" }}>
       ⚠️ Non affectés
        </div>
        <div
          style={{
            fontSize: "42px",
            fontWeight: "bold",
            
color:
  sansFormateur > 0
    ? "#f57c00"
    : "#2e7d32",

          }}
        >
         {sansFormateur}
        </div>
      </div>
    </div>

  
<div
  style={{
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "30px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
  }}
>
  <h2
    style={{
      marginTop: 0,
      color: "#005CA9",
    }}
  >
    🎯 Priorités du jour
  </h2>

  {priorites.map(
    (priorite, index) => (
      <p
        key={index}
        style={{
          margin: "10px 0",
          fontSize: "16px",
        }}
      >
        {priorite}
      </p>
    )
  )}
</div>

<div
  style={{
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "30px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
  }}
>
  <h2
    style={{
      marginTop: 0,
      color: "#005CA9",
    }}
  >
    🚀 Actions rapides
  </h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <button
          style={{
            backgroundColor: "#005CA9",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          📥 Import Gestibase
        </button>

      
<Link
  href="/dashboard/affectations"
  style={{
    backgroundColor: "#005CA9",
    color: "white",
    padding: "12px 18px",
    borderRadius: "10px",
    fontWeight: "bold",
    textDecoration: "none",
    display: "inline-block",
  }}
>
  👥 Affectations
</Link>

        <button
          style={{
            backgroundColor: "#005CA9",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          🗺️ Cartographie
        </button>

        <button
          style={{
            backgroundColor: "#005CA9",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          📝 Suivi visites
        </button>
      </div>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "2fr 1fr",
        gap: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
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
          👥 Répartition des formateurs
        </h2>

        {formateurs.map((formateur) => {
          const count =
            apprentis?.filter(
              (a) =>
                a.formateur === formateur
            ).length || 0;

          return (
            <div
              key={formateur}
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                padding: "10px 0",
                borderBottom:
                  "1px solid #eee",
              }}
            >
              <strong>{formateur}</strong>
              <span>{count}</span>
            </div>
          );
        })}
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
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
          ⚠️ Alertes
        </h2>

        <p>
          Contrats terminés : <strong>0</strong>
        </p>

        <p>
          Sans formateur : <strong>0</strong>
        </p>

        <p>
          Visites en retard : <strong>0</strong>
        </p>

        <hr />

        <p>
          Avancement global :
          <strong> {avancement}%</strong>
        </p>

        <p>
          Visites réalisées :
          <strong> {visitesRealisees}</strong>
        </p>
      </div>
    </div>
  </main>
);
}
