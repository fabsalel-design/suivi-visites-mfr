
"use client";

import { useState } from "react";

export default function ApprentisPage() {
  const [recherche, setRecherche] = useState("");

  const apprentis = [
    {
      id: 1,
      nom: "ALARCO",
      prenom: "Mateo",
      entreprise: "BRICOMARCHE",
      formateur: "FABRICE",
      statut: "A faire",
    },
    {
      id: 2,
      nom: "AUSSEL",
      prenom: "Nathan",
      entreprise: "MAISON OLIVIER",
      formateur: "FABRICE",
      statut: "A faire",
    },
    {
      id: 3,
      nom: "BODIN",
      prenom: "Mathieu",
      entreprise: "TRUFFAUT",
      formateur: "CHRISTINE",
      statut: "Réalisée",
    },
  ];

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

          <p>Entreprise : {apprenti.entreprise}</p>

          <p>Formateur : {apprenti.formateur}</p>

          <p>Statut : {apprenti.statut}</p>

          <button>Ouvrir la fiche</button>
        </div>
      ))}
    </main>
  );
}
