
export default async function AffectationEntreprisePage({
  params,
}: {
  params: Promise<{
    entreprise: string;
  }>;
}) {
  const { entreprise } = await params;

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "30px",
      }}
    >
      <h1>
        🏢 {decodeURIComponent(
          entreprise
        )}
      </h1>

      <p>
        Gestion de l'affectation des
        formateurs
      </p>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        🚧 Affectation en cours de
        développement
      </div>
    </main>
  );
}
