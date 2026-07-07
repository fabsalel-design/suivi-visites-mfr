import Link from "next/link";
import { supabase } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function AffectationsPage() {
  const { data: apprentis } = await supabase
    .from("apprentis")
    .select("*")
    .order("ville_reelle")
    .order("nom");

  const villes =
    apprentis?.reduce(
      (acc: any, apprenti: any) => {
        const ville =
          apprenti.ville_reelle
            ? `${apprenti.ville_reelle} (${String(
                apprenti.code_postal_reel || ""
              ).substring(0, 2)})`
            : "Ville non renseignée";

        if (!acc[ville]) {
          acc[ville] = [];
        }

        acc[ville].push(apprenti);

        return acc;
      },
      {}
    ) || {};

  function regrouperParEntreprise(
    liste: any[]
  ) {
    return liste.reduce(
      (acc: any, apprenti: any) => {
        const entreprise =
          apprenti.entreprise ||
          "Entreprise non renseignée";

        if (!acc[entreprise]) {
          acc[entreprise] = [];
        }

        acc[entreprise].push(apprenti);

        return acc;
      },
      {}
    );
  }

  function getFormateursVille(
    liste: any[]
  ) {
    const compteur: Record<string, number> = {};

    liste.forEach((a) => {
      const formateur =
        a.formateur || "Non affecté";

      compteur[formateur] =
        (compteur[formateur] || 0) + 1;
    });

    return Object.entries(compteur);
  }

  function formatDate(
    date: string | null
  ) {
    if (!date) return "";

    return new Date(date).toLocaleDateString(
      "fr-FR"
    );
  }

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "30px",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          color: "#005CA9",
        }}
      >
        👥 Affectations formateurs
      </h1>

      <p>
        Gestion des affectations des apprenants
      </p>

      {Object.entries(villes).map(
        ([ville, liste]: any) => (
          <div
            key={ville}
            style={{
              marginBottom: "40px",
            }}
          >
            <h2
              style={{
                color: "#005CA9",
                marginBottom: "15px",
              }}
            >
              📍 {ville} - {liste.length} apprenant(s)
            </h2>

            <div
              style={{
                background: "#eef5fb",
                padding: "15px",
                borderRadius: "12px",
                marginBottom: "20px",
              }}
            >
              <strong>
                👨‍🏫 Formateurs présents
              </strong>

              {getFormateursVille(
                liste
              ).map(
                ([nom, nombre]) => (
                  <div key={String(nom)}>
                    {nom} ({String(nombre)})
                  </div>
                )
              )}
            </div>

            {Object.entries(
              regrouperParEntreprise(liste)
            ).map(
              (
                [entreprise, apprenants]: any
              ) => (
                <div
                  key={entreprise}
                  style={{
                    background:
                      "white",
                    padding: "20px",
                    borderRadius:
                      "12px",
                    marginBottom:
                      "20px",
                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  <h3
                    style={{
                      color: "#005CA9",
                      marginTop: 0,
                    }}
                  >
                    🏢 {entreprise}
                  </h3>

<p
  style={{
    color: "#666",
    fontSize: "14px",
  }}
>
  📍 {ville}
</p>

                 
<p>
  👨‍🎓 {
    new Set(
      apprenants.map(
        (a: any) =>
          a.gestibase_id ||
          `${a.nom}-${a.prenom}`
      )
    ).size
  } apprenant(s)
</p>

<p>
  📄 {apprenants.length} période(s)
</p>


                 
<p
  style={{
    fontWeight: "bold",
    color:
      apprenants[0]?.formateur
        ? "#333"
        : "#d97706",
    background:
      apprenants[0]?.formateur
        ? "transparent"
        : "#fff7ed",
    padding:
      apprenants[0]?.formateur
        ? "0"
        : "10px",
    borderRadius: "8px",
  }}
>

                    👨‍🏫{" "}
                    {apprenants[0]
                      ?.formateur ||
                      "⚠️ Non affecté"}
                  </p>


<Link
  href={`/dashboard/${encodeURIComponent(Color: "#005CA9",
    color: "white",
    padding: "8px 12px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    marginBottom: "15px",
  }}
>
  ✏️ Affecter
</Link>







                  <ul>
                    {apprenants.map(
                      (a: any) => (
                        <li
                          key={a.id}
                          style={{
                            marginBottom:
                              "10px",
                          }}
                        >
                          <strong>
                            {a.prenom}{" "}
                            {a.nom}
                          </strong>

                          <br />

                          📅{" "}
                          {formatDate(
                            a.date_debut
                          )}{" "}
                          →{" "}
                          {formatDate(
                            a.date_fin
                          )}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )
            )}
          </div>
        )
      )}
    </main>
  );
}
