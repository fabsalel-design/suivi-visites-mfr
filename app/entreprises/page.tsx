
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function EntreprisesPage() {
  const { data: apprentis, error } = await supabase
    .from("apprentis")
    .select("*");

  if (error) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Erreur</h1>
        <p>{error.message}</p>
      </main>
    );
  }

  const etablissementsMap = new Map();

  apprentis?.forEach((apprenti) => {
    const cle = [
      apprenti.entreprise,
      apprenti.adresse_reelle,
      apprenti.code_postal_reel,
      apprenti.ville_reelle,
    ].join("|");

    if (!etablissementsMap.has(cle)) {
      etablissementsMap.set(cle, []);
    }

    etablissementsMap.get(cle).push(apprenti);
  });

  const etablissements = Array.from(
    etablissementsMap.entries()
  ).sort((a, b) =>
    a[1][0].entreprise.localeCompare(
      b[1][0].entreprise
    )
  );

  return (
    <main style={{ padding: "40px" }}>
      <h1>Établissements</h1>

      <p>
        Nombre d'établissements :
        {" "}
        {etablissements.length}
      </p>

      <hr />

      {etablissements.map(([cle, liste]) => {
        const premier = liste[0];

        return (
          <div
            key={cle}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <Link
              href={`/entreprises/${encodeURIComponent(
                premier.entreprise
              )}`}
            >
              <h2>{premier.entreprise}</h2>
            </Link>

            <p>{premier.adresse_reelle}</p>

            <p>
              {premier.code_postal_reel}
              {" "}
              {premier.ville_reelle}
            </p>

            <p>
              Apprentis :
              {" "}
              {liste.length}
            </p>

            <ul>
              {liste.map((apprenti: any) => (
                <li key={apprenti.id}>
                  {apprenti.prenom}
                  {" "}
                  {apprenti.nom}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </main>
  );
}
