
import Link from "next/link";

export default async function VisitesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main style={{ padding: "40px" }}>
      <h1>Historique des visites</h1>

      <p>Apprenti ID : {id}</p>

      <hr />

      <p>
        <button>
          Nouvelle visite
        </button>
      </p>

      <hr />

      <Link href={`/apprentis/${id}/edit`}>
        Retour à la fiche apprenti
      </Link>
    </main>
  );
}
