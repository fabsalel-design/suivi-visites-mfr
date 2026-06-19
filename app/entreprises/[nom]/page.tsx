
import { apprentis } from "../../../data/apprentis";

export default async function EntreprisePage({
  params,
}: {
  params: Promise<{ nom: string }>;
}) {
  const { nom } = await params;

  const entrepriseNom = decodeURIComponent(nom);

  const liste = apprentis.filter(
    (a) => a.entreprise === entrepriseNom
  );

  if (liste.length === 0) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Entreprise introuvable</h1>
      </main>
    );
  }

  const premier = liste[0];

  return (
    <main style={{ padding: "40px" }}>
      <h1>{entrepriseNom}</h1>

      <p>
        <strong>Adresse :</strong>
      </p>

      <p>{premier.adresseReelle}</p>

      <p>
        {premier.codePostalReel} {premier.villeReelle}
      </p>

      <hr />

      <h2>Apprentis</h2>

      <ul>
        {liste.map((apprenti) => (
          <li key={apprenti.id}>
            {apprenti.prenom} {apprenti.nom}
          </li>
        ))}
      </ul>
    </main>
  );
}
