
import { apprentis } from "../../data/apprentis";

export default function DashboardPage() {
  const entreprises = [
    ...new Set(apprentis.map((a) => a.entreprise)),
  ];

  const formateurs = [
    ...new Set(apprentis.map((a) => a.formateur)),
  ];

  const visitesRealisees = apprentis.filter(
    (a) => a.statut === "Terminée"
  ).length;

  const visitesRestantes =
    apprentis.length - visitesRealisees;

  const avancement =
    apprentis.length > 0
      ? Math.round(
          (visitesRealisees / apprentis.length) * 100
        )
      : 0;

  const repartition = formateurs.map((formateur) => {
    const apprentisFormateur = apprentis.filter(
      (a) => a.formateur === formateur
    );

    const realisees = apprentisFormateur.filter(
      (a) => a.statut === "Terminée"
    ).length;

    return {
      formateur,
      total: apprentisFormateur.length,
      realisees,
      restantes:
        apprentisFormateur.length - realisees,
    };
  });

  return (
    <main style={{ padding: "40px" }}>
      <h1>Tableau de bord</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "30px",
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
          <p>{apprentis.length}</p>
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

      <hr />

      <h2>Répartition par formateur</h2>

      <ul>
        {repartition.map((r) => (
          <li key={r.formateur}>
            <strong>{r.formateur}</strong> :
            {" "}
            {r.realisees} réalisée(s) /
            {" "}
            {r.total} apprenti(s)
            {" "}
            ({r.restantes} restante(s))
          </li>
        ))}
      </ul>
    </main>
  );
}
