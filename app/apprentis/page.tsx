"use client";

import { useState } from "react";
import { apprentis } from "../../data/apprentis";

export default function ApprentisPage() {
  const [recherche, setRecherche] = useState("");
  const [formateur, setFormateur] = useState("TOUS");

  const resultat = apprentis.filter((a) => {
    const matchNom = `${a.nom} ${a.prenom}`
      .toLowerCase()
      .includes(recherche.toLowerCase());

    const matchFormateur =
      formateur === "TOUS" ||
      a.formateur === formateur;

    return matchNom && matchFormateur;
  });

  return (
    <main style={{ padding: "40px" }}>
      <h1>Liste des apprentis</h1>

      <p>
        Nombre d'apprentis : {resultat.length}
      </p>

      <input
        type="text"
        placeholder="Rechercher un apprenti"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginRight: "20px",
        }}
      />

      <select
        value={formateur}
        onChange={(e) =>
          setFormateur(e.target.value)
        }
      >
        <option value="TOUS">Tous</option>
        <option value="FABRICE">FABRICE</option>
        <option value="DAVID">DAVID</option>
        <option value="CHRISTINE">CHRISTINE</option>
      </select>

      <hr />

      {resultat.map((apprenti) => (
        <div
          key={apprenti.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>
            {apprenti.nom} {apprenti.prenom}
          </h3>

          <p>
            <strong>Entreprise :</strong>{" "}
            {apprenti.entreprise}
          </p>

          <p>
            <strong>Formateur :</strong>{" "}
            {apprenti.formateur}
          </p>

          <p>
            <strong>Statut :</strong>{" "}
            {apprenti.statut}
          </p>

          <a href={`/apprentis/${apprenti.id}`}>
            <button>
              Ouvrir la fiche
            </button>
          </a>
        </div>
      ))}
    </main>
  );
}
