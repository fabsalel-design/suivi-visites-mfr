
import { supabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function EntreprisePage({
  params,
}: {
  params: Promise<{ nom: string }>;
}) {
  const { nom } = await params;

  const entrepriseNom = decodeURIComponent(nom);

  const { data: liste, error } = await supabase
    .from("apprentis")
    .select("*")
    .eq("entreprise", entrepriseNom);

  if (error) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Erreur</h1>
        <p>{error.message}</p>
      </main>
    );
  }

  if (!liste || liste.length === 0) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Entreprise introuvable</h1>
      </main>
    );
  }

  const premier = liste[0];

  const adresseComplete = `${premier.adresse_reelle || ""} ${
    premier.code_postal_reel || ""
  } ${premier.ville_reelle || ""}`;

  const urlMaps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    adresseComplete
  )}`;

  return (
    <main style={{ padding: "40px" }}>
      <h1>{entrepriseNom}</h1>

      <h2>Coordonnées</h2>

      <p>
        <strong>Tuteur :</strong>{" "}
        {premier.tuteur || "Non renseigné"}
      </p>

      <p>
        <strong>Téléphone :</strong>{" "}
        {premier.telephone || "Non renseigné"}
      </p>

      <h2>Adresse réelle</h2>

      <p>{premier.adresse_reelle}</p>

      <p>
        {premier.code_postal_reel}{" "}
        {premier.ville_reelle}
      </p>

      <p>
        <a
          href={urlMaps}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>
            Voir sur Google Maps
          </button>
        </a>
      </p>

      <hr />

      <h2>
        Apprentis ({liste.length})
      </h2>

      <ul>
        {liste.map((apprenti) => (
          <li key={apprenti.id}>
            {apprenti.prenom} {apprenti.nom}
            {" - "}
            {apprenti.formateur}
          </li>
        ))}
      </ul>
    </main>
  );
}
