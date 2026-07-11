import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import FormateurMap from "../../../components/FormateurMap";
 
export const dynamic = "force-dynamic";
 
export default async function CartographiePage() {
const { data: apprentis } = await supabase
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
 
const listeEtablissements = etablissements.sort();
 
const pointsCarte = (
await Promise.all(
etablissements.map(async (etablissement) => {
const morceaux = etablissement.split("|");
 
const entreprise = morceaux[0];
const adresse = morceaux[1];
const cp = morceaux[2];
const ville = morceaux[3];
 
try {
const recherche = encodeURIComponent(
`${adresse} ${cp} ${ville}`
);
 
const response = await fetch(
`https://nominatim.openstreetmap.org/search?format=json&q=${recherche}`,
{
headers: {
"User-Agent": "Suivi-Visites-MFR",
},
}
);
 
const resultat = await response.json();
 
if (resultat.length > 0) {
const apprentisSite = (apprentis || []).filter(
(a) =>
a.entreprise === entreprise &&
a.adresse_reelle === adresse &&
a.code_postal_reel === cp &&
a.ville_reelle === ville
);
 
return {
entreprise,
ville,
latitude: parseFloat(resultat[0].lat),
longitude: parseFloat(resultat[0].lon),
apprentis: apprentisSite,
statut: "AFaire",
};
}
 
return null;
} catch {
return null;
}
})
)
).filter(Boolean) as any[];
 
return (
<main
style={{
maxWidth: "1400px",
margin: "0 auto",
padding: "20px",
}}
>
/dashboard style={{
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
boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
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
<FormateurMap etablissements={pointsCarte} />
</div>
</main>
);
}
