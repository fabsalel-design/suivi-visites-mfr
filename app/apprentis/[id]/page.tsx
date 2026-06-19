
import { apprentis } from "../../../data/apprentis";

export default async function FicheApprenti({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const apprenti = apprentis.find(
    (a) => a.id === Number(id)
  );

  if (!apprenti) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Apprenti introuvable</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>Fiche apprenti</h1>

      <h2>
        {apprenti.prenom} {apprenti.nom}
      </h2>

      <hr />

      <h3>Entreprise</h3>

      <p>{apprenti.entreprise}</p>

      <p>
        Formateur : {apprenti.formateur}
      </p>

      <p>
        Statut : {apprenti.statut}
      </p>

      <hr />

      <h3>Historique</h3>

      <ul>
        <li>S2 2026 - À faire</li>
      </ul>

      <a href="/visites">
        <button>
          Réaliser la visite
        </button>
      </a>
    </main>
  );
}
