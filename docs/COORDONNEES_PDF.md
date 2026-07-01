
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


# EVALUATION INTERMEDIAIRE

## Croches critères

Y_INTERET_MOTIVATION = 517
Y_DYNAMISME = 483
Y_ESPRIT_INITIATIVE = 438
Y_SENS_ORGANISATION = 394
Y_VOLONTE_CHANGEMENT = 364

Correspondances :

autonomie -> Y_INTERET_MOTIVATION
esprit_initiative -> Y_DYNAMISME
respect_limites -> Y_ESPRIT_INITIATIVE
ponctualite_assiduite -> Y_SENS_ORGANISATION
attitude_generale -> Y_VOLONTE_CHANGEMENT

## Signature CFA

x = 430
y = 260
width = 120
height = 50

## Signature maître d'apprentissage

x = 430
y = 125
width = 120
height = 50

## Employeur

drawMultilineText(
  page,
  data.employeur || "",
  390,
  642,
  35
);

## Points forts

x = 20
y = 320
maxChars = 75

## Points faibles

x = 20
y = 227
maxChars = 75

## Conseils

x = 20
y = 160
maxChars = 75

✅ PDF visite intermédiaire finalisé et validé

# FIN DE FORMATION

## Notes 0 à 4

const Y_GESTION_TEMPS = 575;
const Y_PRODUCTIVITE = 538;
const Y_RESPONSABILITES = 501;
const Y_JUGEMENT = 458;
const Y_COMMUNICATION = 420;
const Y_RELATIONS = 387;
const Y_ADAPTATION = 349;
const Y_TRAVAIL_BIEN_FAIT = 312;

const positions = {
  0: 323,
  1: 366,
  2: 421,
  3: 476,
  4: 529,
};
