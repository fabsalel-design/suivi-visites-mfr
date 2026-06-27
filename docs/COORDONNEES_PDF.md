
# COORDONNEES PDF MFR

## Projet

Application de suivi des visites MFR

Modèle PDF :

```text
templates/evaluation_apprenti FINAL.pdf
```

---

# Entête

## Date évaluation

```ts
x: 105
y: 642
```

---

## Employeur

```ts
x: 390
y: 642
```

---

## Apprenti

```ts
x: 95
y: 613
```

---

## Formation suivie

```ts
x: 365
y: 613
```

---

## Formateur

```ts
x: 100
y: 585
```

---

## Maître d'apprentissage

```ts
x: 420
y: 585
```

---

# Grille d'évaluation

## Colonnes

### Non acquise

```ts
const X_NON_ACQUISE = 265;
```

### En cours d'acquisition

```ts
const X_EN_COURS = 410;
```

### Acquise

```ts
const X_ACQUISE = 550;
```

---

## Lignes

### Intérêt et motivation

```ts
const Y_INTERET_MOTIVATION = 523;
```

---

### Dynamisme

```ts
const Y_DYNAMISME = 502;
```

---

### Esprit d'initiative

```ts
const Y_ESPRIT_INITIATIVE = 472;
```

---

### Sens de l'organisation

```ts
const Y_SENS_ORGANISATION = 442;
```

---

### Volonté de changement

```ts
const Y_VOLONTE_CHANGEMENT = 420;
```

---

### Relations équipe

```ts
const Y_RELATIONS_EQUIPE = 395;
```

---

### Adaptation

```ts
const Y_ADAPTATION = 367;
```

---

### Présentation

```ts
const Y_PRESENTATION = 346;
```

---

### Compréhension des consignes

```ts
const Y_COMPREHENSION_CONSIGNES = 323;
```

---

### Application des règles

```ts
const Y_APPLICATION_REGLES = 295;
```

---

### Aptitudes physiques

```ts
const Y_APTITUDES_PHYSIQUES = 270;
```

---

# Commentaires

## Observations générales

```ts
drawMultilineText(
  page,
  data.observations || "",
  120,
  230
);
```

Coordonnées :

```ts
x: 120
y: 230
```

---

## Points forts

```ts
drawMultilineText(
  page,
  data.pointsForts || "",
  120,
  195
);
```

Coordonnées :

```ts
x: 120
y: 195
```

---

## Points faibles

```ts
drawMultilineText(
  page,
  data.pointsFaibles || "",
  120,
  145
);
```

Coordonnées :

```ts
x: 120
y: 145
```

---

# Signature maître d'apprentissage

## Position validée

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

Coordonnées :

```ts
x: 430
y: 175
width: 120
height: 50
```

Statut :

✅ VALIDÉ

# Signature CFA

Position validée

```ts
page.drawImage(
  signatureImage,
  {
    x: 430,
    y: 115,
    width: 120,
    height: 50,
  }
);

Coordonnées :
x = 430
y = 115
width = 120
height = 50
Statut :
✅ VALIDÉ

# Historique des validations

## 2026-06-25

✅ Coordonnées entête validées

✅ Croix d'évaluation validées

✅ Coordonnées commentaires validées

✅ Signature maître validée

✅ PDF période d'essai finalisé

---

# Règle de modification

Avant toute modification :

1. Sauvegarder les coordonnées actuelles.
2. Modifier une seule zone à la fois.
3. Générer un PDF de test.
4. Valider visuellement.
5. Mettre à jour ce document.

