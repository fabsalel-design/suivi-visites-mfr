
"use client";

import { useState } from "react";

export default function AffectationForm({
  entreprise,
  formateurActuel,
  formateurs,
}: {
  entreprise: string;
  formateurActuel: string;
  formateurs: string[];
}) {
  const [formateur, setFormateur] =
    useState(formateurActuel);

  const [message, setMessage] =
    useState("");

  async function enregistrer() {
    const response = await fetch(
      "/api/update-formateur",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          entreprise,
          formateur,
        }),
      }
    );

    if (response.ok) {
      setMessage(
        "✅ Affectation enregistrée"
      );
    } else {
      setMessage(
        "❌ Erreur d'enregistrement"
      );
    }
  }

  return (
    <>
      <p>
        Formateur actuel :
        <strong>
          {" "}
          {formateurActuel}
        </strong>
      </p>

      <p>
        Nouveau formateur :
      </p>

      <select
        value={formateur}
        onChange={(e) =>
          setFormateur(
            e.target.value
          )
        }
      >
        {formateurs.map(
          (f) => (
            <option
              key={f}
              value={f}
            >
              {f}
            </option>
          )
        )}
      </select>

      <br />
      <br />

      <button
        onClick={enregistrer}
      >
        💾 Enregistrer
      </button>

      <p>{message}</p>
    </>
  );
}
