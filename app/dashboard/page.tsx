import Link from "next/link";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { data: apprentis, error } = await supabase
    .from("apprentis")
    .select("*");

const apprentisUniques = [
  ...new Map(
    (apprentis || []).map((a) => [
      a.gestibase_id ||
        `${a.nom}-${a.prenom}`,
      a,
    ])
  ).values(),
];

const totalApprentis =
  apprentisUniques.length;

const entreprises = [
  ...new Set(
    (apprentis || [])
      .map((a) => a.entreprise)
      .filter(Boolean)
  ),
];

const formateurs = [
  ...new Set(
    (apprentis || [])
      .map((a) => a.formateur)
      .filter(Boolean)
      .filter(
        (f) => f !== "Non affecté"
      )
  ),
];


const visitesRealisees =
  apprentisUniques.filter(
    (a) =>
      a.statut?.trim() ===
      "Terminée"
  ).length;

const visitesRestantes =
  totalApprentis -
  visitesRealisees;

const avancement =
  totalApprentis > 0
    ? Math.round(
        (visitesRealisees /
          totalApprentis) *
          100
      )
    : 0;

const sansFormateur =
  apprentisUniques.filter(
    (a) =>
      !a.formateur ||
      a.formateur === "Non affecté"
  ).length;

const priorites = [];

if (sansFormateur > 0) {
  priorites.push(
    `⚠️ ${sansFormateur} apprenant(s) sans formateur`
  );
} else {
  priorites.push(
    "✅ Tous les apprenants sont affectés"
  );
}

if (visitesRestantes > 0) {
  priorites.push(
    `📅 ${visitesRestantes} visite(s) à réaliser`
  );
}

priorites.push(
  `🏢 ${entreprises.length} entreprises à suivre`
);


return (
  <main
    style={{
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "30px",
      backgroundColor: "#f5f7fa",
      minHeight: "100vh",
    }}
  >
    <div style={{ marginBottom: "30px" }}>
      <h1
        style={{
          color: "#005CA9",
          marginBottom: "5px",
        }}
      >
        Bonjour Fabrice 👋
      </h1>

      <p
        style={{
          color: "#666",
          margin: 0,
        }}
      >
        Centre de pilotage des visites supérieur
      </p>
    </div>

  
{error && (
  <p>Erreur : {error.message}</p>
)}
<div
2
style={{
3
background:
4
sansFormateur > 0
5
? "#fff7ed"
6
: "#ecfdf5",
7
border:
8
sansFormateur > 0
9
? "2px solid #f59e0b"
10
: "2px solid #10b981",
11
borderRadius: "12px",
12
padding: "20px",
13
marginBottom: "30px",
14
}}
15
>
16
<h2
17
style={{
18
marginTop: 0,
19
color:
20
sansFormateur > 0
21
? "#d97706"
22
: "#047857",
23
}}
24
>
25
{sansFormateur > 0
26
? "⚠️ Action requise"
27
: "✅ Situation sous contrôle"}
28
</h2>
29
 
30
{sansFormateur > 0 ? (
31
<p>
32
<strong>
33
{sansFormateur}
34
</strong>{" "}
35
apprenant(s) restent à
36
affecter à un formateur.
37
</p>
38
) : (
39
<p>
40
Tous les apprenants sont
41
affectés.
42
</p>
43
)}
44
</div>

<div
  style={{
    display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ color: "#666" }}>
          👨‍🎓 Apprentis
        </div>
        <div
          style={{
            fontSize: "42px",
            fontWeight: "bold",
            color: "#005CA9",
          }}
        >
          {totalApprentis}
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ color: "#666" }}>
          🏢 Entreprises
        </div>
        <div
          style={{
            fontSize: "42px",
            fontWeight: "bold",
            color: "#005CA9",
          }}
        >
          {entreprises.length}
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ color: "#666" }}>
          👥 Formateurs
        </div>
        <div
          style={{
            fontSize: "42px",
            fontWeight: "bold",
            color: "#005CA9",
          }}
        >
          {formateurs.length}
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ color: "#666" }}>
       ⚠️ Non affectés
        </div>
        <div
          style={{
            fontSize: "42px",
            fontWeight: "bold",
            
color:
  sansFormateur > 0
    ? "#f57c00"
    : "#2e7d32",

          }}
        >
         {sansFormateur}
        </div>
      </div>
    </div>

  
<div
  style={{
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "30px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
  }}
>
  <h2
    style={{
      marginTop: 0,
      color: "#005CA9",
    }}
  >
    🎯 Priorités du jour
  </h2>

  {priorites.map(
    (priorite, index) => (
      <p
        key={index}
        style={{
          margin: "10px 0",
          fontSize: "16px",
        }}
      >
        {priorite}
      </p>
    )
  )}
</div>

<div
  style={{
    background: "white",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "30px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.08)",
  }}
>
  <h2
    style={{
      marginTop: 0,
      color: "#005CA9",
    }}
  >
    🚀 Actions rapides
  </h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
        }}
      >
        <button
          style={{
            backgroundColor: "#005CA9",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          📥 Import Gestibase
        </button>

      
<Link
  href="/dashboard/affectations"
  style={{
    backgroundColor: "#005CA9",
    color: "white",
    padding: "12px 18px",
    borderRadius: "10px",
    fontWeight: "bold",
    textDecoration: "none",
    display: "inline-block",
  }}
>
  👥 Affectations
</Link>

        <button
          style={{
            backgroundColor: "#005CA9",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          🗺️ Cartographie
        </button>

        <button
          style={{
            backgroundColor: "#005CA9",
            color: "white",
            border: "none",
            padding: "12px 18px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          📝 Suivi visites
        </button>
      </div>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "2fr 1fr",
        gap: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            color: "#005CA9",
            marginTop: 0,
          }}
        >
          👥 Répartition des formateurs
        </h2>

       
{formateurs.map((formateur) => {
  const count =
    apprentis?.filter(
      (a) =>
        a.formateur === formateur
    ).length || 0;

  const maxCount = Math.max(
    ...(formateurs.map(
      (f) =>
        apprentis?.filter(
          (a) =>
            a.formateur === f
        ).length || 0
    ))
  );

  const largeur =
    maxCount > 0
      ? (count / maxCount) * 100
      : 0;

  return (
    <div
      key={formateur}
      style={{
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          marginBottom: "6px",
        }}
      >
        <strong>
          {formateur}
        </strong>

        <strong>
          {count}
        </strong>
      </div>

      <div
        style={{
          height: "12px",
          borderRadius: "999px",
          background: "#e5e7eb",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${largeur}%`,
            height: "100%",
            background:
              "#005CA9",
          }}
        />
      </div>
    </div>
  );
})}

      </div>

      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            color: "#005CA9",
            marginTop: 0,
          }}
        >
          ⚠️ Alertes
        </h2>

        <p>
          Contrats terminés : <strong>0</strong>
        </p>

        <p>
          Sans formateur : <strong>0</strong>
        </p>

        <p>
          Visites en retard : <strong>0</strong>
        </p>

        <hr />

        <p>
          Avancement global :
          <strong> {avancement}%</strong>
        </p>

        <p>
          Visites réalisées :
          <strong> {visitesRealisees}</strong>
        </p>
      </div>
    </div>
  </main>
);
}
