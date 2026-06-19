
export default function VisitesPage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Nouvelle visite</h1>

      <label>Date de visite</label>
      <br />
      <input type="date" />

      <br />
      <br />

      <label>Observations</label>
      <br />
      <textarea rows={5} cols={60} />

      <br />
      <br />

      <label>Points forts</label>
      <br />
      <textarea rows={4} cols={60} />

      <br />
      <br />

      <label>Axes d'amélioration</label>
      <br />
      <textarea rows={4} cols={60} />

      <br />
      <br />

     
<a href="/signatures">
  <button>Passer aux signatures</button>
</a>
    </main>
  );
}
