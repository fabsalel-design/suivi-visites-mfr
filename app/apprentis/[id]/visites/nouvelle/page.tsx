
import Link from "next/link";

export default async function NouvelleVisitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px",
      }}
    >
      <h1
        style={{
          color: "#005CA9",
        }}
      >
        Nouvelle visite
      </h1>

      <p>
        Choisissez le type de visite à réaliser.
      </p>

      <div
        style={{
          display: "grid",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Link
          href={`/apprentis/${id}/visites/periode-essai`}
          style={{
            padding: "20px",
            background: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: "12px",
            textDecoration: "none",
            color: "#005CA9",
            fontWeight: "bold",
          }}
        >
          📋 Période d'essai
        </Link>

        <Link
          href={`/apprentis/${id}/visites/intermediaire`}
          style={{
            padding: "20px",
            background: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: "12px",
            textDecoration: "none",
            color: "#005CA9",
            fontWeight: "bold",
          }}
        >
          📋 Intermédiaire
        </Link>

        <Link
       href={`/apprentis/${id}/visites/fin-formation`}
          style={{
            padding: "20px",
            background: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: "12px",
            textDecoration: "none",
            color: "#005CA9",
            fontWeight: "bold",
          }}
        >
        📋 Fin de formation
        </Link>
      </div>

 <p
        style={{
          marginTop: "30px",
        }}
      >
       
       <Link
          href={`/apprentis/${id}/visites`}
         
style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "white",
    color: "#005CA9",
    padding: "10px 18px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "bold",
    border: "2px solid #005CA9",
    boxShadow:
      "0 3px 10px rgba(0,0,0,0.08)",
  }}
        >
         🏠 Retour à l'historique
        </Link>
      </p>
    </main>
  );
}
