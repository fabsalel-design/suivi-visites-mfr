
# SUIVI PROJET MFR

## Projet

Application MFR développée avec :

- Next.js
- Supabase
- Vercel

Objectifs :

- Gestion des apprentis
- Gestion des visites
- Génération PDF
- Signature électronique

---

# Visite période d'essai

Statut : ✅ TERMINÉE

Fonctionnalités :

- Enregistrement visite
- Génération PDF
- Téléchargement PDF
- Croix d'évaluation
- Observations générales
- Points forts
- Points faibles
- Retour à la ligne automatique
- Signature maître d'apprentissage
- Signature intégrée dans le PDF

---

# Fichiers principaux

Frontend :

app/apprentis/[id]/visites/periode-essai/page.tsx

API :

app/api/visites/periode-essai/route.ts

PDF :

lib/generatePeriodeEssaiPdf.ts

---

# Base de données

Table :

visites_periode_essai

Colonnes ajoutées :

- signature_maitre (text)

---

# Signature maître d'apprentissage

Canvas HTML natif

Stockage :

signature_maitre

Format :

data:image/png;base64,...

---

# Position PDF validée

Signature maître :

x = 430
y = 175
width = 120
height = 50

---

# Prochaine étape

Signature CFA

A faire :

- Canvas signature CFA
- Colonne signature_formateur
- Stockage Supabase
- Insertion PDF dans Visa CFA
