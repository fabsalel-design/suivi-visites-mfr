
"use client";

import { useState } from "react";
import { apprentis } from "../../data/apprentis";

export default function ApprentisPage() {
  const [recherche, setRecherche] = useState("");

  const resultat = apprentis.filter((a) =>
    `${a.nom} ${a.prenom}`
      .toLowerCase()
      .includes(recherche.toLowerCase())
  );

  return (
    <main style={{ padding: "40px" }}>
      <h1>Liste des apprentis</h1>

      <input
        type="text"
        placeholder="Rechercher un apprenti"
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px",
        }}
      />

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
            <strong>Entreprise :</strong> {apprenti.entreprise}
          </p>

          <p>
            <strong>Formateur :</strong> {apprenti.formateur}
          </p>

          <p>
            <strong>Statut :</strong> {apprenti.statut}
          </p>

          <button>
            Ouvrir la fiche
          </button>
        </div>
      ))}
    </main>
  );
}
