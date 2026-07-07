
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


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
  const router = useRouter();

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

  setTimeout(() => {
    router.push(
      "/dashboard/affectations"
    );
    router.refresh();
  }, 1000);
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
