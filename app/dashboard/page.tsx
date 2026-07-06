
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { data: apprentis, error } = await supabase
    .from("apprentis")
    .select("*");

  const totalApprentis = apprentis?.length || 0;

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
      <DashboardCard
        title="👨‍🎓 Apprentis"
        value={totalApprentis}
      />

      <DashboardCard
        title="🏢 Entreprises"
        value={entreprises.length}
      />

      <DashboardCard
        title="👥 Formateurs"
        value={formateurs.length}
      />

      <DashboardCard
        title="📝 À faire"
        value={visitesRestantes}
      />
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
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <button style={actionStyle}>
          📥 Import Gestibase
        </button>

        <button style={actionStyle}>
          👥 Affectations
        </button>

        <button style={actionStyle}>
          🗺️ Cartographie
        </button>

        <button style={actionStyle}>
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
                padding: "8px 0",
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
          Contrats terminés :
          <strong> 0</strong>
        </p>

        <p>
          Sans formateur :
          <strong> 0</strong>
        </p>

        <p>
          Visites en retard :
          <strong> 0</strong>
        </p>
      </div>
    </div>
  </main>
);
