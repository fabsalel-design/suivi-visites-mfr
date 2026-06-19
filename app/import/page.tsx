
"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

export default function ImportPage() {
  const [message, setMessage] = useState("");
  const [fichier, setFichier] = useState<File | null>(null);

  async function importer() {
    if (!fichier) {
      setMessage("Veuillez sélectionner un fichier");
      return;
    }

    const data = await fichier.arrayBuffer();

    const workbook = XLSX.read(data);

    const feuille =
      workbook.Sheets[workbook.SheetNames[0]];

    const lignes = XLSX.utils.sheet_to_json(feuille);

    setMessage(
      `${lignes.length} lignes trouvées dans le fichier`
    );

    console.log(lignes);
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Import Excel</h1>

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
        Lire le fichier Excel
      </button>

      <p>{message}</p>
    </main>
  );
}
