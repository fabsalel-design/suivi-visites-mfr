
"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

export default function ImportPage() {
  const [message, setMessage] = useState("");
  const [fichier, setFichier] = useState<File | null>(null);
  const [apprentis, setApprentis] = useState<any[]>([]);

  async function importer() {
    if (!fichier) {
      setMessage("Veuillez sélectionner un fichier");
      return;
    }

    const data = await fichier.arrayBuffer();

    const workbook = XLSX.read(data);

    const feuille =
      workbook.Sheets[workbook.SheetNames[0]];

    const lignes: any[] =
      XLSX.utils.sheet_to_json(feuille);

    const resultat = lignes
      .filter(
        (ligne) =>
          ligne["Elève Nom"] &&
          ligne["Elève Prénom"]
      )
      .map((ligne, index) => ({
        id: index + 1,
        nom: ligne["Elève Nom"],
        prenom: ligne["Elève Prénom"],
        formateur: ligne["FORMATEURS"],
        entreprise: ligne["Mds organisme"],
      }));

    setApprentis(resultat);

    setMessage(
      `${resultat.length} apprentis trouvés`
    );
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

      <hr />

      {apprentis.slice(0, 20).map((a) => (
        <div
          key={a.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <strong>
            {a.prenom} {a.nom}
          </strong>

          <p>{a.entreprise}</p>

          <p>{a.formateur}</p>
        </div>
      ))}
    </main>
  );
}
