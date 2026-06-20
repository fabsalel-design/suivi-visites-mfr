
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
      (a) => a.statut === "Terminée"
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
    <main style={{ padding: "40px" }}>
      <h1>Tableau de bord</h1>

      {error && (
        <p>Erreur : {error.message}</p>
      )}

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            minWidth: "180px",
          }}
        >
          <h2>Apprentis</h2>
          <p>{totalApprentis}</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            minWidth: "180px",
          }}
        >
          <h2>Entreprises</h2>
          <p>{entreprises.length}</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            minWidth: "180px",
          }}
        >
          <h2>Formateurs</h2>
          <p>{formateurs.length}</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            minWidth: "180px",
          }}
        >
          <h2>Visites réalisées</h2>
          <p>{visitesRealisees}</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            minWidth: "180px",
          }}
        >
          <h2>Visites restantes</h2>
          <p>{visitesRestantes}</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            minWidth: "180px",
          }}
        >
          <h2>Avancement</h2>
          <p>{avancement}%</p>
        </div>
      </div>
    </main>
  );
}
