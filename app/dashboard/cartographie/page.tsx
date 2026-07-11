import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import FormateurMap from "../../../components/FormateurMap";
 
export const dynamic = "force-dynamic";
 
export default async function CartographiePage() {
const { data: apprentis, error } =
await supabase
.from("apprentis")
.select("*");
 
if (error) {
return (
<main style={{ padding: "20px" }}>
<h1>Erreur</h1>
<p>{error.message}</p>
</main>
);
}
 
const etablissements = Object.values(
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
) as any[];
 
const etablissementsGeocodes =
await Promise.all(
etablissements.map(
async (etablissement) => {
try {
const adresse =
encodeURIComponent(
`${etablissement.adresse} ${etablissement.cp} ${etablissement.ville}`
);
 
const response =
await fetch(
`https://nominatim.openstreetmap.org/search?format=json&q=${adresse}`,
{
headers: {
"User-Agent":
"Suivi-Visites-MFR",
},
}
);
 
let resultat =
await response.json();
 
if (
resultat.length === 0
) {
const secours =
encodeURIComponent(
`${etablissement.entreprise} ${etablissement.ville}`
);
 
const responseSecours =
await fetch(
`https://nominatim.openstreetmap.org/search?format=json&q=${secours}`,
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
 
if (
resultat.length > 0
) {
return {
entreprise:
etablissement.entreprise,
ville:
etablissement.ville,
latitude:
parseFloat(
resultat[0].lat
),
longitude:
parseFloat(
resultat[0].lon
),
apprentis:
etablissement.apprentis.map(
(a: any) =>
`${a.prenom} ${a.nom}`
),
statut:
etablissement.apprentis.some(
(a: any) =>
a.statut !==
"Terminée"
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
);
 
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
backgroundColor:
"white",
color: "#005CA9",
padding:
"10px 18px",
borderRadius:
"12px",
textDecoration:
"none",
fontWeight:
"bold",
border:
"2px solid #005CA9",
marginBottom:
"20px",
}}
>
🏠 Retour au dashboard
</Link>
 
<h1
style={{
color: "#005CA9",
}}
>
🗺️ Cartographie du supérieur
</h1>
 
<p>
📍{" "}
<strong>
{pointsCarte.length}
</strong>{" "}
établissements
</p>
 
<div
style={{
background:
"white",
padding:
"20px",
borderRadius:
"12px",
}}
>
<FormateurMap
etablissements={
pointsCarte
}
/>
</div>
</main>
);
