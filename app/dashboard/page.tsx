
export default function DashboardPage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Tableau de bord Coordinateur</h1>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <h2>Campagne active</h2>
        <p>S2 2026</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "15px",
        }}
      >
        <div style={{ border: "1px solid #ddd", padding: "15px" }}>
          <h3>Apprentis</h3>
          <p>84</p>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "15px" }}>
          <h3>Entreprises</h3>
          <p>72</p>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "15px" }}>
          <h3>Visites réalisées</h3>
          <p>0</p>
        </div>

        <div style={{ border: "1px solid #ddd", padding: "15px" }}>
          <h3>Visites restantes</h3>
          <p>84</p>
        </div>
      </div>

      <hr style={{ margin: "30px 0" }} />

      <h2>Actions rapides</h2>

      <ul>
        <li>Importer Excel</li>
        <li>Gérer les apprentis</li>
        <li>Voir les entreprises</li>
        <li>Consulter les PDF</li>
      </ul>
    </main>
  );
}
