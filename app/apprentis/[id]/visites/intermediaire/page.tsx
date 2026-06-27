"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
  useRef,
} from "react";

const criteres = [
  {
    key: "autonomie",
    titre: "Autonomie",
    non: "A besoin d'être accompagné dans les activités",
    encours: "Réalise la plupart des tâches seul",
    acquis: "Est totalement autonome dans son travail",
  },
  {
    key: "esprit_initiative",
    titre: "Esprit d'initiative, curiosité",
    non: "Ne prend aucune initiative, attend les consignes",
    encours: "A des idées mais demande une validation avant d'agir",
    acquis:
      "Sait prendre des initiatives dans les limites de sa compétence",
  },
  {
    key: "respect_limites",
    titre: "Connaître et respecter ses limites",
    non:
      "Ne connaît pas ses limites et peut être dangereux",
    encours:
      "Connaît ses limites mais est tenté de les dépasser",
    acquis:
      "Connaît et respecte ses limites",
  },
  {
    key: "ponctualite_assiduite",
    titre: "Ponctualité / Assiduité",
    non:
      "Retards fréquents ou absences injustifiées",
    encours:
      "Quelques retards ou absences justifiées",
    acquis:
      "Respecte ses horaires et n'a pas d'absences",
  },
  {
    key: "attitude_generale",
    titre: "Attitude générale",
    non:
      "Nonchalant ou manque de réserve",
    encours:
      "Réservé",
    acquis:
      "Ouvert et avenant",
  },
];

export default function IntermediairePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState("");
  const [formateur, setFormateur] =
    useState("");
  
const [apprenti, setApprenti] =
  useState<any>(null);

  const [loading, setLoading] =
    useState(false);
  
const [visiteId, setVisiteId] =
  useState<number | null>(null);
  
const [pdfData, setPdfData] =
  useState("");

const canvasMaitreRef =
  useRef<HTMLCanvasElement>(null);

const canvasFormateurRef =
  useRef<HTMLCanvasElement>(null);

  const [dateVisite, setDateVisite] =
    useState("");

  const [
    formationSuivie,
    setFormationSuivie,
  ] = useState("");

  const [conseils, setConseils] =
  useState("");

  const [pointsForts, setPointsForts] =
    useState("");

  const [pointsFaibles, setPointsFaibles] =
    useState("");

  const [notes, setNotes] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    async function charger() {
      const p = await params;

      setId(p.id);

      const response = await fetch(
        `/api/apprenti/${p.id}`
      );

     
if (response.ok) {
  const apprenti =
    await response.json();

  console.log(apprenti);
  
  setApprenti(apprenti);

  setFormateur(
    apprenti.formateur || ""
  );
}
``

    }

    charger();
  }, [params]);


useEffect(() => {
  function initCanvas(
    canvas: HTMLCanvasElement | null
  ) {
    if (!canvas) return;

    const ctx =
      canvas.getContext("2d");

    if (!ctx) return;

    let drawing = false;

    const start = (
      e: MouseEvent
    ) => {
      drawing = true;

      ctx.beginPath();

      ctx.moveTo(
        e.offsetX,
        e.offsetY
      );
    };

    const move = (
      e: MouseEvent
    ) => {
      if (!drawing) return;

      ctx.lineTo(
        e.offsetX,
        e.offsetY
      );

      ctx.stroke();
    };

    const end = () => {
      drawing = false;
    };

    canvas.addEventListener(
      "mousedown",
      start
    );

    canvas.addEventListener(
      "mousemove",
      move
    );

    canvas.addEventListener(
      "mouseup",
      end
    );

    return () => {
      canvas.removeEventListener(
        "mousedown",
        start
      );

      canvas.removeEventListener(
        "mousemove",
        move
      );

      canvas.removeEventListener(
        "mouseup",
        end
      );
    };
  }

  const cleanupMaitre =
    initCanvas(
      canvasMaitreRef.current
    );

  const cleanupFormateur =
    initCanvas(
      canvasFormateurRef.current
    );

  return () => {
    cleanupMaitre?.();
    cleanupFormateur?.();
  };
}, []);

  async function enregistrer() {
    try {
      setLoading(true);

const signatureMaitre =
  canvasMaitreRef.current?.toDataURL(
    "image/png"
  ) || "";
   
const signatureFormateur =
  canvasFormateurRef.current?.toDataURL(
    "image/png"
  ) || "";

console.log(
  "SIGNATURE",
  signatureMaitre
);

console.log(
  "TAILLE",
  signatureMaitre.length
);

      const response = await fetch(
       "/api/visites/intermediaire",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            apprenti_id: Number(id),

            date_visite: dateVisite,

            formation_suivie:
              formationSuivie,

            formateur_visiteur:
              formateur,
conseils,

            points_forts:
              pointsForts,

            points_faibles:
              pointsFaibles,

signature_maitre:
    signatureMaitre,

signature_formateur:
  signatureFormateur,

            interet_motivation:
              notes.interet_motivation ||
              "",

            dynamisme:
              notes.dynamisme || "",

            esprit_initiative:
              notes.esprit_initiative ||
              "",

            sens_organisation:
              notes.sens_organisation ||
              "",

            volonte_changement:
              notes.volonte_changement ||
              "",

            relations_equipe:
              notes.relations_equipe ||
              "",

            adaptation:
              notes.adaptation || "",

            presentation:
              notes.presentation || "",

            comprehension_consignes:
              notes.comprehension_consignes ||
              "",

            application_regles:
              notes.application_regles ||
              "",

            aptitudes_physiques:
              notes.aptitudes_physiques ||
              "",
          }),
        }
      );

      const result =
  await response.json();

console.log(
  "RESULTAT API :",
  result
);
     
setVisiteId(result.visite_id);
     
setPdfData(
  result.pdfData || ""
);
      
      if (!response.ok) {
        alert(
          result.error ||
            "Erreur d'enregistrement"
        );
        return;
      }

      alert(
        "✅ Visite enregistrée"
      );
    
    } catch (error) {
      alert("Erreur serveur");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "30px",
      }}
    >
      <h1
        style={{
          color: "#005CA9",
          marginBottom: "30px",
        }}
      >
      Évaluation intermédiaire
      </h1>
      
{apprenti && (
  <div
    style={{
      background: "#ffffff",
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "30px",
    }}
  >
    <p>
      <strong>Apprenti :</strong>{" "}
      {apprenti.prenom} {apprenti.nom}
    </p>

    <p>
      <strong>Entreprise :</strong>{" "}
      {apprenti.entreprise}
    </p>

    <p>
      <strong>Maître d'apprentissage :</strong>{" "}
      {apprenti.tuteur}
    </p>

    <p>
      <strong>Formateur :</strong>{" "}
      {apprenti.formateur}
    </p>
  </div>
)}

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <label>Date de la visite</label>

        <br />

        <input
          type="date"
          value={dateVisite}
          onChange={(e) =>
            setDateVisite(
              e.target.value
            )
          }
        />
      </div>

      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <label>
          Formation suivie
        </label>

        <br />

        <input
          type="text"
          value={formationSuivie}
          onChange={(e) =>
            setFormationSuivie(
              e.target.value
            )
          }
          placeholder="Ex : BAC PRO TCVA"
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "8px",
          }}
        />
      </div>

     
<table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "30px",
    backgroundColor: "white",
  }}
>
  <thead>
    <tr>
      <th
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          textAlign: "left",
        }}
      >
        Critère
      </th>

      <th
        style={{
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        Non acquise
      </th>

      <th
        style={{
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        En cours d'acquisition
      </th>

      <th
        style={{
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        Acquise
      </th>
    </tr>
  </thead>

  <tbody>
    {criteres.map((critere) => (
      <tr key={critere.key}>
        <td
          style={{
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          {critere.titre}
        </td>

        
<td
  style={{
    border: "1px solid #ccc",
    padding: "8px",
  }}
>
  <label>
    <input
      type="radio"
      name={critere.key}
      value="NON_ACQUISE"
      onChange={(e) =>
        setNotes({
          ...notes,
          [critere.key]:
            e.target.value,
        })
      }
    />{" "}
    {critere.non}
  </label>
</td>

       
<td
  style={{
    border: "1px solid #ccc",
    padding: "8px",
  }}
>
  <label>
    <input
      type="radio"
      name={critere.key}
      value="EN_COURS"
      onChange={(e) =>
        setNotes({
          ...notes,
          [critere.key]:
            e.target.value,
        })
      }
    />{" "}
    {critere.encours}
  </label>
</td>

       
<td
  style={{
    border: "1px solid #ccc",
    padding: "8px",
  }}
>
  <label>
    <input
      type="radio"
      name={critere.key}
      value="ACQUISE"
      onChange={(e) =>
        setNotes({
          ...notes,
          [critere.key]:
            e.target.value,
        })
      }
    />{" "}
    {critere.acquis}
  </label>
</td>
      </tr>
    ))}
  </tbody>
</table>

      <div>
        
<h3>
  Conseils à donner à l'apprenti(e)
  pour s'améliorer
</h3>

        <textarea
          rows={5}
          style={{
            width: "100%",
          }}
        
value={conseils}
onChange={(e) =>
  setConseils(
    e.target.value
  )
}
        />
      </div>

      <div>
        <h3>Points forts</h3>

        <textarea
          rows={4}
          style={{
            width: "100%",
          }}
          value={pointsForts}
          onChange={(e) =>
            setPointsForts(
              e.target.value
            )
          }
        />
      </div>

      <div>
        <h3>Points faibles</h3>

        <textarea
          rows={4}
          style={{
            width: "100%",
          }}
          value={pointsFaibles}
          onChange={(e) =>
            setPointsFaibles(
              e.target.value
            )
          }
        />
      </div>

<div
  style={{
    marginTop: "30px",
  }}
>
  <h3>
    Signature maître d'apprentissage
  </h3>


<canvas
  ref={canvasMaitreRef}
    width={400}
    height={150}
    style={{
      border: "1px solid #000",
      backgroundColor: "#fff",
    }}
  />

  <br />

  <button
    type="button"
    onClick={() => {
     
const canvas =
  canvasMaitreRef.current;

      if (!canvas) return;

      const ctx =
        canvas.getContext("2d");

      if (!ctx) return;

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );
    }}
  >
    Effacer la signature
  </button>
</div>

<div
  style={{
    marginTop: "30px",
  }}
>
  <h3>
    Signature Formateur CFA
  </h3>

  <canvas
    ref={canvasFormateurRef}
    width={400}
    height={150}
    style={{
      border: "1px solid #000",
      backgroundColor: "#fff",
    }}
  />

  <br />

  <button
    type="button"
    onClick={() => {
      const canvas =
        canvasFormateurRef.current;

      if (!canvas) return;

      const ctx =
        canvas.getContext("2d");

      if (!ctx) return;

      ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
      );
    }}
  >
    Effacer signature CFA
  </button>
</div>
  
<div
  style={{
    marginTop: "40px",
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  }}
>
  <button
    onClick={enregistrer}
    disabled={loading}
    style={{
      backgroundColor: "#005CA9",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    {loading
      ? "Enregistrement..."
      : "Enregistrer"}
  </button>
 
{visiteId && pdfData && (
  <button
    onClick={() => {
      const link =
        document.createElement("a");

      link.href =
        "data:application/pdf;base64," +
        pdfData;

      link.download =
        `evaluation_apprenti_${visiteId}.pdf`;

      link.click();
    }}
    style={{
      backgroundColor: "#f57c00",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    📄 Télécharger PDF
  </button>
)}

</div>

      <p
        style={{
          marginTop: "30px",
        }}
      >
        <Link
          href={`/apprentis/${id}/visites/nouvelle`}
        >
          ← Retour aux types de visite
        </Link>
      </p>
    </main>
  );
}
