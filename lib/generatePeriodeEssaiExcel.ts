
import * as XLSX from "xlsx";
import path from "path";

export async function generatePeriodeEssaiExcel(
  data: any
) {
  const filePath = path.join(
    process.cwd(),
    "templates",
    "evaluation_apprenti FINAL.xlsx"
  );

  const workbook = XLSX.readFile(filePath);

  const sheet =
    workbook.Sheets[
      workbook.SheetNames[0]
    ];

  // Informations générales

  sheet["B6"] = {
    t: "s",
    v: data.dateEvaluation,
  };

  sheet["F6"] = {
    t: "s",
    v: data.employeur,
  };

  sheet["B8"] = {
    t: "s",
    v: data.apprenti,
  };

  sheet["F8"] = {
    t: "s",
    v: data.formation,
  };

  sheet["B10"] = {
    t: "s",
    v: data.formateur,
  };

  sheet["F10"] = {
    t: "s",
    v: data.maitreApprentissage,
  };

  // Commentaires

  sheet["B25"] = {
    t: "s",
    v: data.observations,
  };

  sheet["B27"] = {
    t: "s",
    v: data.pointsForts,
  };

  sheet["B30"] = {
    t: "s",
    v: data.pointsFaibles,
  };

  // Critères

  remplirCritere(
    sheet,
    data.interet_motivation,
    13
  );

  remplirCritere(
    sheet,
    data.dynamisme,
    14
  );

  remplirCritere(
    sheet,
    data.esprit_initiative,
    15
  );

  remplirCritere(
    sheet,
    data.sens_organisation,
    16
  );

  remplirCritere(
    sheet,
    data.volonte_changement,
    17
  );

  remplirCritere(
    sheet,
    data.relations_equipe,
    18
  );

  remplirCritere(
    sheet,
    data.adaptation,
    19
  );

  remplirCritere(
    sheet,
    data.presentation,
    20
  );

  remplirCritere(
    sheet,
    data.comprehension_consignes,
    21
  );

  remplirCritere(
    sheet,
    data.application_regles,
    22
  );

  remplirCritere(
    sheet,
    data.aptitudes_physiques,
    23
  );

  return workbook;
}

function remplirCritere(
  sheet: any,
  valeur: string,
  ligne: number
) {
  if (
    valeur === "NON_ACQUISE"
  ) {
    sheet[`D${ligne}`] = {
      t: "s",
      v: "X",
    };
  }

  if (
    valeur === "EN_COURS"
  ) {
    sheet[`F${ligne}`] = {
      t: "s",
      v: "X",
    };
  }

  if (
    valeur === "ACQUISE"
  ) {
    sheet[`H${ligne}`] = {
      t: "s",
      v: "X",
    };
  }
}
