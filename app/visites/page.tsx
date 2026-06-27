"use client";

import { useState } from "react";

export default function VisitesPage() {
  const [form, setForm] = useState({
    apprenti_id: 1,
    date_visite: "",
    formation_suivie: "",

    interet_motivation: "",
    dynamisme: "",
    esprit_initiative: "",
    sens_organisation: "",
    volonte_changement: "",
    relations_equipe: "",
    adaptation: "",
    presentation: "",
    comprehension_consignes: "",
    application_regles: "",
    aptitudes_physiques: "",

    observations: "",
    points_forts: "",
    points_faibles: "",
  });

  async function enregistrerVisite() {
    const response = await fetch(
      "/api/visites/periode-essai",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const result = await response.json();
    console.log(result);

if (result.pdfData) {
  const pdfBytes = Uint8Array.from(
    atob(result.pdfData),
    (c) => c.charCodeAt(0)
  );

  const blob = new Blob(
    [pdfBytes],
    {
      type: "application/pdf",
    }
  );

  const url =
    window.URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;
  a.download =
    "evaluation-periode-essai.pdf";

  a.click();

  window.URL.revokeObjectURL(url);
}

if (result.excelData) {
  const excelBytes = Uint8Array.from(
    atob(result.excelData),
    (c) => c.charCodeAt(0)
  );

  const blob = new Blob(
    [excelBytes],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }
  );

  const url =
    window.URL.createObjectURL(blob);

  const a =
    document.createElement("a");

  a.href = url;
  a.download =
    "evaluation-periode-essai.xlsx";

  a.click();

  window.URL.revokeObjectURL(url);
}

    if (result.success) {
      alert(
        `Visite enregistrée ✅\nID : ${result.visite_id}`
      );
    } else {
      alert(
        `Erreur : ${result.error}`
      );
    }
  }

  function updateField(
    field: string,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>
        Évaluation période d'essai
      </h1>

      <h2>Informations générales</h2>

      <label>Date de visite</label>
      <br />
      <input
        type="date"
        onChange={(e) =>
          updateField(
            "date_visite",
            e.target.value
          )
        }
      />

      <br />
      <br />

      <label>
        Formation suivie
      </label>
      <br />
      <input
        type="text"
        style={{ width: "400px" }}
        onChange={(e) =>
          updateField(
            "formation_suivie",
            e.target.value
          )
        }
      />

      <hr />

      <h2>Évaluation</h2>

      <Critere
        titre="Intérêt et motivation"
        valeur={form.interet_motivation}
        onChange={(v) =>
          updateField(
            "interet_motivation",
            v
          )
        }
        options={[
          "Est indifférent",
          "Écoute et observe",
          "Observe et cherche à comprendre",
        ]}
      />

      <Critere
        titre="Dynamisme"
        valeur={form.dynamisme}
        onChange={(v) =>
          updateField("dynamisme", v)
        }
        options={[
          "A des difficultés à suivre le rythme",
          "Suit le mouvement",
          "Participe activement",
        ]}
      />

      <Critere
        titre="Esprit d'initiative"
        valeur={form.esprit_initiative}
        onChange={(v) =>
          updateField(
            "esprit_initiative",
            v
          )
        }
        options={[
          "Ne prend aucune initiative",
          "Demande validation",
          "Prend des initiatives",
        ]}
      />

      <Critere
        titre="Sens de l'organisation"
        valeur={form.sens_organisation}
        onChange={(v) =>
          updateField(
            "sens_organisation",
            v
          )
        }
        options={[
          "Manque d'organisation",
          "Organisé",
          "Autonome",
        ]}
      />

      <Critere
        titre="Volonté de changement"
        valeur={form.volonte_changement}
        onChange={(v) =>
          updateField(
            "volonte_changement",
            v
          )
        }
        options={[
          "Refuse les remarques",
          "Accepte difficilement",
          "Cherche à progresser",
        ]}
      />

      <Critere
        titre="Relations / équipe"
        valeur={form.relations_equipe}
        onChange={(v) =>
          updateField(
            "relations_equipe",
            v
          )
        }
        options={[
          "Conflits",
          "Relations correctes",
          "Très bonne intégration",
        ]}
      />

      <Critere
        titre="Adaptation"
        valeur={form.adaptation}
        onChange={(v) =>
          updateField(
            "adaptation",
            v
          )
        }
        options={[
          "Difficile",
          "En progrès",
          "Facile",
        ]}
      />

      <Critere
        titre="Présentation"
        valeur={form.presentation}
        onChange={(v) =>
          updateField(
            "presentation",
            v
          )
        }
        options={[
          "Insuffisante",
          "Correcte",
          "Très bonne",
        ]}
      />

      <Critere
        titre="Compréhension des consignes"
        valeur={
          form.comprehension_consignes
        }
        onChange={(v) =>
          updateField(
            "comprehension_consignes",
            v
          )
        }
        options={[
          "Faible",
          "Partielle",
          "Bonne",
        ]}
      />

      <Critere
        titre="Application des règles"
        valeur={form.application_regles}
        onChange={(v) =>
          updateField(
            "application_regles",
            v
          )
        }
        options={[
          "Insuffisante",
          "Correcte",
          "Rigoureuse",
        ]}
      />

      <Critere
        titre="Aptitudes physiques"
        valeur={form.aptitudes_physiques}
        onChange={(v) =>
          updateField(
            "aptitudes_physiques",
            v
          )
        }
        options={[
          "Difficiles",
          "Acceptables",
          "Très bonnes",
        ]}
      />

      <hr />

      <h2>Commentaires</h2>

      <label>Observations</label>
      <br />
      <textarea
        rows={5}
        cols={80}
        onChange={(e) =>
          updateField(
            "observations",
            e.target.value
          )
        }
      />

      <br />
      <br />

      <label>Points forts</label>
      <br />
      <textarea
        rows={4}
        cols={80}
        onChange={(e) =>
          updateField(
            "points_forts",
            e.target.value
          )
        }
      />

      <br />
      <br />

      <label>Points faibles</label>
      <br />
      <textarea
        rows={4}
        cols={80}
        onChange={(e) =>
          updateField(
            "points_faibles",
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={enregistrerVisite}
      >
        Enregistrer la visite
      </button>
    </main>
  );
}

function Critere({
  titre,
  valeur,
  onChange,
  options,
}: {
  titre: string;
  valeur: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div
      style={{
        marginBottom: "15px",
      }}
    >
      <label>
        <strong>{titre}</strong>
      </label>

      <br />

      <select
        value={valeur}
        onChange={(e) =>
          onChange(e.target.value)
        }
      >
        <option value="">
          Choisir...
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
