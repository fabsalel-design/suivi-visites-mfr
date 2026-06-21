
import Link from "next/link";
import { supabase } from "../../../../../lib/supabase";

export const dynamic = "force-dynamic";

const criteres = [
  {
    titre: "Intérêt et motivation",
    options: [
      "Est indifférent",
      "Écoute et observe",
      "Observe et cherche à comprendre",
    ],
  },
  {
    titre: "Dynamisme",
    options: [
      "A des difficultés à suivre le rythme",
      "Suit le mouvement",
      "Participe activement",
    ],
  },
  {
    titre: "Esprit d'initiative, curiosité",
    options: [
      "Ne prend aucune initiative, attend les consignes",
      "A des idées mais demande une validation avant d'agir",
      "Sait prendre des initiatives dans les limites de sa compétence",
    ],
  },
  {
    titre: "Sens de l'organisation",
    options: [
      "Manque d'organisation et perd du temps",
      "Est organisé",
      "Sait s'organiser en relative autonomie",
    ],
  },
  {
    titre: "Volonté de changement",
    options: [
      "Refuse les critiques et remarques",
      "Accepte les remarques mais difficilement",
      "Accepte les remarques, a la volonté d'évoluer",
    ],
  },
  {
    titre: "Relations / équipe de travail",
    options: [
      "Ne cherche pas à communiquer ou entre en conflit",
      "Hésite à s'exprimer mais se montre ouvert",
      "Communique facilement et trouve sa place dans l'équipe",
    ],
  },
  {
    titre: "Adaptation",
    options: [
      "Fait peu d'efforts d'adaptation",
      "Essaie mais a des difficultés d'adaptation",
      "S'adapte facilement à l'esprit d'entreprise",
    ],
  },
  {
    titre: "Présentation",
    options: [
      "Ne fait aucun effort de présentation",
      "A une présentation pouvant être améliorée",
      "Bonne présentation",
    ],
  },
  {
    titre: "Compréhension des consignes",
    options: [
      "A des difficultés à saisir et appliquer les consignes",
      "Comprend les consignes mais les applique mal",
      "Comprend et applique les consignes avec précision",
    ],
  },
  {
    titre: "Application des règles",
    options: [
      "Les oublie fréquemment et prend des risques",
      "Ne fait pas d'oubli ou d'erreur grave",
      "Les applique rigoureusement",
    ],
  },
  {
    titre: "Aptitudes physiques générales",
    options: [
      "N'assure pas toutes les tâches confiées",
      "Fatigue dans certaines situations",
      "Ne ménage ni ses efforts ni son temps",
    ],
  },
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
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "30px",
      }}
    >
      <h1
        style={{
          color: "#005CA9",
          marginBottom: "30px",
        }}
      >
        Évaluation de l'apprenti en fin de période d'essai
      </h1>

      <div
        style={{
          display: "grid",
          gap: "15px",
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
          <input type="text" style={{ width: "100%" }} />
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

      {criteres.map((critere, index) => (
        <div
          key={index}
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "20px",
            border: "1px solid #ddd",
          }}
        >
          <h3>{critere.titre}</h3>

          {critere.options.map((option, i) => (
            <label
              key={i}
              style={{
                display: "block",
                marginBottom: "12px",
              }}
            >
              <input
                type="radio"
                name={`critere_${index}`}
                value={i}
                style={{ marginRight: "10px" }}
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      <div
        style={{
          display: "grid",
          gap: "20px",
          marginTop: "40px",
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
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "30px",
        }}
      >
        <div>
          <h3>Visa maître d'apprentissage</h3>

          <div
            style={{
              height: "120px",
              border: "2px dashed #999",
              borderRadius: "8px",
            }}
          />
        </div>

        <div>
          <h3>Visa CFA / Formateur</h3>

          <div
            style={{
              height: "120px",
              border: "2px dashed #999",
              borderRadius: "8px",
            }}
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
          }}
        >
          Générer le PDF
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
