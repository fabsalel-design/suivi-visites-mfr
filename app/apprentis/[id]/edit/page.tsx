
import Link from "next/link";
import { supabase } from "../../../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function EditApprentiPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: apprenti, error } = await supabase
    .from("apprentis")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !apprenti) {
    return (
      <main style={{ padding: "40px" }}>
        <h1>Apprenti introuvable</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px" }}>
      <h1>
        {apprenti.prenom} {apprenti.nom}
      </h1>

      <p>
        <strong>Entreprise :</strong>{" "}
        {apprenti.entreprise}
      </p>

      <p>
        <strong>Formateur :</strong>{" "}
        {apprenti.formateur}
      </p>

      <p>
        <strong>Tuteur :</strong>{" "}
        {apprenti.tuteur}
      </p>

      <p>
        <strong>Téléphone :</strong>{" "}
        {apprenti.telephone}
      </p>

      <p>
        <strong>Statut :</strong>{" "}
        {apprenti.statut}
      </p>

      <p>
        <strong>Adresse :</strong>
      </p>

      <p>{apprenti.adresse_reelle}</p>

      <p>
        {apprenti.code_postal_reel}{" "}
        {apprenti.ville_reelle}
      </p>

      <hr />

      <p>
        <a href={`/apprentis/${id}/visites`}>
          Voir les visites
        </a>
      </p>

      <Link href="/apprentis">
        Retour aux apprentis
      </Link>
    </main>
  );
}
