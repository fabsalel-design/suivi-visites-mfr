
import Link from "next/link";
import { supabase } from "../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function FormateurPage() {
  const { data: apprentis } = await supabase
    .from("apprentis")
    .select("formateur");

  const formateurs = [
    ...new Set(
      apprentis
        ?.map((a) => a.formateur)
        .filter(Boolean)
    ),
  ].sort();

  return (
    <main
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#005CA9",
          marginBottom: "40px",
        }}
      >
        Espace Formateur
      </h1>

      <p
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Choisir un formateur
      </p>

      <div
        style={{
          display: "grid",
          gap: "12px",
        }}
      >
        {formateurs.map((formateur) => (
          <Link
            key={formateur}
            href={`/formateur/${encodeURIComponent(
              formateur
            )}`}
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              textDecoration: "none",
              textAlign: "center",
              backgroundColor: "#f5f9ff",
              color: "#005CA9",
              fontWeight: "bold",
            }}
          >
            {formateur}
          </Link>
        ))}
      </div>
    </main>
  );
}
