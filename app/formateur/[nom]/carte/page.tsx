
import Link from "next/link";
import { supabase } from "../../../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function CartePage({
  params,
}: {
  params: Promise<{ nom: string }>;
}) {
  const { nom } = await params;

  const nomFormateur = decodeURIComponent(nom);

  const { data: apprentis } = await supabase
    .from("apprentis")
    .select("*")
    .eq("formateur", nomFormateur)
    .order("ville_reelle");

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1 style={{ color: "#005CA9" }}>
        🗺️ Carte des visites
      </h1>

      <p>
        Formateur : <strong>{nomFormateur}</strong>
      </p>

      <p>
        Nombre de visites :{" "}
        <strong>{apprentis?.length || 0}</strong>
      </p>

      <hr />

      {apprentis?.map((apprenti) => (
        <div
          key={apprenti.id}
          style={{
            background: "white",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px",
            border: "1px solid #ddd",
          }}
        >
          <strong>
            {apprenti.prenom} {apprenti.nom}
          </strong>

          <br />

          {apprenti.entreprise}

          <br />

          {apprenti.adresse_reelle}

          <br />

          {apprenti.code_postal_reel}{" "}
          {apprenti.ville_reelle}

          <br />
          <br />

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(
              `${apprenti.adresse_reelle} ${apprenti.code_postal_reel} ${apprenti.ville_reelle}`
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            📍 Ouvrir dans Google Maps
          </a>
        </div>
      ))}

      <hr />

      <Link href={`/formateur/${encodeURIComponent(nomFormateur)}`}>
        ← Retour à mes visites
      </Link>
    </main>
  );
}
``

