import FormateurMap from "../../../components/FormateurMap";
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

const entreprises = [
...new Set(
(apprentis || [])
.filter(
(a) =>
a.adresse_reelle &&
a.ville_reelle
)
.map(
(a) =>
`${a.entreprise}|${a.adresse_reelle}|${a.code_postal_reel}|${a.ville_reelle}`
)
),
];


  const apprentiIds =
    apprentis?.map((a) => a.id) || [];
const { data: toutesVisites } =
  await supabase
    .from("visites")
    .select("apprenti_id")
    .eq("realisee", true);
 
const { data: visitesEffectuees } =
  await supabase
    .from("visites")
    .select("*")
    .eq("realisee", true);


console.log(
  "VISITES EFFECTUEES",
  visitesEffectuees
);
  
  const effectuees =
    visitesEffectuees?.filter((v) =>
      apprentiIds.includes(v.apprenti_id)
    ).length || 0;

  const aFaire =
    Math.max(0, total - effectuees);

const actionStyle = {
  padding: "8px 14px",
  borderRadius: "8px",
  backgroundColor: "#f5f7fa",
  textDecoration: "none",
  color: "#005CA9",
  fontWeight: 600,
};
  

const etablissementsCarte = Object.values(
  (apprentis || []).reduce(
    (acc: any, apprenti: any) => {
      const cle =
        `${apprenti.entreprise}|${apprenti.adresse_reelle}|${apprenti.code_postal_reel}|${apprenti.ville_reelle}`;

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
    },
    {}
  )
) as Array<{
  entreprise: string;
  adresse: string;
  cp: string;
  ville: string;
  apprentis: any[];
}>;

const etablissementsGeocodes =
  await Promise.all(
    etablissementsCarte.map(
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

          if (data.length > 0) {
           
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
    data[0].lat
  ),

  longitude: parseFloat(
    data[0].lon
  ),

 
apprentis:
  etablissement.apprentis.map(
    (a) =>
      `${a.prenom} ${a.nom}`
  ),

statut:
  etablissement.apprentis.some(
    (a) => a.statut !== "Terminée"
  )
    ? "AFaire"
    : "Terminee",


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
   
function formatDate(date: string | null) {
  if (!date) return "";

  return new Date(date).toLocaleDateString(
    "fr-FR"
  );
}

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
     
<h1
  style={{
    color: "#005CA9",
    marginBottom: "5px",
  }}
>
  Bonjour {nomFormateur} 👋
</h1>

<p
  style={{
    color: "#666",
    marginBottom: "30px",
  }}
>
  Bienvenue dans votre espace de suivi des apprentis
</p>
<div
style={{
background: "#fff7ed",
border: "2px solid #f59e0b",
borderRadius: "12px",
padding: "20px",
marginBottom: "30px",
}}
>
<h2
style={{
marginTop: 0,
color: "#d97706",
}}
>
📊 Mes statistiques
</h2>
 
<div
style={{
display: "flex",
justifyContent: "space-around",
alignItems: "center",
flexWrap: "wrap",
gap: "20px",
marginTop: "20px",
}}
>
  <p
style={{
color: "#666",
marginTop: "0",
marginBottom: "20px",
fontWeight: "bold",
}}
>
{total} actions en attente
</p>
<div>
👨‍🎓 {total} apprenti(s)
</div>
 
<div>
✅ <strong>{effectuees}</strong> visite(s) réalisées
</div>
 
<div>
📍 <strong>{entreprises.length}</strong> établissement(s) à visiter
</div>
</div>
</div>
<div
style={{
marginBottom: "20px",
}}
>
<h2
style={{
color: "#005CA9",
marginBottom: "5px",
}}
>
📋 Actions à réaliser
</h2>
 
<p
style={{
color: "#666",
margin: 0,
}}
>
Actions en attente
</p>
</div>
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
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            minWidth: "180px",
            boxShadow:
              "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
         <strong>📋 Visites Fin de période d'essai</strong>
         

<div
  style={{
    fontSize: "42px",
    fontWeight: "bold",
    color: "#005CA9",
    marginTop: "10px",
  }}
>
  {total}
</div>

        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            minWidth: "180px",
            boxShadow:
              "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
<strong>📅 Visites intermédiaires</strong>
   
<div
  style={{
    fontSize: "42px",
    fontWeight: "bold",
    color: "#005CA9",
    marginTop: "10px",
  }}
>
 {effectuees}
</div>

        </div>

        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            minWidth: "180px",
            boxShadow:
              "0 2px 5px rgba(0,0,0,0.1)",
          }}
          >
       <strong>🏁 Visites de Fin de formation</strong>

<div
  style={{
    fontSize: "42px",
    fontWeight: "bold",
    color: "#005CA9",
    marginTop: "10px",
  }}
>
  {entreprises.length}
</div>

        </div>
      </div>

<div
  style={{
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "30px",
    boxShadow:
      "0 2px 5px rgba(0,0,0,0.1)",
  }}
>
  <h2
    style={{
      marginTop: 0,
      color: "#005CA9",
    }}
  >
    🗺️ Mes entreprises
  </h2>

  <p
    style={{
      color: "#666",
      marginBottom: "15px",
    }}
  >
    Vue géographique de mon portefeuille
  </p>
  
<div
  style={{
    height: "300px",
    borderRadius: "8px",
    overflow: "hidden",
  }}
>
  <FormateurMap
    etablissements={pointsCarte}
  />
</div>

</div>

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
         🗺️ Ouvrir la carte complète
        </Link>
      </div>

      {error && (
        <p>Erreur : {error.message}</p>
      )}

      {apprentis?.map((apprenti) => (
        <div
          key={apprenti.id}
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
            boxShadow:
              "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "flex-start",
            }}
          >
            <div>
              <h2
                style={{
                  marginTop: 0,
                  color: "#005CA9",
                }}
              >
                {apprenti.prenom}{" "}
                {apprenti.nom}
              </h2>

              <div
                style={{
                  marginBottom: "12px",
                }}
              >
                <span
                  style={{
                    backgroundColor:
                      apprenti.contrat_type_contrat ===
                      "STAGE"
                        ? "#2e7d32"
                        : "#1565c0",
                    color: "white",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {apprenti.contrat_type_contrat ===
                  "STAGE"
                    ? "🟢 Stagiaire"
                    : "🔵 Apprenti"}
                </span>
              </div>

             
<p
  style={{
    fontSize: "18px",
    fontWeight: "bold",
    color: "#005CA9",
    marginBottom: "10px",
  }}
>
  🏢 {apprenti.entreprise}
</p>
           
<p>
  📍 {apprenti.ville_reelle}
</p>

              <p>
                👤 {apprenti.tuteur}
              </p>

              

<p>
  📅 Contrat :
  {" "}
  {formatDate(apprenti.date_debut)}
  {" → "}
  {formatDate(apprenti.date_fin)}
</p>


              <p>
                📞{" "}
                {apprenti.telephone}
              </p>
            </div>
          
<div
  style={{
    backgroundColor:
      toutesVisites?.some(
        (v) =>
          v.apprenti_id === apprenti.id
      )
        ? "#2e7d32"
        : "#f9a825",

    color: "white",
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
  }}
>
  {toutesVisites?.some(
    (v) =>
      v.apprenti_id === apprenti.id
  )
    ? "✅ Terminée"
    : "🟠 À faire"}
</div>

          </div>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "15px",
            }}
          >
            <a
            
  style={actionStyle}
  href={`https://maps.google.com/?q=${encodeURIComponent(
    `${apprenti.adresse_reelle} ${apprenti.code_postal_reel} ${apprenti.ville_reelle}`
  )}`}
  target="_blank"
  rel="noreferrer"
>
  📍 Google Maps
</a>
            
<a
  style={actionStyle}
  href={`tel:${apprenti.telephone || ""}`}
>
  📞 Appeler
</a>

            
<Link
  style={actionStyle}
  href={`/apprentis/${apprenti.id}/visites`}
>
  📂 Historique
</Link>
          
<Link
  style={actionStyle}
  href={`/apprentis/${apprenti.id}/visites/nouvelle`}
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
