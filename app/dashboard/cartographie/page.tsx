import Link from "next/link";
 import { supabase } from "../../../lib/supabase";
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
 
<p>
👨‍🎓 Apprentis :{" "}
<strong>
{apprentis?.length || 0}
</strong>
</p>
 
<p>
📍 Établissements :{" "}
<strong>
{etablissements.length}
</strong>
</p>
</main>
);
}
