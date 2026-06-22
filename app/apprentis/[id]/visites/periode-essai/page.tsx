
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const criteres = [
  {
    key: "interet_motivation",
    titre: "Intérêt et motivation",
    options: [
      "Est indifférent",
      "Écoute et observe",
      "Observe et cherche à comprendre",
    ],
  },
  {
    key: "dynamisme",
    titre: "Dynamisme",
    options: [
      "A des difficultés à suivre le rythme",
      "Suit le mouvement",
      "Participe activement",
    ],
  },
  {
    key: "esprit_initiative",
    titre: "Esprit d'initiative, curiosité",
    options: [
      "Ne prend aucune initiative",
      "Demande validation",
      "Prend des initiatives",
    ],
  },
  {
    key: "sens_organisation",
    titre: "Sens de l'organisation",
    options: [
      "Peu organisé",
      "Organisé",
      "Très organisé",
    ],
  },
  {
    key: "volonte_changement",
    titre: "Volonté de changement",
    options: [
      "Refuse les remarques",
      "Accepte difficilement",
      "Cherche à progresser",
    ],
  },
  {
    key: "relations_equipe",
    titre: "Relations / équipe de travail",
    options: [
      "Difficultés relationnelles",
      "Relations correctes",
      "Très bonne intégration",
    ],
  },
  {
    key: "adaptation",
    titre: "Adaptation",
    options: [
      "Difficile",
      "Moyenne",
      "Facile",
    ],
  },
  {
    key: "presentation",
    titre: "Présentation",
    options: [
      "Insuffisante",
      "Correcte",
      "Très bonne",
    ],
  },
  {
    key: "comprehension_consignes",
    titre: "Compréhension des consignes",
    options: [
      "Difficile",
      "Partielle",
      "Bonne",
    ],
  },
  {
    key: "application_regles",
    titre: "Application des règles",
    options: [
      "Insuffisante",
      "Correcte",
      "Rigoureuse",
    ],
  },
  {
    key: "aptitudes_physiques",
    titre: "Aptitudes physiques générales",
    options: [
      "Insuffisantes",
      "Correctes",
      "Très bonnes",
    ],
  },
];

export default function PeriodeEssaiPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState("");
  const [formateur, setFormateur] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [dateVisite, setDateVisite] =
    useState("");

  const [observations, setObservations] =
    useState("");

  const [pointsForts, setPointsForts] =
    useState("");

  const [pointsFaibles, setPointsFaibles] =
    useState("");

  const [notes, setNotes] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    async function charger() {
      const p = await params;

      setId(p.id);

      const response = await fetch(
        `/api/apprentis/${p.id}`
      );

      if (response.ok) {
        const apprenti =
          await response.json();

        setFormateur(
          apprenti.formateur || ""
        );
      }
    }

    charger();
  }, [params]);

  async function enregistrer() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/visites/periode-essai",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            apprenti_id: Number(id),

            date_visite: dateVisite,

            formateur_visiteur:
              formateur,

            observations,
            points_forts: pointsForts,
            points_faibles:
              pointsFaibles,

            interet_motivation:
              notes.interet_motivation ||
              "",

            dynamisme:
              notes.dynamisme || "",

            esprit_initiative:
              notes.esprit_initiative ||
              "",

            sens_organisation:
              notes.sens_organisation ||
              "",

            volonte_changement:
              notes.volonte_changement ||
              "",

            relations_equipe:
              notes.relations_equipe ||
              "",

            adaptation:
              notes.adaptation || "",

            presentation:
              notes.presentation || "",

            comprehension_consignes:
              notes.comprehension_consignes ||
              "",

            application_regles:
              notes.application_regles ||
              "",

            aptitudes_physiques:
              notes.aptitudes_physiques ||
              "",
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        alert(
          result.error ||
            "Erreur d'enregistrement"
        );
        return;
      }

      alert(
        "✅ Visite enregistrée"
      );

      window.location.href = `/apprentis/${id}/visites`;
    } catch (error) {
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
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
          marginBottom: "30px",
        }}
      >
        Évaluation de fin de période d'essai
      </h1>

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <label>Date de la visite</label>

        <br />

        <input
          type="date"
          value={dateVisite}
          onChange={(e) =>
            setDateVisite(
              e.target.value
            )
          }
        />
      </div>

      {criteres.map((critere) => (
        <div
          key={critere.key}
          style={{
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h3>{critere.titre}</h3>

          {critere.options.map(
            (option) => (
              <label
                key={option}
                style={{
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                <input
                  type="radio"
                  name={
                    critere.key
                  }
                  value={option}
                  onChange={(e) =>
                    setNotes({
                      ...notes,
                      [critere.key]:
                        e.target
                          .value,
                    })
                  }
                />{" "}
                {option}
              </label>
            )
          )}
        </div>
      ))}

      <div>
        <h3>
          Observations générales
        </h3>

        <textarea
          rows={5}
          style={{
            width: "100%",
          }}
          value={observations}
          onChange={(e) =>
            setObservations(
              e.target.value
            )
          }
        />
      </div>

      <div>
        <h3>Points forts</h3>

        <textarea
          rows={4}
          style={{
            width: "100%",
          }}
          value={pointsForts}
          onChange={(e) =>
            setPointsForts(
              e.target.value
            )
          }
        />
      </div>

      <div>
        <h3>Points faibles</h3>

        <textarea
          rows={4}
          style={{
            width: "100%",
          }}
          value={pointsFaibles}
          onChange={(e) =>
            setPointsFaibles(
              e.target.value
            )
          }
        />
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
          onClick={enregistrer}
          disabled={loading}
          style={{
            backgroundColor:
              "#005CA9",
            color: "white",
            border: "none",
            padding:
              "12px 20px",
            borderRadius:
              "8px",
            cursor: "pointer",
          }}
        >
          {loading
            ? "Enregistrement..."
            : "Enregistrer"}
        </button>

        <button
          style={{
            backgroundColor:
              "#2e7d32",
            color: "white",
            border: "none",
            padding:
              "12px 20px",
            borderRadius:
              "8px",
          }}
        >
          Générer le PDF
        </button>
      </div>

      <p
        style={{
          marginTop: "30px",
        }}
      >
        <Link
          href={`/apprentis/${id}/visites/nouvelle`}
        >
          ← Retour aux types de visite
        </Link>
      </p>
    </main>
  );
}
``
