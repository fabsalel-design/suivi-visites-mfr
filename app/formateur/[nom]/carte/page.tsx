
import Link from "next/link";
import { supabase } from "../../../../lib/supabase";
import FormateurMap from "../../../../components/FormateurMap";

export const dynamic = "force-dynamic";

export default async function CartePage({
  params,
}: {
  params: Promise<{ nom: string }>;
}) {
  const { nom } = await params;

  const nomFormateur = decodeURIComponent(nom);

  const { data: apprentis, error } = await supabase
    .from("apprentis")
    .select("*")
    .eq("formateur", nomFormateur);

  if (error) {
    return (
      <main style={{ padding: "20px" }}>
        <h1>Erreur</h1>
        <p>{error.message}</p>
      </main>
    );
  }

  const etablissements =
    apprentis?.reduce((acc: any, apprenti: any) => {
      const cle = `${apprenti.entreprise}|${apprenti.adresse_reelle}|${apprenti.code_postal_reel}|${apprenti.ville_reelle}`;

      if (!acc[cle]) {
        acc[cle] = {
          entreprise: apprenti.entreprise,
          adresse: apprenti.adresse_reelle,
          cp: apprenti.code_postal_reel,
          ville: apprenti.ville_reelle,
          apprentis: [],
        };
      }

      acc[cle].apprentis.push(apprenti);

      return acc;
    }, {}) || {};

  const listeEtablissements = Object.values(
    etablissements
  ) as Array<{
    entreprise: string;
    adresse: string;
    cp: string;
    ville: string;
    apprentis: any[];
  }>;

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        background: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "#005CA9",
        }}
      >
        🗺️ Carte des visites
      </h1>

      <p>
        Formateur : <strong>{nomFormateur}</strong>
      </p>

      <p>
        Établissements à visiter :{" "}
        <strong>
          {listeEtablissements.length}
        </strong>
      </p>

      <hr />

<div
  style={{
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
  }}
>

<FormateurMap
  etablissements={[
    {
      entreprise: "COPAL",
      ville: "Sommières",
      latitude: 43.783,
      longitude: 4.09,
    },
    {
      entreprise: "ANIMALIS",
      ville: "Nîmes",
      latitude: 43.8367,
      longitude: 4.3601,
    },
    {
      entreprise: "BOTANIC",
      ville: "Avignon",
      latitude: 43.9493,
      longitude: 4.8055,
    },
  ]}
/>


</div>

      {listeEtablissements.map(
        (etablissement, index) => (
          <div
            key={index}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow:
                "0 2px 5px rgba(0,0,0,0.10)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  color: "#005CA9",
                  margin: 0,
                }}
              >
                📍 {etablissement.entreprise}
              </h2>

              <div
                style={{
                  background: "#f9a825",
                  color: "white",
                  borderRadius: "20px",
                  padding:
                    "6px 14px",
                  fontWeight:
                    "bold",
                }}
              >
                {
                  etablissement
                    .apprentis.length
                }{" "}
                apprenti(s)
              </div>
            </div>

            <p>
              {etablissement.adresse}
            </p>

            <p>
              {etablissement.cp}{" "}
              {etablissement.ville}
            </p>

            <h4>Apprentis :</h4>

            <ul>
              {etablissement.apprentis.map(
                (apprenti) => (
                  <li
                    key={apprenti.id}
                  >
                    {apprenti.prenom}{" "}
                    {apprenti.nom}
                  </li>
                )
              )}
            </ul>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${etablissement.adresse} ${etablissement.cp} ${etablissement.ville}`
              )}`}
              target="_blank"
              rel="noreferrer"
              style={{
                textDecoration:
                  "none",
              }}
            >
              📍 Ouvrir dans Google Maps
            </a>
          </div>
        )
      )}

      <hr />

      <Link
        href={`/formateur/${encodeURIComponent(
          nomFormateur
        )}`}
      >
        ← Retour aux visites
      </Link>
    </main>
  );
}
