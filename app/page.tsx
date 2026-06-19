import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Suivi des visites MFR</h1>

      <p>Application de suivi des visites entreprises</p>

      <hr />

      <h2>Menu principal</h2>

      <ul>
        <li>
          <Link href="/dashboard">
            Dashboard Coordinateur
          </Link>
        </li>

        <li>
          <Link href="/apprentis">
            Liste des Apprentis
          </Link>
        </li>

        <li>
          <Link href="/import">
            Import Excel
          </Link>
        </li>

        <li>
          <Link href="/visites">
            Nouvelle Visite
          </Link>
        </li>

        <li>
          <Link href="/signatures">
            Signatures
          </Link>
        </li>

        <li>
          <Link href="/pdf">
            PDF
          </Link>
        </li>
        
<Link href="/entreprises">
            Entreprises
          </Link>
        </li>

      </ul>
    </main>
  );
}
