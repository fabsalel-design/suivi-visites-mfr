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

    const lignes: any[] =
      XLSX.utils.sheet_to_json(feuille);

function excelDateToISO(excelDate: any) {
  if (!excelDate) return null;

  if (typeof excelDate === "number") {
    const date = XLSX.SSF.parse_date_code(excelDate);

    return `${date.y}-${String(date.m).padStart(2, "0")}-${String(date.d).padStart(2, "0")}`;
  }

  return excelDate;
}
    
const apprentis = lignes
  .filter(
    (ligne) =>
      ligne["Elève Nom"] &&
      ligne["Elève Prénom"]
  )
  .map((ligne) => ({
    nom: ligne["Elève Nom"] || "",
    prenom: ligne["Elève Prénom"] || "",

    entreprise:
      ligne["Mds organisme"] || "",

    formateur:
      ligne["FORMATEURS"] || "",

    statut: "A faire",

    tuteur:
      `${ligne["Mds prénom"] || ""} ${
        ligne["Mds nom"] || ""
      }`.trim(),

    telephone:
      ligne["Portable 1"] ||
      ligne["Téléphone 1"] ||
      "",

    adresse_reelle:
      ligne["Mds adresse 1"] || "",

    code_postal_reel:
      ligne["Mds code postal"] || "",

    ville_reelle:
      ligne["Mds ville"] || "",

gestibase_id:
  ligne["Elève ID"] || null,

contrat:
  ligne["Contrat type contrat"] || "",

date_debut:
  ligne["Contrat date début"] || null,

date_fin:
  ligne["Contrat date fin"] || null,
    
  }));

    const response = await fetch(
      "/api/import-supabase",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(apprentis),
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
      `${resultat.total} apprentis importés dans PostgreSQL`
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
        Importer dans PostgreSQL
      </button>

      <p>{message}</p>
    </main>
  );
}
