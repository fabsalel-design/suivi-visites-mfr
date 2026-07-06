
import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function AffectationsPage() {
  const { data: apprentis } = await supabase
    .from("apprentis")
    .select("*")
    .order("ville_reelle")
    .order("nom");

  const villes =
    apprentis?.reduce(
      (acc: any, apprenti: any) => {
        const ville =
          apprenti.ville_reelle
            ? `${apprenti.ville_reelle} (${String(
                apprenti.code_postal_reel || ""
              ).substring(0, 2)})`
            : "Ville non renseignée";

        if (!acc[ville]) {
          acc[ville] = [];
        }

        acc[ville].push(apprenti);

        return acc;
      },
      {}
    ) || {};

  function regrouperParEntreprise(
    liste: any[]
  ) {
    return liste.reduce(
      (acc: any, apprenti: any) => {
        const entreprise =
          apprenti.entreprise ||
          "Entreprise non renseignée";

        if (!acc[entreprise]) {
          acc[entreprise] = [];
        }

        acc[entreprise].push(apprenti);

        return acc;
      },
      {}
    );
  }

  function getFormateursVille(
    liste: any[]
  ) {
    const compteur: Record<string, number> = {};

    liste.forEach((a) => {
      const formateur =
        a.formateur || "Non affecté";

      compteur[formateur] =
        (compteur[formateur] || 0) + 1;
    });

    return Object.entries(compteur);
  }

  function formatDate(
    date: string | null
  ) {
    if (!date) return "";

    return new Date(
      date
    ).toLocaleDateString("fr-FR");
  }

  return (
    <main
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "30px",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
     >
<Link
  href="/dashboard"
  style={{
    display: "inline-block",
    marginBottom: "20px",
    textDecoration: "none",
    color: "#005CA9",
    fontWeight: "bold",
  }}
>
  🏠 Retour au Dashboard
</Link>


      <h1
        style={{
          color: "#005CA9",
          marginBottom: "10px",
        }}
      >
        👥 Affectations formateurs
      </h1>

      <p
        style={{
          color: "#666",
          marginBottom: "30px",
        }}
      >
        Gestion des affectations des apprenants
      </p>

      {Object.entries(villes).map(
        ([ville, liste]: any) => (
          <div
            key={ville}
            style={{
              marginBottom: "50px",
            }}
          >
            <h2
              style={{
                color: "#005CA9",
                marginBottom: "15px",
              }}
            >
              📍 {ville} - {liste.length} apprenant(s)
            </h2>

            <div
              style={{
                background: "#eef5fb",
                padding: "15px",
