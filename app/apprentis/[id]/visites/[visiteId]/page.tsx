
import Link from "next/link";
import { supabase } from "../../../../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function ConsulterVisitePage({
  params,
}: {
  params: Promise<{
    id: string;
    visiteId: string;
  }>;
}) {
  const { id, visiteId } =
    await params;

  const { data: visite, error } =
    await supabase
      .from("visites")
      .select("*")
      .eq("id", visiteId)
      .single();

  if (error || !visite) {
    return (
      <main
        style={{
          padding: "40px",
        }}
      >
        <h1>
          Visite introuvable
        </h1>

        <Link
          href={`/apprentis/${id}/visites`}
        >
          ← Retour à l'historique
        </Link>
      </main>
    );
  }

  let details = null;

  if (
    visite.type_visite ===
    "periode_essai"
  ) {
    const { data } =
      await supabase
        .from(
          "visites_periode_essai"
        )
        .select("*")
        .eq("visite_id", visite.id)
        .single();

    details = data;
  }

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "30px",
      }}
    >
      <h1
        style={{
          color: "#005CA9",
        }}
      >
        Consultation de visite
      </h1>

      <div
        style={{
          background: "white",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <p>
          <strong>Date :</strong>{" "}
          {
            visite.date_visite
          }
        </p>

        <p>
          <strong>Type :</strong>{" "}
          {
            visite.type_visite
          }
        </p>

        <p>
          <strong>
            Formateur :
          </strong>{" "}
          {visite.formateur_visiteur}
        </p>

        <p>
          <strong>
            Réalisée :
          </strong>{" "}
          {visite.realisee
            ? "Oui"
            : "Non"}
        </p>

        <p>
          <strong>
            Observations :
          </strong>{" "}
          {visite.observations ||
            "Aucune"}
        </p>
      </div>

      {details && (
        <div
          style={{
            background:
              "#f8f9fa",
            border:
              "1px solid #ddd",
            borderRadius:
              "12px",
            padding: "20px",
          }}
        >
          <h2>
            Évaluation
          </h2>

          <p>
            <strong>
              Intérêt et motivation :
            </strong>{" "}
            {
              details.interet_motivation
            }
          </p>

          <p>
            <strong>
              Dynamisme :
            </strong>{" "}
            {details.dynamisme}
          </p>

          <p>
            <strong>
              Esprit
              d'initiative :
            </strong>{" "}
            {
              details.esprit_initiative
            }
          </p>

          <p>
            <strong>
              Sens de
              l'organisation :
            </strong>{" "}
            {
              details.sens_organisation
            }
          </p>

          <p>
            <strong>
              Volonté de
              changement :
            </strong>{" "}
            {
              details.volonte_changement
            }
          </p>

          <p>
            <strong>
              Relations
              équipe :
            </strong>{" "}
            {
              details.relations_equipe
            }
          </p>

          <p>
            <strong>
              Adaptation :
            </strong>{" "}
            {
              details.adaptation
            }
          </p>

          <p>
            <strong>
              Présentation :
            </strong>{" "}
            {
              details.presentation
            }
          </p>

          <p>
            <strong>
              Compréhension
              des consignes :
            </strong>{" "}
