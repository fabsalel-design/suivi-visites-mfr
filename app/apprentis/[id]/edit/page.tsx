
"use client";

import { useEffect, useState } from "react";

export default function EditApprentiPage({
  params,
}: {
  params: { id: string };
}) {
  const [apprenti, setApprenti] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function charger() {
      const response = await fetch(
        `/api/apprenti/${params.id}`
      );

      const data = await response.json();

      setApprenti(data);
    }

    charger();
  }, [params.id]);

  async function enregistrer() {
    const response = await fetch(
      "/api/update-apprenti",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id: apprenti.id,
          telephone: apprenti.telephone,
          tuteur: apprenti.tuteur,
          statut: apprenti.statut,
        }),
      }
    );

    const resultat =
      await response.json();

    if (resultat.error) {
      setMessage(
        `Erreur : ${resultat.error}`
      );
      return;
    }

    setMessage(
      "Enregistrement effectué"
    );
  }

  if (!apprenti) {
    return (
      <main style={{ padding: "40px" }}>
        Chargement...
      </main>
    );
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>
        {apprenti.prenom} {apprenti.nom}
      </h1>

      <p>Tuteur</p>

      <input
        value={apprenti.tuteur || ""}
        onChange={(e) =>
          setApprenti({
            ...apprenti,
            tuteur: e.target.value,
          })
        }
      />

      <br />
      <br />

      <p>Téléphone</p>

      <input
        value={
          apprenti.telephone || ""
        }
        onChange={(e) =>
          setApprenti({
            ...apprenti,
            telephone:
              e.target.value,
          })
        }
      />

      <br />
      <br />

      <p>Statut</p>

      <select
        value={apprenti.statut || ""}
        onChange={(e) =>
          setApprenti({
            ...apprenti,
            statut: e.target.value,
          })
        }
      >
        <option>A faire</option>
        <option>Terminée</option>
      </select>

      <br />
      <br />

      <button onClick={enregistrer}>
        Enregistrer
      </button>

      <p>{message}</p>
    </main>
  );
}
