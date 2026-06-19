
import { apprentis } from "../../data/apprentis";

export default function EntreprisesPage() {
  const entreprisesMap = new Map();

  apprentis.forEach((apprenti) => {
    const entreprise = apprenti.entreprise;

    if (!entreprisesMap.has(entreprise)) {
      entreprisesMap.set(entreprise, []);
    }

    entreprisesMap.get(entreprise).push(apprenti);
  });

  const entreprises = Array.from(
    entreprisesMap.entries()
  );

  return (
    <main style={{ padding: "40px" }}>
      <h1>Entreprises</h1>

      <p>
        Nombre d'entreprises :
        {" "}
        {entreprises.length}
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
         
<a
  href={`/entreprises/${encodeURIComponent(
    nom
  )}`}
>
  <h2>{nom}</h2>
</a>

          <p>
            Apprentis :
            {" "}
            {(liste as any[]).length}
          </p>

          <ul>
            {(liste as any[]).map((apprenti) => (
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
