
# ⚔️ Simulateur-de-Combat | Beyond the Curse

![Statut du projet](https://img.shields.io/badge/Statut-En%20développement-orange)
![Support Navigateur](https://img.shields.io/badge/Navigateur-Tous-green)
![Technologie](https://img.shields.io/badge/HTML%2FJS-Bootstrap%205-blue)

> Simulateur web interactif pour comparer et analyser les effets de fruits du démon, classes, races et items dans un environnement de combat RPG.

<details>
<summary>📁 <strong>Structure du Projet</strong></summary>

```bash
assets/
  ├── audio/           # Sons intégrés
  ├── css/             # Fichier style.css avec Bootstrap
  ├── img/             # Logos et illustrations
  └── js/              # stats.js - logique principale

index.html             # Interface utilisateur principale
```
</details>

---

<details>
<summary>🧠 <strong>Explication Technique du Code</strong></summary>

### `index.html`
- Gère toute l'interface : boutons de navigation, formulaires de sélection (FDD, race, classe), affichage des stats et résultats.
- Utilise Bootstrap pour la mise en page responsive.
- Utilise un système d’onglets dynamiques (chaque bouton affiche une section différente du simulateur).

### `stats.js`
- Contient la **base de données locale JSON** : `fruits`, `races`, `classes`, `paliers`, `historique`.
- Toute donnée est stockée dans `localStorage`.
- Fonctions principales :
  - `Database.init()` : initialise les données.
  - `Database.save()` : enregistre les données localement.
  - `Database.getX()` / `updateX()` / `addX()` / `deleteX()` : gestion complète des entités.
  - `calculateGlobalStats()` : additionne les stats FDD + race + classe.
  - `updatePlayerStats()` : met à jour dynamiquement les champs de combat.
  - `combatBtn.addEventListener` : calcule les résultats du combat, détermine le vainqueur et enregistre dans l’historique.

### Combat & Calculs
| Élément | Description |
|--------|-------------|
| Dégâts/min | Somme des dégâts de classe + race + fruit |
| Réduction | 60% des dégâts sont considérés effectifs |
| Heal/min | Réduit les dégâts adverses |
| TTK (Time To Kill) | PV de l'adversaire / Dégâts nets |
| Historique | Chaque combat est stocké en JSON |

</details>

---

<details>
<summary>🧪 <strong>Utilisation</strong></summary>

### Prérequis

- [Tailscale](https://tailscale.com/download)
- Navigateur Web

### Lancer le projet

1. Connectez-vous via **Tailscale**.
2. Accédez à l'URL fournie (ex: `http://100.x.x.x:xxxx`).
3. Aucun build, aucune commande.

</details>

---

<details>
<summary>👨‍💻 <strong>Auteur</strong></summary>

- Projet conçu par **_ImDarling_**

</details>

---

<!-- SVG animation pour style dynamique -->
<p align="center">
  <img src="https://raw.githubusercontent.com/edent/SuperTinyIcons/master/images/svg/broadsword.svg" alt="Sword SVG" height="80"/>
</p>
