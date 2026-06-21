
<div
  style={{
    display: "flex",
    gap: "10px",
    marginBottom: "30px",
  }}
>
  <button
    style={{
      backgroundColor: "#005CA9",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "8px",
    }}
  >
    📋 Mes visites
  </button>

  <Link
    href={`/formateur/${encodeURIComponent(
      nomFormateur
    )}/carte`}
    style={{
      backgroundColor: "white",
      border: "1px solid #ddd",
      padding: "12px 20px",
      borderRadius: "8px",
      textDecoration: "none",
      color: "black",
      display: "inline-block",
    }}
  >
    🗺️ Carte
  </Link>
</div>
