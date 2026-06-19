import { apprentis } from "../../data/apprentis";
const resultat = apprentis.filter((a) =>
  `${a.nom} ${a.prenom}`
    .toLowerCase()
    .includes(recherche.toLowerCase())

