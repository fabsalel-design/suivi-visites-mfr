import Link from "next/link";
 import { supabase } from "../../../lib/supabase";
export const dynamic = "force-dynamic";
 
export default async function CartographiePage() {
  const { data: apprentis } =
await supabase    
.from("apprentis")
.select("*");
  
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
</main>
);
}
