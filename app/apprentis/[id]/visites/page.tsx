import Link from "next/link";
import { supabase } from "../../../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function VisitesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    origine?: string;
  }>;
}) {
 const { origine } = await searchParams;
  const { id } = await params;

const { data: apprenti } = await supabase
  .from("apprentis")
  .select(
    "formateur, nom, prenom, gestibase_id"
  )
  .eq("id", id)
  .single();

const { data: visites, error } = await supabase
  .from("visites")
  .select("*")
  .eq(
    "gestibase_id",
    apprenti?.gestibase_id
  )
  .order("date_visite", {
    ascending: false,
  });
const { data: apprenti } = await supabase
.from("apprentis")
.select("formateur, nom, prenom")
.eq("id", id)
.single();
  return (
    <main style={{ padding: "40px" }}>
  {origine === "coordinateur" ? (
  <Link
    href="/dashboard/suivi-visites"
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
    🏠 Retour au suivi global
  </Link>
) : (
<Link
  href={`/formateur/${encodeURIComponent(
    apprenti?.formateur || ""
  )}`}
  style={{backgroundColor: "white", 
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
  🏠 Retour au tableau de bord
</Link>
)}
      <h1>Historique des visites</h1>

 <p>
<strong>Apprenti :</strong>{" "}
{apprenti?.prenom} {apprenti?.nom}
{" "}
(ID : {id})
</p>

     
      {error && (
        <p>
          Erreur : {error.message}
        </p>
      )}

      {(!visites || visites.length === 0) && (
        <p>
          Aucune visite enregistrée.
        </p>
      )}

      {visites?.map((visite) => (
        <div
          key={visite.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <p>
            <strong>Date :</strong>{" "}
            {visite.date_visite ||
              "Non renseignée"}
          </p>

          <p>
            <strong>Type :</strong>{" "}
            {visite.type_visite ||
              "Non renseigné"}
          </p>

          <p>
            <strong>Formateur :</strong>{" "}
            {visite.formateur_visiteur ||
              "Non renseigné"}
          </p>

          <p>
            <strong>Réalisée :</strong>{" "}
            {visite.realisee
              ? "Oui"
              : "Non"}
          </p>

          <p>
            <strong>Mode :</strong>{" "}
            {visite.mode_traitement ||
              "Non renseigné"}
          </p>

          <div
            style={{
              marginTop: "15px",
            }}
          >
            <Link
              href={`/apprentis/${id}/visites/${visite.id}`}
            >
              <button>
                👁 Consulter
              </button>
            </Link>
          </div>
        </div>
      ))}
     
    </main>
  );
}
