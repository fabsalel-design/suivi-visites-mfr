
import Link from "next/link";
import { supabase } from "../../../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function VisitesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: visites, error } = await supabase
    .from("visites")
    .select("*")
    .eq("apprenti_id", id)
    .order("date_visite", {
      ascending: false,
    });

  return (
    <main style={{ padding: "40px" }}>
      <h1>Historique des visites</h1>

      <p>
        Apprenti ID : {id}
      </p>

      <hr />

      <button>
        Nouvelle visite
      </button>

      <hr />

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
        </div>
      ))}

      <hr />

      <p>
        <Link
          href={`/apprentis/${id}/edit`}
        >
          Retour à la fiche apprenti
        </Link>
      </p>
    </main>
  );
}
