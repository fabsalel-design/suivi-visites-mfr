
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
        <strong>Tuteur :</strong> {apprenti.tuteur}
      </p>

      <p>
        <strong>Téléphone :</strong> {apprenti.telephone}
      </p>

      <hr />

      <h3>Adresse</h3>

      <p>{apprenti.adresse}</p>

      <p>
        {apprenti.codePostal} {apprenti.ville}
      </p>

      <hr />

      <h3>Contrat</h3>

      <p>{apprenti.contrat}</p>

      <p>Du {apprenti.dateDebut}</p>

      <p>Au {apprenti.dateFin}</p>

      <hr />

      <p>
        <strong>Formateur :</strong>{" "}
        {apprenti.formateur}
      </p>

      <p>
        <strong>Statut :</strong>{" "}
        {apprenti.statut}
      </p>

      <a href="/visites">
        <button>
          Réaliser la visite
        </button>
      </a>
    </main>
  );
}
