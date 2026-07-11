import Link from "next/link";
 import { supabase } from "../../../lib/supabase";
import FormateurMap from "../../../components/FormateurMap";
export const dynamic = "force-dynamic";
 
export default async function CartographiePage() {
  const { data: apprentis } =
await supabase    
.from("apprentis")
.select("*");
  const etablissements = [
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
  const listeEtablissements =
etablissements.sort();
const premier =
etablissements[0]?.split("|");

  const adresseRecherche = encodeURIComponent(
`${premier?.[1] || ""} ${premier?.[2] || ""} ${premier?.[3] || ""}`
);
 
const response = await fetch(
`https://nominatim.openstreetmap.org/search?format=json&q=${adresseRecherche}`,
{
headers: {
"User-Agent": "Suivi-Visites-MFR",
},
}
);
 
const resultat = await response.json();
const pointsCarte = [
{
entreprise:
premier?.[0] || "",
 
ville:
premier?.[3] || "",
 
latitude:
resultat?.[0]?.lat
? parseFloat(resultat[0].lat)
: 43.859,
 
longitude:
resultat?.[0]?.lon
? parseFloat(resultat[0].lon)
: 4.446,
 
apprentis: [],
 
statut: "AFaire",
},
];
  
return (
<main
style={{
maxWidth: "1400px",
margin: "0 auto",
padding: "20px",
}}
>
<Link
href="/dashboard"
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
marginBottom: "20px",
}}
>
🏠 Retour au dashboard
</Link>
 
<h1
style={{
color: "#005CA9",
marginTop: 0,
}}
>
🗺️ Cartographie du supérieur
</h1>
 <div
style={{
background: "white",
padding: "20px",
borderRadius: "12px",
marginTop: "20px",
}}
>
<FormateurMap
etablissements={pointsCarte}
/>
</div>
  
</main>
);
}
