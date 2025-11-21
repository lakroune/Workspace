#  WorkSphere (Staff-Map-Manager)

## Introduction

Ce projet est une application web front-end dynamique conçue pour gérer et visualiser l'affectation du personnel sur la carte d'un étage de bureau. Il permet aux administrateurs de créer de nouveaux profils d'employés, de les assigner à des salles spécifiques (Réception, Serveurs, Sécurité, etc.) tout en respectant des contraintes de capacité maximale et de rôles.

L'application utilise nativement le **Local Storage** du navigateur pour la persistance des données et repose sur **HTML, CSS (Grid/Flexbox) et JavaScript**, stylisé avec le framework **Bootstrap 5**.
 
---

## Fonctionnalités Principales

- **Création de Profils:** Formulaire complet avec validation stricte (RegExp, chevauchement des expériences) pour l'ajout de nouveaux employés.
- **Affectation Visuelle:** Interface de type "Glisser-déposer" pour assigner des travailleurs non affectés aux salles disponibles.
- **Contrôle de Capacité:** Application de limites de capacité maximale pour chaque salle, empêchant la surcharge.
- **Filtrage par Rôle:** Restriction des affectations basées sur le rôle de l'employé pour certaines salles critiques (ex: Salle Serveur, Sécurité).
- **Rendu Dynamique:** Mise à jour en temps réel de la carte de l'étage et des compteurs d'occupation.
- **Visualisation Détaillée:** Affichage d'une modale détaillée (fiche de profil) au clic sur l'employé, montrant les coordonnées.

---

## Technologies Utilisées

- **HTML5**
- **CSS3** (Grid pour le plan de l'étage et Flexbox)
- **JavaScript**
- **Bootstrap 5** (pour le style et les composants UI)

---

##  Structure du Projet

```
.
├── css/
│   └── style.css       # Styles personnalisés (Grid, Flexbox, Responsivité, etc.)
├── js/
│   └── script.js       # Toute la logique du projet
├── index.html          # Fichier HTML principal
└── README.md           # Documentation du projet
```

