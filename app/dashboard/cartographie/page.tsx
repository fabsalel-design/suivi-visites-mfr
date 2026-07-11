import Link from "next/link";
 
export const dynamic = "force-dynamic";
 
export default async function CartographiePage() {
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
Page en construction.
</p>
</main>
);
}
Afficher plus de lignes

Une fois que ce fichier est déployé et que le build est vert, on ajoutera :

récupération des apprentis ;
regroupement des établissements ;
géocodage ;
composant FormateurMap.

On repartira d'une base saine sans recasser le build. 👍

Fournissez vos commentaires sur BizChat
Ajoute la récupération des apprentisMontre comment regrouper les établissementsComment intégrer FormateurMap ?
FichiersFichiers
