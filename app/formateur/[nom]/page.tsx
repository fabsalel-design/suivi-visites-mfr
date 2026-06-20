
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function FormateurDetailPage({
  params,
}: {
  params: Promise<{ nom: string }>;
}) {
  const { nom } = await params;

  const nomFormateur = decodeURIComponent(nom);

  const { data: apprentis, error } = await supabase
    .from("apprentis")
    .select("*")
    .eq("formateur", nomFormateur)
    .order("nom");

  const total = apprentis?.length || 0;

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          color: "#005CA9",
          marginBottom: "20px",
        }}
      >
        Bonjour {nomFormateur}
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            minWidth: "150px",
          }}
        >
          <strong>Total</strong>
          <br />
          {total}
        </div>

        <div
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            minWidth: "150px",
          }}
        >
          <strong>Effectuées</strong>
          <br />
          0
        </div>

        <div
          style={{
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            minWidth: "150px",
          }}
        >
          <strong>À faire</strong>
          <br />
          {total}
        </div>
      </div>

      {error && (
        <p>
          Erreur : {error.message}
        </p>
      )}

      {apprentis?.map((apprenti) => (
        <div
          key={apprenti.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
            backgroundColor: "#ffffff",
          }}
        >
          <h2>
            {apprenti.prenom} {apprenti.nom}
          </h2>

          <p>
            <strong>Entreprise :</strong>{" "}
            {apprenti.entreprise}
          </p>

          <p>
            <strong>Adresse :</strong>{" "}
            {apprenti.adresse_reelle}
          </p>

          <p>
            {apprenti.code_postal_reel}{" "}
            {apprenti.ville_reelle}
          </p>

          <p>
            <strong>Tuteur :</strong>{" "}
            {apprenti.tuteur}
          </p>

          <p>
            <strong>Téléphone :</strong>{" "}
            {apprenti.telephone}
          </p>

          <div
            style={{
              display: "flex",
              gap: "15px",
              flexWrap: "wrap",
              marginTop: "15px",
            }}
          >
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${apprenti.adresse_reelle} ${apprenti.code_postal_reel} ${apprenti.ville_reelle}`
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              📍 Google Maps
            </a>

            <Link
              href={`/apprentis/${apprenti.id}/visites`}
            >
              📂 Historique
            </Link>

            <Link
              href={`/apprentis/${apprenti.id}/visites`}
            >
              📝 Nouvelle visite
            </Link>
          </div>
        </div>
      ))}

      <hr />

      <p>
        <Link href="/formateur">
          ← Retour aux formateurs
        </Link>
      </p>
    </main>
  );
}
