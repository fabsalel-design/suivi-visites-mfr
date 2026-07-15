
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
  const router = useRouter();

  const [formateur, setFormateur] =
    useState(formateurActuel);
const [nouveauFormateur, setNouveauFormateur] =
  useState("");
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

    const data =
      await response.json();

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
    } else {
      setMessage(
        `❌ ${data.error}`
      );
    }
  }
async function ajouterFormateur() {
  if (!nouveauFormateur.trim()) return;

  const response = await fetch(
    "/api/formateurs",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        nom: nouveauFormateur,
      }),
    }
  );

  if (response.ok) {
    window.location.reload();
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

<p>
  ➕ Créer un formateur :
</p>

<input
  type="text"
  value={nouveauFormateur}
  onChange={(e) =>
    setNouveauFormateur(
      e.target.value
    )
  }
  placeholder="Nom du formateur"
/>

<button
  onClick={ajouterFormateur}
  style={{
    marginLeft: "10px",
    backgroundColor: "#2e7d32",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  ➕ Ajouter
</button>
      <br />
      <br />

      <button
        onClick={enregistrer}
        style={{
          backgroundColor:
            "#005CA9",
          color: "white",
          border: "none",
          padding:
            "10px 16px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        💾 Enregistrer
      </button>

      <p
        style={{
          fontWeight: "bold",
          marginTop: "15px",
        }}
      >
        {message}
      </p>
    </>
  );
}
