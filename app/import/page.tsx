
"use client";

import { useState } from "react";

export default function ImportPage() {
  const [message, setMessage] = useState("");
  const [fichier, setFichier] = useState<File | null>(null);

  async function importer() {
    if (!fichier) {
      setMessage("Veuillez sélectionner un fichier Excel");
      return;
    }

    setMessage(
      `Fichier sélectionné : ${fichier.name}`
    );
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Import Excel</h1>

      <p>Import du fichier semestriel</p>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={(e) =>
          setFichier(
            e.target.files?.[0] || null
          )
        }
      />

      <br />
      <br />

      <button onClick={importer}>
        Importer
      </button>

      <p>{message}</p>
    </main>
  );
}
