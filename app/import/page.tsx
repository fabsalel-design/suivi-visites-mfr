
"use client";

import { useState } from "react";

export default function ImportPage() {
  const [message, setMessage] = useState("");

  async function importer() {
    const response = await fetch("/api/import", {
      method: "POST",
    });

    const result = await response.json();

    setMessage(result.message);
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Import Excel</h1>

      <p>
        Import du fichier semestriel
      </p>

      <button onClick={importer}>
        Tester l'import
      </button>

      <p>{message}</p>
    </main>
  );
}
