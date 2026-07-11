import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import FormateurMap from "../../../components/FormateurMap";
 
export const dynamic = "force-dynamic";
 
export default async function CartographiePage() {
const { data: apprentis } = await supabase
.from("apprentis")
.select("*");
 const { data: toutesVisites } =
  await supabase
    .from("visites")
    .select("apprenti_id")
    .eq("realisee", true);
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
  console.log(
  "NB ETABLISSEMENTS",
  etablissements.length
);
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
adresse,
cp,
ville,
 formateur:
  apprentisSite[0]?.formateur || "",
tuteur:
apprentisSite[0]?.tuteur || "",
 
telephone:
apprentisSite[0]?.telephone || "",
 
latitude: parseFloat(resultat[0].lat),
 
longitude: parseFloat(resultat[0].lon),
 
apprentis: [
...new Set(
apprentisSite.map(
(a) => `${a.prenom} ${a.nom}`
)
)
],
 statut:
  apprentisSite.some(
    (a) =>
      toutesVisites?.some(
        (v) => v.apprenti_id === a.id
      )
  )
    ? "Terminee"
    : "AFaire",

};
 }
return null;
} catch {
return null;
}
})
)
).filter(Boolean) as any[];
 console.log(
  "NB POINTS CARTE",
  pointsCarte.length
);
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

<p
style={{
color: "#666",
marginBottom: "20px",
}}
>
👨‍🏫 Formateurs présents : {
new Set(
(apprentis || [])
.map((a) => a.formateur)
.filter(Boolean)
).size
}
</p>
  <p
style={{
color: "#d32f2f",
fontWeight: "bold",
}}
>
🔴 Établissements restant à visiter : {
pointsCarte.filter(
(e) => e.statut === "AFaire"
).length
}
</p>
  <div
style={{
display: "flex",
gap: "20px",
marginBottom: "20px",
flexWrap: "wrap",
}}
>
   <p
style={{
color: "#2e7d32",
fontWeight: "bold",
}}
>
🟢 Établissements visités : {
pointsCarte.filter(
(e) => e.statut === "Terminee"
).length
}
</p>
   
<div
style={{
background: "#fff",
padding: "15px 20px",
borderRadius: "12px",
fontWeight: "bold",
minWidth: "180px",
}}
>
🏢 Établissements : {pointsCarte.length}
</div>
 
<div
style={{
background: "#fff",
padding: "15px 20px",
borderRadius: "12px",
fontWeight: "bold",
minWidth: "180px",
}}
>
👨‍🎓 Apprentis : {(apprentis || []).length}
</div>
 
<div
style={{
background: "#fff",
padding: "15px 20px",
borderRadius: "12px",
fontWeight: "bold",
minWidth: "180px",
color: "#2e7d32",
}}
>
🟢 Terminées : {
pointsCarte.filter(
(e) => e.statut === "Terminee"
).length
}
</div>
 
<div
style={{
background: "#fff",
padding: "15px 20px",
borderRadius: "12px",
fontWeight: "bold",
minWidth: "180px",
color: "#d32f2f",
}}
>
🔴 À faire : {
pointsCarte.filter(
(e) => e.statut === "AFaire"
).length
}
</div>
</div>
  
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
 
<h2
style={{
color: "#d32f2f",
marginTop: "20px",
}}
>
🔴 Établissements à visiter
</h2>
 
<p>
Total : {
pointsCarte.filter(
(e) => e.statut === "AFaire"
).length
} établissement(s)
</p>
 
<ul>
{pointsCarte
.filter((e) => e.statut === "AFaire")
.sort((a, b) => a.ville.localeCompare(b.ville))
.map((e, index) => (
<li
key={index}
style={{
marginBottom: "8px",
padding: "8px",
borderBottom: "1px solid #eee",
}}
>
🔴 <strong>{e.entreprise}</strong>
{" - "}
{e.ville}
  {" ("}
{e.apprentis?.length || 0}
{" apprenti(s))"}
</li>

))}
</ul>
</main>
);
}
