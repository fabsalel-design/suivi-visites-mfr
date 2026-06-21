
import Link from "next/link";
import { supabase } from "../../../../../lib/supabase";

export const dynamic = "force-dynamic";

const criteres = [
  "Intérêt et motivation",
  "Dynamisme",
  "Esprit d'initiative / curiosité",
  "Sens de l'organisation",
  "Volonté de changement",
  "Relations / équipe de travail",
  "Adaptation",
  "Présentation",
  "Compréhension des consignes",
  "Application des règles",
  "Aptitudes physiques générales",
];

export default async function PeriodeEssaiPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: apprenti } = await supabase
    .from("apprentis")
    .select("*")
    .eq("id", id)
    .single();

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "30px",
      }}
    >
      <h1
        style={{
          color: "#005CA9",
        }}
      >
        Évaluation de fin de période d'essai
      </h1>

      <div
        style={{
          display: "grid",
          gap: "15px",
          marginTop: "30px",
          marginBottom: "40px",
        }}
      >
        <div>
          <label>Date de l'évaluation</label>
          <br />
          <input type="date" />
        </div>

        <div>
          <label>Employeur</label>
          <br />
          <input
            type="text"
            defaultValue={apprenti?.entreprise || ""}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Nom de l'étudiant</label>
          <br />
          <input
            type="text"
            defaultValue={`${apprenti?.prenom || ""} ${apprenti?.nom || ""}`}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Formation suivie</label>
          <br />
          <input
            type="text"
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Nom du formateur</label>
          <br />
          <input
            type="text"
            defaultValue={apprenti?.formateur || ""}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Nom du maître d'apprentissage</label>
          <br />
          <input
            type="text"
            defaultValue={apprenti?.tuteur || ""}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <h2>Critères d'évaluation</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              Critère
            </th>

            <th
              style={{
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              Non acquise
            </th>

            <th
              style={{
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              En cours
            </th>

            <th
              style={{
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              Acquise
            </th>
          </tr>
        </thead>

        <tbody>
          {criteres.map((critere) => (
            <tr key={critere}>
              <td
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                }}
              >
                {critere}
              </td>

              <td
                style={{
                  border: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                <input
                  type="radio"
                  name={critere}
                  value="non"
                />
              </td>

              <td
                style={{
                  border: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                <input
                  type="radio"
                  name={critere}
                  value="encours"
                />
              </td>

              <td
                style={{
                  border: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                <input
                  type="radio"
                  name={critere}
                  value="acquise"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >
        <div>
          <label>Observations générales</label>
          <br />
          <textarea
            rows={6}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Points forts</label>
          <br />
          <textarea
            rows={4}
            style={{ width: "100%" }}
          />
        </div>

        <div>
          <label>Points faibles</label>
          <br />
          <textarea
            rows={4}
            style={{ width: "100%" }}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: "40px",
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <button
          style={{
            backgroundColor: "#005CA9",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Enregistrer
        </button>

        <button
          style={{
            backgroundColor: "#2e7d32",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Générer PDF
        </button>
      </div>

      <p style={{ marginTop: "30px" }}>
        <Link href={`/apprentis/${id}/visites/nouvelle`}>
          ← Retour aux types de visite
        </Link>
      </p>
    </main>
  );
}
