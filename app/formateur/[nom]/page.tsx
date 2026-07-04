
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
    apprentis?.map(
      (a) => a.entreprise
    ) || []
  ),
];



  const apprentiIds =
    apprentis?.map((a) => a.id) || [];

  const { data: visitesEffectuees } =
    await supabase
      .from("visites")
      .select("id, apprenti_id")
      .eq("realisee", true);

  const effectuees =
    visitesEffectuees?.filter((v) =>
      apprentiIds.includes(v.apprenti_id)
    ).length || 0;

  const aFaire =
    Math.max(0, total - effectuees);

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
         <strong>👨‍🎓 Apprentis</strong>
         
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
<strong>📝 Visites réalisées</strong>
   
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
       <strong>🏢 Entreprises</strong>

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
          🗺️ Carte
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
                📍{" "}
                {apprenti.adresse_reelle}
              </p>

              <p>
                {
                  apprenti.code_postal_reel
                }{" "}
                {
                  apprenti.ville_reelle
                }
              </p>

              <p>
                👤 {apprenti.tuteur}
              </p>

              
<p>
  📅 Contrat :
  {" "}
  {apprenti.contrat_date_debut}
  {" → "}
  {apprenti.contrat_date_fin}
</p>

              <p>
                📞{" "}
                {apprenti.telephone}
              </p>
            </div>
          
<div
  style={{
    backgroundColor:
      apprenti.statut === "Terminée"
        ? "#2e7d32"
        : "#f9a825",
    color: "white",
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
  }}
>
  {apprenti.statut === "Terminée"
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
              href={`https://maps.google.com/?q=${encodeURIComponent(
                `${apprenti.adresse_reelle} ${apprenti.code_postal_reel} ${apprenti.ville_reelle}`
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              📍 Google Maps
            </a>

            <a
              href={`tel:${apprenti.telephone || ""}`}
            >
              📞 Appeler
            </a>

            <Link
              href={`/apprentis/${apprenti.id}/visites`}
            >
              📂 Historique
            </Link>

            <Link
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
