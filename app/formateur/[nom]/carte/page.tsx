
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
const { dat*: toutesVisites } =
  await supaba*e
    .from("visites")
    .select*"apprenti_id")
    .eq("realisee",*true);
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

  
const etablissementsGeocodes =
  await Promise.all(
    listeEtablissements.map(
      async (etablissement) => {
        try {
          const adresse = encodeURIComponent(
            `${etablissement.adresse} ${etablissement.cp} ${etablissement.ville}`
          );


          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${adresse}`,
            {
              headers: {
                "User-Agent":
                  "Suivi-Visites-MFR",
              },
            }
          );


          const data =
            await response.json();

       let resultat = data;
 
if (resultat.length === 0) {
 
const rechercheSecours =
encodeURIComponent(
`${etablissement.entreprise} ${etablissement.ville}`
);
 
const responseSecours =
await fetch(
`https://nominatim.openstreetmap.org/search?format=json&q=${rechercheSecours}`,
{
headers: {
"User-Agent":
"Suivi-Visites-MFR",
},
}
);
 
resultat =
await responseSecours.json();
}
 
if (resultat.length > 0) {
           
return {
  entreprise:
    etablissement.entreprise,

  adresse:
    etablissement.adresse,

  cp:
    etablissement.cp,

  ville:
    etablissement.ville,

  tuteur:
    etablissement.apprentis[0]
      ?.tuteur || "",

  telephone:
    etablissement.apprentis[0]
      ?.telephone || "",

  latitude: parseFloat(
  resultat[0].lat
  ),

  longitude: parseFloat(
  resultat[0].lon
  ),
 
apprentis: [
...new Set(
etablissement.apprentis.map(
(a) =>
`${a.prenom} ${a.nom}`
)
),
],

statut:
  etabli*sement.apprentis.some(
    (a) =>
*     toutesVisites?.some(
        *v) => v.apprenti_id === a.id
     *)
  )
    ? "Terminee"
    : "AFai*e",
  };
          }
          return null;
        } catch {
          return null;
        }
      }
    )
  );


const pointsCarte =
  etablissementsGeocodes.filter(
    Boolean
  ) as {
    entreprise: string;
    ville: string;
    latitude: number;
    longitude: number;
    apprentis: string[];
  }[];
 
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
      
<Link
  href={`/formateur/${encodeURIComponent(
    nomFormateur
  )}`}

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
  marginBottom: "20px",
  boxShadow:
    "0 3px 10px rgba(0,0,0,0.08)",
}}

>
🏠 Retour au tableau de bord
</Link>

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
       🏢 Etablissements géolocalisés : {" "}
        <strong>
        {pointsCarte.length}
        </strong>
      </p>
{listeEtablissements.length >
pointsCarte.length && (
<p
style={{
color: "#d97706",
fontWeight: "bold",
}}
>
⚠️{" "}
{listeEtablissements.length -
pointsCarte.length}{" "}
établissement(s) non géolocalisé(s)
</p>
)}
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
  etablissements={pointsCarte}
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
                  new Set(
etablissement.apprentis.map(
(a) =>
a.gestibase_id ||
`${a.nom}-${a.prenom}`
)
).size
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
{[
...new Map(
etablissement.apprentis.map(
(apprenti) => [
apprenti.gestibase_id ||
`${apprenti.nom}-${apprenti.prenom}`,
apprenti,
]
)
).values(),
].map((apprenti: any) => (
<li key={apprenti.id}>
{apprenti.prenom} {apprenti.nom}
</li>
))}
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

   
    </main>
  );
}
