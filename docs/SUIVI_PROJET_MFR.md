
# SUIVI PROJET MFR

## Informations générales

Projet : Application de suivi des apprentis MFR

Technologies :

- Next.js
- TypeScript
- Supabase
- Vercel
- PDF-lib

Objectifs :

- Gestion des apprentis
- Gestion des visites
- Génération PDF automatisée
- Signatures électroniques
- Archivage des visites

---

# État du projet

## Apprentis

✅ Création des fiches apprentis

✅ Consultation des fiches

✅ Liaison entreprise / tuteur / formateur

---

## Visites

✅ Sélection du type de visite

✅ Création des visites

✅ Enregistrement en base Supabase

✅ Historisation

---

# Évaluation de fin de période d'essai

## Statut

✅ TERMINÉE

## Fonctionnalités validées

✅ Saisie de la visite

✅ Enregistrement Supabase

✅ Évaluations par compétences

✅ Croix automatiques dans le PDF

✅ Génération PDF

✅ Téléchargement PDF

✅ Observations générales

✅ Points forts

✅ Points faibles

✅ Retour à la ligne automatique

✅ Signature maître d'apprentissage

✅ Signature visible dans le PDF

---

# Fichiers principaux

## Frontend

app/apprentis/[id]/visites/periode-essai/page.tsx

Contient :

- formulaire de visite
- canvas de signature
- génération de la signature Base64
- appel API

---

## API

app/api/visites/periode-essai/route.ts

Contient :

- réception des données
- insertion Supabase
- génération Excel
- génération PDF

---

## PDF

lib/generatePeriodeEssaiPdf.ts

Contient :

- positionnement entête
- positionnement croix
- gestion observations
- gestion signature

---

# Base de données

## Table visites

Utilisée pour le stockage général des visites.

---

## Table visites_periode_essai

Colonnes principales :

- visite_id
- formation_suivie
- observations
- points_forts
- points_faibles

Critères :

- interet_motivation
- dynamisme
- esprit_initiative
- sens_organisation
- volonte_changement
- relations_equipe
- adaptation
- presentation
- comprehension_consignes
- application_regles
- aptitudes_physiques

Signature :

- signature_maitre (text)

Format stocké :

data:image/png;base64,...

---

# PDF période d'essai

## Modèle

templates/evaluation_apprenti FINAL.pdf

---

# Coordonnées validées de l'entête

```ts
page.drawText(data.dateEvaluation || "", {
  x: 105,
  y: 642,
  size: 10,
});

page.drawText(data.employeur || "", {
  x: 390,
  y: 642,
  size: 10,
});

page.drawText(data.apprenti || "", {
  x: 95,
  y: 613,
  size: 10,
});

page.drawText(data.formation || "", {
  x: 365,
  y: 613,
  size: 10,
});

page.drawText(data.formateur || "", {
  x: 100,
  y: 585,
  size: 10,
});

page.drawText(data.maitreApprentissage || "", {
  x: 420,
  y: 585,
  size: 10,
});
```

---

# Positionnement compétences

```ts
const X_NON_ACQUISE = 265;
const X_EN_COURS = 410;
const X_ACQUISE = 550;
```

Coordonnées verticales validées dans generatePeriodeEssaiPdf.ts.

---

# Commentaires PDF

```ts
drawMultilineText(
  page,
  data.observations || "",
  120,
  230
);

drawMultilineText(
  page,
  data.pointsForts || "",
  120,
  195
);

drawMultilineText(
  page,
  data.pointsFaibles || "",
  120,
  145
);
```

---

# Signature maître d'apprentissage

## Front

Canvas HTML natif

Référence :

```ts
const canvasRef =
  useRef<HTMLCanvasElement>(null);
```

Conversion :

```ts
const signatureMaitre =
  canvasRef.current?.toDataURL(
    "image/png"
  ) || "";
```

Envoi API :

```ts
signature_maitre:
  signatureMaitre
```

---

# Signature PDF

Position validée :

```ts
page.drawImage(
  signatureImage,
  {
    x: 430,
    y: 175,
    width: 120,
    height: 50,
  }
);
```

Statut :

✅ Fonctionnelle

---

# Fonction utilitaire

## Retour à la ligne automatique

Fonction :

```ts
drawMultilineText()
```

Statut :

✅ Fonctionnelle

---

# Sauvegardes importantes

Fichiers critiques :

- generatePeriodeEssaiPdf.ts
- route.ts période essai
- page.tsx période essai
- evaluation_apprenti FINAL.pdf

---

# Prochaine étape

## Signature CFA

À développer

### Base de données

Ajouter :

```sql
signature_formateur text
```

### Front

Ajouter :

- Canvas signature CFA

### API

Ajouter :

```ts
signature_formateur
```

### PDF

Insérer la signature dans :

Visa CFA

---

# État global du projet

## Terminé

✅ Gestion apprentis

✅ Visite période d'essai

✅ PDF période d'essai

✅ Signature maître d'apprentissage

## En cours

🟡 Signature CFA

## À venir

🔲 Historique des visites

🔲 Autres modèles de visites

🔲 Tableau de bord

🔲 Statistiques


✅ Visite période d'essai terminée

✅ Visite intermédiaire terminée

Modules opérationnels :

- Formulaire
- Enregistrement Supabase
- Génération PDF
- Signatures
- Archivage des visites


# ÉTAT DU PROJET - VERSION STABLE

Date : 04/07/2026

## Module Formateur

Fonctionnel.

### Dashboard

- KPI Apprentis
- KPI Visites réalisées
- KPI Entreprises
- Liste des apprentis
- Historique des visites
- Nouvelle visite
- Google Maps par apprenti

### Carte

Route :

/formateur/[nom]/carte

Fonctionnalités :

- OpenStreetMap
- React Leaflet
- Géocodage automatique Nominatim
- Zoom automatique
- Popup entreprise
- Apprentis affichés dans les popups
- Marqueurs personnalisés 📍

### Fichiers créés

components/FormateurMap.tsx

### Bibliothèques ajoutées

- leaflet
- react-leaflet
- @types/leaflet

### Prochaine étape prioritaire

Intégrer une mini-carte dans le dashboard formateur.

Objectif :

Dashboard
↓
KPI
↓
Mini-carte portefeuille
↓
Liste apprentis

Conserver la page /carte comme version plein écran.

## PROCHAINE SESSION

1. Intégrer la mini-carte dans le dashboard formateur.
2. Conserver le bouton "🗺️ Ouvrir la carte complète".
3. Réutiliser le composant FormateurMap existant.
4. Afficher les vraies entreprises du formateur sur la mini-carte.


# SUIVI PROJET MFR

## État actuel

### Formulaires

Les trois formulaires suivants sont opérationnels :

- Période d'essai
- Intermédiaire
- Fin de formation

Chaque formulaire possède désormais un bouton :

🏠 Retour au tableau de bord

Destination :

href={`/formateur/${apprenti?.formateur}`}

Build validé.

---

## Nouvelle visite

Fichier :

app/apprentis/[id]/visites/nouvelle/page.tsx

État actuel :

Le bouton de retour renvoie vers :

href={`/apprentis/${id}/visites`}

c'est-à-dire :

Historique des visites.

Build validé.

---

## Amélioration à prévoir

Objectif :

Depuis NouvelleVisitePage, revenir directement au tableau de bord du formateur.

Problème :

La page ne possède pas la variable :

apprenti.formateur

Solution envisagée :

Récupérer l'apprenti à partir de l'id :

const { data: apprenti } =
  await supabase
    .from("apprentis")
    .select("*")
    .eq("id", id)
    .single();

Puis :

href={`/formateur/${apprenti.formateur}`}

Statut :

À étudier ultérieurement.

Aucune modification en attente critique.

Projet actuellement stable.

