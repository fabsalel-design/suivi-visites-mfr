
import { apprentis } from "../../data/apprentis";

export default function DashboardPage() {
  const entreprises = [
    ...new Set(apprentis.map((a) => a.entreprise)),
  ];

  const formateurs = [
    ...new Set(apprentis.map((a) => a.formateur)),
  ];

  const repartition = formateurs.map((formateur) => ({
    formateur,
    total: apprentis.filter(
      (a) => a.formateur === formateur
    ).length,
  }));

  return (
    <main style={{ padding: "40px" }}>
      <h1>Tableau de bord</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            minWidth: "150px",
          }}
        >
          <h2>Apprentis</h2>
          <p>{apprentis.length}</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            minWidth: "150px",
          }}
        >
          <h2>Entreprises</h2>
          <p>{entreprises.length}</p>
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            minWidth: "150px",
          }}
        >
          <h2>Formateurs</h2>
          <p>{formateurs.length}</p>
        </div>
      </div>

      <h2>Répartition par formateur</h2>

      <ul>
        {repartition.map((r) => (
          <li key={r.formateur}>
            {r.formateur} : {r.total} apprenti(s)
          </li>
        ))}
      </ul>
    </main>
  );
}
