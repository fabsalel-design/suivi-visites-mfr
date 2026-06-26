"use client";

import Link from "next/link";
import { useEffect, useState } from "react";


const criteres = [
  {
    key: "interet_motivation",
    titre: "Intérêt et motivation",
    non: "Est indifférent",
    encours: "Écoute et observe",
    acquis: "Observe et cherche à comprendre",
  },
  {
    key: "dynamisme",
    titre: "Dynamisme",
    non: "A des difficultés à suivre le rythme",
    encours: "Suit le mouvement",
    acquis: "Participe activement",
  },
  {
    key: "esprit_initiative",
    titre: "Esprit d'initiative, curiosité",
    non: "Ne prend aucune initiative",
    encours: "Demande validation",
    acquis: "Prend des initiatives",
  },
  {
    key: "sens_organisation",
    titre: "Sens de l'organisation",
    non: "Manque d'organisation",
    encours: "Organisé",
    acquis: "Autonome",
  },
  {
    key: "volonte_changement",
    titre: "Volonté de changement",
    non: "Refuse les remarques",
    encours: "Accepte difficilement",
    acquis: "Cherche à progresser",
  },
  {
    key: "relations_equipe",
    titre: "Relations / équipe de travail",
    non: "Entre en conflit",
    encours: "Relations correctes",
    acquis: "Très bonne intégration",
  },
  {
    key: "adaptation",
    titre: "Adaptation",
    non: "Difficile",
    encours: "Moyenne",
    acquis: "Facile",
  },
  {
    key: "presentation",
    titre: "Présentation",
    non: "Insuffisante",
    encours: "Correcte",
    acquis: "Très bonne",
  },
  {
    key: "comprehension_consignes",
    titre: "Compréhension des consignes",
    non: "Difficile",
    encours: "Partielle",
    acquis: "Bonne",
  },
  {
    key: "application_regles",
    titre: "Application des règles",
    non: "Insuffisante",
    encours: "Correcte",
    acquis: "Rigoureuse",
  },
  {
    key: "aptitudes_physiques",
    titre: "Aptitudes physiques générales",
    non: "Insuffisantes",
    encours: "Correctes",
    acquis: "Très bonnes",
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
  
const [apprenti, setApprenti] =
  useState<any>(null);

  const [loading, setLoading] =
    useState(false);
  
const [visiteId, setVisiteId] =
  useState<number | null>(null);
  
const [excelData, setExcelData] =
  useState("");

  const [dateVisite, setDateVisite] =
    useState("");

  const [
    formationSuivie,
    setFormationSuivie,
  ] = useState("");

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
        `/api/apprenti/${p.id}`
      );

     
if (response.ok) {
  const apprenti =
    await response.json();

  console.log(apprenti);
  
  setApprenti(apprenti);

  setFormateur(
    apprenti.formateur || ""
  );
}
``

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

            formation_suivie:
              formationSuivie,

            formateur_visiteur:
              formateur,

            observations,

            points_forts:
              pointsForts,

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

console.log(
  "RESULTAT API :",
  result
);

alert(
  "ExcelData présent : " +
    (result.excelData ? "OUI" : "NON")
);
      
setVisiteId(result.visite_id);
      
setExcelData(
  result.excelData || ""
);
      
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
      
{apprenti && (
  <div
    style={{
      background: "#ffffff",
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "30px",
    }}
  >
    <p>
      <strong>Apprenti :</strong>{" "}
      {apprenti.prenom} {apprenti.nom}
    </p>

    <p>
      <strong>Entreprise :</strong>{" "}
      {apprenti.entreprise}
    </p>

    <p>
      <strong>Maître d'apprentissage :</strong>{" "}
      {apprenti.tuteur}
    </p>

    <p>
      <strong>Formateur :</strong>{" "}
      {apprenti.formateur}
    </p>
  </div>
)}

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

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <label>
          Formation suivie
        </label>

        <br />

        <input
          type="text"
          value={formationSuivie}
          onChange={(e) =>
            setFormationSuivie(
              e.target.value
            )
          }
          placeholder="Ex : BAC PRO TCVA"
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "8px",
          }}
        />
      </div>

     
<table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "30px",
    backgroundColor: "white",
  }}
>
  <thead>
    <tr>
      <th
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          textAlign: "left",
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
        En cours d'acquisition
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
      <tr key={critere.key}>
        <td
          style={{
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          {critere.titre}
        </td>

        
<td
  style={{
    border: "1px solid #ccc",
    padding: "8px",
  }}
>
  <label>
    <input
      type="radio"
      name={critere.key}
      value="NON_ACQUISE"
      onChange={(e) =>
        setNotes({
          ...notes,
          [critere.key]:
            e.target.value,
        })
      }
    />{" "}
    {critere.non}
  </label>
</td>

       
<td
  style={{
    border: "1px solid #ccc",
    padding: "8px",
  }}
>
  <label>
    <input
      type="radio"
      name={critere.key}
      value="EN_COURS"
      onChange={(e) =>
        setNotes({
          ...notes,
          [critere.key]:
            e.target.value,
        })
      }
    />{" "}
    {critere.encours}
  </label>
</td>

       
<td
  style={{
    border: "1px solid #ccc",
    padding: "8px",
  }}
>
  <label>
    <input
      type="radio"
      name={critere.key}
      value="ACQUISE"
      onChange={(e) =>
        setNotes({
          ...notes,
          [critere.key]:
            e.target.value,
        })
      }
    />{" "}
    {critere.acquis}
  </label>
</td>
      </tr>
    ))}
  </tbody>
</table>

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
