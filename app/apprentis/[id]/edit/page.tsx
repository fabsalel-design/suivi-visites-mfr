
import Link from "next/link";

export default async function EditApprentiPage({
  params,
}: {
  params: Promise    <main style={{ padding: "40px" }}>  params: Promise<{ id: string }>;
      <h1>Édition apprenti</h1>

      <p>ID : {id}</p>

      <p>
        Cette page servira à modifier les
        informations de l'apprenti.
      </p>

      <Link href="/apprentis">
        Retour aux apprentis
      </Link>
    </main>
  );
}
``
}) {
  const { id } = await params;

  return (
