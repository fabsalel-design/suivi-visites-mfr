
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

  const entreprisesMap = new Map();

  apprentis?.forEach((apprenti) => {
    const entreprise = apprenti.entreprise;

    if (!entreprise) return;

    if (!entreprisesMap.has(entreprise)) {
      entreprisesMap.set(entreprise, []);
    }

    entreprisesMap.get(entreprise).push(apprenti);
  });

  const entreprises = Array.from(
    entreprisesMap.entries()
  ).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  return (
    <main style={{ padding: "40px" }}>
      <h1>Entreprises</h1>

      <p>
        Nombre d'entreprises : {entreprises.length}
      </p>

      <hr />

      {entreprises.map(([nom, liste]) => (
        <div
          key={nom}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <Link
            href={`/entreprises/${encodeURIComponent(
              nom
            )}`}
          >
            <h2>{nom}</h2>
          </Link>

          <p>
            Apprentis : {liste.length}
          </p>

          <ul>
            {liste.map((apprenti: any) => (
              <li key={apprenti.id}>
                {apprenti.prenom} {apprenti.nom}
                {" - "}
                {apprenti.formateur}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
``
