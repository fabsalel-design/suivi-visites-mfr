
export default function SignaturesPage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Signatures</h1>

      <h2>Signature du tuteur</h2>

      <div
        style={{
          border: "2px solid black",
          height: "150px",
          marginBottom: "20px",
        }}
      />

      <h2>Signature du formateur</h2>

      <div
        style={{
          border: "2px solid black",
          height: "150px",
          marginBottom: "20px",
        }}
      />

      <button>
        Générer le PDF
      </button>
    </main>
  );
}
