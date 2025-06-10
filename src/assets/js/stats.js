// Structure de la base de données JSON
const defaultDatabase = {
  fruits: {
    gomu: {
      id: "gomu",
      name: "Gomu Gomu no Mi",
      description: "Fruit du caoutchouc qui rend le corps élastique.",
      degats: 80,
      debuff: 10,
      buff: 20,
      heal: 5,
      pv: 1000,
    },
  },
  races: {
    humain: {
      id: "humain",
      name: "Humain",
      description: "Race humaine standard.",
      degats: 20,
      debuff: 5,
      buff: 5,
      heal: 2,
    },
    geant: {
      id: "geant",
      name: "Géant",
      description: "Race de géants avec force supérieure.",
      degats: 40,
      debuff: 10,
      buff: 0,
      heal: 0,
    },
  },
  classes: {
    guerrier: {
      id: "guerrier",
      name: "Guerrier",
      description: "Classe axée sur le combat.",
      degats: 30,
      debuff: 5,
      buff: 10,
      heal: 0,
    },
    medecin: {
      id: "medecin",
      name: "Médecin",
      description: "Classe axée sur les soins.",
      degats: 10,
      debuff: 0,
      buff: 5,
      heal: 20,
    },
  },
  paliers: {
    palier1: {
      id: "palier1",
      niveau: 1,
      pv: 100,
      description: "Palier de base, le joueur a 100 PV.",
    },
    palier2: {
      id: "palier2",
      niveau: 2,
      pv: 200,
      description: "Palier intermédiaire, le joueur a 200 PV.",
    },
    palier3: {
      id: "palier3",
      niveau: 3,
      pv: 300,
      description: "Palier avancé, le joueur a 300 PV.",
    },
  },
  history: [],
}

// Objet principal pour gérer la base de données
const Database = {
  data: null,

  // Initialiser la base de données
  init() {
    try {
      const storedData = localStorage.getItem("beyondTheCurseDB")
      if (storedData) {
        this.data = JSON.parse(storedData)

        // Vérifier si les structures existent, sinon les ajouter
        if (!this.data.races) {
          this.data.races = defaultDatabase.races
          this.save()
        }

        if (!this.data.classes) {
          this.data.classes = defaultDatabase.classes
          this.save()
        }

        if (!this.data.paliers) {
          this.data.paliers = defaultDatabase.paliers
          this.save()
        }

        console.log("Base de données chargée depuis localStorage")
      } else {
        this.data = JSON.parse(JSON.stringify(defaultDatabase))
        this.save()
        console.log("Base de données initialisée avec les valeurs par défaut")
      }
    } catch (error) {
      console.error("Erreur lors de l'initialisation de la base de données:", error)
      this.data = JSON.parse(JSON.stringify(defaultDatabase))
      this.save()
    }

    return this.data
  },

  // Sauvegarder la base de données dans localStorage
  save() {
    try {
      localStorage.setItem("beyondTheCurseDB", JSON.stringify(this.data))
      console.log("Base de données sauvegardée dans localStorage")
      return true
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de la base de données:", error)
      return false
    }
  },

  // Réinitialiser la base de données
  reset() {
    this.data = JSON.parse(JSON.stringify(defaultDatabase))
    return this.save()
  },

  // Mettre à jour la base de données complète
  update(newData) {
    try {
      this.data = newData
      return this.save()
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la base de données:", error)
      return false
    }
  },

  // Obtenir tous les fruits
  getFruits() {
    return this.data.fruits
  },

  // Obtenir un fruit spécifique
  getFruit(id) {
    return this.data.fruits[id]
  },

  // Mettre à jour un fruit
  updateFruit(id, fruitData) {
    this.data.fruits[id] = { ...fruitData, id }
    return this.save()
  },

  // Ajouter un nouveau fruit
  addFruit(id, fruitData) {
    if (this.data.fruits[id]) {
      return false // ID déjà existant
    }

    this.data.fruits[id] = { ...fruitData, id }
    return this.save()
  },

  // Supprimer un fruit
  deleteFruit(id) {
    if (!this.data.fruits[id]) {
      return false // Fruit inexistant
    }

    delete this.data.fruits[id]
    return this.save()
  },

  // Obtenir toutes les races
  getRaces() {
    return this.data.races || {}
  },

  // Obtenir une race spécifique
  getRace(id) {
    return this.data.races ? this.data.races[id] : null
  },

  // Mettre à jour une race
  updateRace(id, raceData) {
    if (!this.data.races) {
      this.data.races = {}
    }
    this.data.races[id] = { ...raceData, id }
    return this.save()
  },

  // Ajouter une nouvelle race
  addRace(id, raceData) {
    if (!this.data.races) {
      this.data.races = {}
    }
    if (this.data.races[id]) {
      return false // ID déjà existant
    }
    this.data.races[id] = { ...raceData, id }
    return this.save()
  },

  // Supprimer une race
  deleteRace(id) {
    if (!this.data.races || !this.data.races[id]) {
      return false // Race inexistante
    }
    delete this.data.races[id]
    return this.save()
  },

  // Obtenir toutes les classes
  getClasses() {
    return this.data.classes || {}
  },

  // Obtenir une classe spécifique
  getClasse(id) {
    return this.data.classes ? this.data.classes[id] : null
  },

  // Mettre à jour une classe
  updateClasse(id, classeData) {
    if (!this.data.classes) {
      this.data.classes = {}
    }
    this.data.classes[id] = { ...classeData, id }
    return this.save()
  },

  // Ajouter une nouvelle classe
  addClasse(id, classeData) {
    if (!this.data.classes) {
      this.data.classes = {}
    }
    if (this.data.classes[id]) {
      return false // ID déjà existant
    }
    this.data.classes[id] = { ...classeData, id }
    return this.save()
  },

  // Supprimer une classe
  deleteClasse(id) {
    if (!this.data.classes || !this.data.classes[id]) {
      return false // Classe inexistante
    }
    delete this.data.classes[id]
    return this.save()
  },

  // Obtenir tous les paliers
  getPaliers() {
    return this.data.paliers || {}
  },

  // Obtenir un palier spécifique par ID
  getPalier(id) {
    return this.data.paliers ? this.data.paliers[id] : null
  },

  // Obtenir un palier spécifique par niveau
  getPalierByNiveau(niveau) {
    if (!this.data.paliers) return null

    for (const id in this.data.paliers) {
      if (this.data.paliers[id].niveau === niveau) {
        return this.data.paliers[id]
      }
    }
    return null
  },

  // Mettre à jour un palier
  updatePalier(id, palierData) {
    if (!this.data.paliers) {
      this.data.paliers = {}
    }

    // Vérifier si un autre palier a déjà ce niveau (autre que celui qu'on modifie)
    const existingPalier = Object.values(this.data.paliers).find((p) => p.niveau === palierData.niveau && p.id !== id)

    if (existingPalier) {
      return {
        success: false,
        message: `Un palier avec le niveau ${palierData.niveau} existe déjà (${existingPalier.id}).`,
      }
    }

    this.data.paliers[id] = { ...palierData, id }
    return { success: this.save(), message: "Palier mis à jour avec succès." }
  },

  // Ajouter un nouveau palier
  addPalier(id, palierData) {
    if (!this.data.paliers) {
      this.data.paliers = {}
    }

    if (this.data.paliers[id]) {
      return { success: false, message: `Un palier avec l'ID ${id} existe déjà.` }
    }

    // Vérifier si un autre palier a déjà ce niveau
    const existingPalier = Object.values(this.data.paliers).find((p) => p.niveau === palierData.niveau)

    if (existingPalier) {
      return {
        success: false,
        message: `Un palier avec le niveau ${palierData.niveau} existe déjà (${existingPalier.id}).`,
      }
    }

    this.data.paliers[id] = { ...palierData, id }
    return { success: this.save(), message: "Palier ajouté avec succès." }
  },

  // Supprimer un palier
  deletePalier(id) {
    if (!this.data.paliers || !this.data.paliers[id]) {
      return false // Palier inexistant
    }

    delete this.data.paliers[id]
    return this.save()
  },

  // Importer les paliers
  importPaliers(paliersData) {
    this.data.paliers = paliersData
    return this.save()
  },

  // Obtenir l'historique des combats
  getHistory() {
    return this.data.history || []
  },

  // Ajouter un combat à l'historique
  addCombat(combatData) {
    if (!this.data.history) {
      this.data.history = []
    }
    this.data.history.unshift(combatData) // Ajouter au début
    return this.save()
  },

  // Vider l'historique
  clearHistory() {
    this.data.history = []
    return this.save()
  },

  // Importer l'historique
  importHistory(historyData) {
    this.data.history = historyData
    return this.save()
  },

  // Importer les fruits
  importFruits(fruitsData) {
    this.data.fruits = fruitsData
    return this.save()
  },

  // Exporter toute la base de données
  export() {
    return JSON.stringify(this.data, null, 2)
  },

  // Importer toute la base de données
  import(jsonData) {
    try {
      const parsedData = JSON.parse(jsonData)
      // Vérifier la structure minimale
      if (!parsedData.fruits) {
        throw new Error("Format de données invalide: manque de propriété 'fruits'")
      }

      this.data = parsedData

      // S'assurer que toutes les structures existent
      if (!this.data.races) {
        this.data.races = defaultDatabase.races
      }

      if (!this.data.classes) {
        this.data.classes = defaultDatabase.classes
      }

      if (!this.data.paliers) {
        this.data.paliers = defaultDatabase.paliers
      }

      if (!this.data.history) {
        this.data.history = []
      }

      return this.save()
    } catch (error) {
      console.error("Erreur lors de l'importation des données:", error)
      return false
    }
  },
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialiser la base de données
  Database.init()

  // Mettre à jour l'interface avec les données
  updateUI()

  // Navigation entre les pages
  const headerButtons = document.querySelectorAll(".header .btn")
  const pages = document.querySelectorAll(".page")

  headerButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Reset all buttons
      headerButtons.forEach((btn) => btn.classList.remove("active"))
      // Set active button
      this.classList.add("active")

      // Hide all pages
      pages.forEach((page) => page.classList.remove("active"))

      // Show selected page
      const pageId = this.getAttribute("data-page")
      document.getElementById(pageId).classList.add("active")

      // Mettre à jour l'interface selon la page
      if (pageId === "modif-stats") {
        document.getElementById("database-json").value = Database.export()
      } else if (pageId === "listes") {
        updateListesPage()
      } else if (pageId === "modif-paliers") {
        updatePaliersList()
      }
    })
  })

  // Fonctions pour calculer les stats globales
  function calculateGlobalStats(joueur) {
    const fddId = joueur === "p1" ? document.getElementById("p1-fdd").value : document.getElementById("p2-fdd").value
    const raceId = joueur === "p1" ? document.getElementById("p1-race").value : document.getElementById("p2-race").value
    const classeId =
      joueur === "p1" ? document.getElementById("p1-classe").value : document.getElementById("p2-classe").value

    // Valeurs par défaut
    const stats = {
      degats: 0,
      debuff: 0,
      buff: 0,
      heal: 0,
      pv: 0,
    }

    // Ajouter stats du FDD
    const fruit = Database.getFruit(fddId)
    if (fruit) {
      stats.degats += fruit.degats || 0
      stats.debuff += fruit.debuff || 0
      stats.buff += fruit.buff || 0
      stats.heal += fruit.heal || 0
      stats.pv = fruit.pv || 0
    }

    // Ajouter stats de la race
    const race = Database.getRace(raceId)
    if (race) {
      stats.degats += race.degats || 0
      stats.debuff += race.debuff || 0
      stats.buff += race.buff || 0
      stats.heal += race.heal || 0
    }

    // Ajouter stats de la classe
    const classe = Database.getClasse(classeId)
    if (classe) {
      stats.degats += classe.degats || 0
      stats.debuff += classe.debuff || 0
      stats.buff += classe.buff || 0
      stats.heal += classe.heal || 0
    }

    return stats
  }

  // Mettre à jour les stats affichées
  function updatePlayerStats(joueur) {
    const stats = calculateGlobalStats(joueur)

    // Mettre à jour les champs
    if (joueur === "p1") {
      document.getElementById("p1-degats").value = stats.degats
      document.getElementById("p1-debuff").value = stats.debuff
      document.getElementById("p1-buff").value = stats.buff
      document.getElementById("p1-heal-user").value = stats.heal

      // Calculer PV MAX en fonction du palier
      const palierSelect = document.getElementById("p1-palier")
      const palierNiveau = Number.parseInt(palierSelect.value)
      if (palierNiveau) {
        const palier = Database.getPalierByNiveau(palierNiveau)
        if (palier) {
          document.getElementById("p1-pv-max").value = palier.pv
        }
      }
    } else {
      document.getElementById("p2-degats").value = stats.degats
      document.getElementById("p2-debuff").value = stats.debuff
      document.getElementById("p2-buff").value = stats.buff
      document.getElementById("p2-heal-user").value = stats.heal

      // Calculer PV MAX en fonction du palier
      const palierSelect = document.getElementById("p2-palier")
      const palierNiveau = Number.parseInt(palierSelect.value)
      if (palierNiveau) {
        const palier = Database.getPalierByNiveau(palierNiveau)
        if (palier) {
          document.getElementById("p2-pv-max").value = palier.pv
        }
      }
    }
  }
  // Événements pour les sélecteurs de P1
  ;["p1-fdd", "p1-race", "p1-classe"].forEach((id) => {
    document.getElementById(id).addEventListener("change", () => {
      updatePlayerStats("p1")
    })
  })

  // Événements pour les sélecteurs de P2
  ;["p2-fdd", "p2-race", "p2-classe"].forEach((id) => {
    document.getElementById(id).addEventListener("change", () => {
      updatePlayerStats("p2")
    })
  })

  // Ajuster PV MAX quand le palier change
  document.getElementById("p1-palier").addEventListener("change", function () {
    const palierNiveau = Number.parseInt(this.value)
    if (palierNiveau) {
      const palier = Database.getPalierByNiveau(palierNiveau)
      if (palier) {
        document.getElementById("p1-pv-max").value = palier.pv
      }
    }
  })

  document.getElementById("p2-palier").addEventListener("change", function () {
    const palierNiveau = Number.parseInt(this.value)
    if (palierNiveau) {
      const palier = Database.getPalierByNiveau(palierNiveau)
      if (palier) {
        document.getElementById("p2-pv-max").value = palier.pv
      }
    }
  })

  // Combat button functionality
  const combatBtn = document.getElementById("combat-btn")
  combatBtn.addEventListener("click", () => {
    // Récupérer les valeurs des formulaires
    const p1 = {
      nom: document.getElementById("p1-nom").value || "Joueur 1",
      fdd: document.getElementById("p1-fdd").value,
      fddName: document.getElementById("p1-fdd").options[document.getElementById("p1-fdd").selectedIndex].text,
      race: document.getElementById("p1-race").value,
      raceName: document.getElementById("p1-race").options[document.getElementById("p1-race").selectedIndex].text,
      classe: document.getElementById("p1-classe").value,
      classeName: document.getElementById("p1-classe").options[document.getElementById("p1-classe").selectedIndex].text,
      degats: Number.parseFloat(document.getElementById("p1-degats").value) || 0,
      healUser: Number.parseFloat(document.getElementById("p1-heal-user").value) || 0,
      pvMax: Number.parseFloat(document.getElementById("p1-pv-max").value) || 1000,
    }

    const p2 = {
      nom: document.getElementById("p2-nom").value || "Joueur 2",
      fdd: document.getElementById("p2-fdd").value,
      fddName: document.getElementById("p2-fdd").options[document.getElementById("p2-fdd").selectedIndex].text,
      race: document.getElementById("p2-race").value,
      raceName: document.getElementById("p2-race").options[document.getElementById("p2-race").selectedIndex].text,
      classe: document.getElementById("p2-classe").value,
      classeName: document.getElementById("p2-classe").options[document.getElementById("p2-classe").selectedIndex].text,
      degats: Number.parseFloat(document.getElementById("p2-degats").value) || 0,
      healUser: Number.parseFloat(document.getElementById("p2-heal-user").value) || 0,
      pvMax: Number.parseFloat(document.getElementById("p2-pv-max").value) || 1000,
    }

    // Calculer selon la formule donnée
    // Dégâts réels = Dégâts par minute - 60%
    const degatsReelsP1 = p1.degats * 0.4
    const degatsReelsP2 = p2.degats * 0.4

    // Dégâts nets = Dégâts réels - Heal par minute de l'adversaire
    const degatsNetsP1 = degatsReelsP1 - p2.healUser
    const degatsNetsP2 = degatsReelsP2 - p1.healUser

    // Calcul du TTK (Time To Kill)
    const ttkP1 = degatsNetsP1 > 0 ? p2.pvMax / degatsNetsP1 : Number.POSITIVE_INFINITY
    const ttkP2 = degatsNetsP2 > 0 ? p1.pvMax / degatsNetsP2 : Number.POSITIVE_INFINITY

    // Déterminer le vainqueur
    let winner, loser, winnerTime, loserTime

    if (ttkP1 < ttkP2) {
      winner = p1
      loser = p2
      winnerTime = ttkP1
      loserTime = ttkP2
    } else {
      winner = p2
      loser = p1
      winnerTime = ttkP2
      loserTime = ttkP1
    }

    // Afficher les résultats
    const resultsDiv = document.getElementById("combat-results")
    resultsDiv.innerHTML = `
            <div class="combat-result">
                <h3 class="mb-4">Résultat du Combat</h3>
                <div class="row">
                    <div class="col-md-6">
                        <h4>${p1.nom} (${p1.fddName})</h4>
                        <ul class="list-unstyled">
                            <li>Race: ${p1.raceName}</li>
                            <li>Classe: ${p1.classeName}</li>
                            <li>Dégâts/min: ${p1.degats}</li>
                            <li>Dégâts/min après réduction (60%): ${degatsReelsP1.toFixed(2)}</li>
                            <li>Heal Utilisateur: ${p1.healUser}</li>
                            <li>PV MAX: ${p1.pvMax}</li>
                            <li>Temps pour vaincre l'adversaire: ${ttkP1 === Number.POSITIVE_INFINITY ? "∞" : ttkP1.toFixed(2)} minutes</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h4>${p2.nom} (${p2.fddName})</h4>
                        <ul class="list-unstyled">
                            <li>Race: ${p2.raceName}</li>
                            <li>Classe: ${p2.classeName}</li>
                            <li>Dégâts/min: ${p2.degats}</li>
                            <li>Dégâts/min après réduction (60%): ${degatsReelsP2.toFixed(2)}</li>
                            <li>Heal Utilisateur: ${p2.healUser}</li>
                            <li>PV MAX: ${p2.pvMax}</li>
                            <li>Temps pour vaincre l'adversaire: ${ttkP2 === Number.POSITIVE_INFINITY ? "∞" : ttkP2.toFixed(2)} minutes</li>
                        </ul>
                    </div>
                </div>
                <div class="combat-result">
                    <h4 class="winner">Vainqueur: ${winner.nom} (${winner.fddName})</h4>
                    <p>Temps pour vaincre l'adversaire: ${winnerTime === Number.POSITIVE_INFINITY ? "∞" : winnerTime.toFixed(2)} minutes</p>
                    <p>Explication: ${winner.nom} peut vaincre ${loser.nom} plus rapidement (${winnerTime === Number.POSITIVE_INFINITY ? "∞" : winnerTime.toFixed(2)} minutes contre ${loserTime === Number.POSITIVE_INFINITY ? "∞" : loserTime.toFixed(2)} minutes).</p>
                </div>
            </div>
        `

    // Ajouter le combat à l'historique
    const combatRecord = {
      date: new Date().toISOString(),
      p1: { ...p1 },
      p2: { ...p2 },
      winner: winner === p1 ? "p1" : "p2",
      winnerTime: winnerTime,
      loserTime: loserTime,
    }

    Database.addCombat(combatRecord)
    updateCombatHistory()
  })

  // Gestion du formulaire de modification des fruits
  document.getElementById("fruit-select").addEventListener("change", function () {
    const selectedFruit = this.value
    const fruit = Database.getFruit(selectedFruit)

    if (fruit) {
      document.getElementById("fruit-degats").value = fruit.degats || 0
      document.getElementById("fruit-debuff").value = fruit.debuff || 0
      document.getElementById("fruit-buff").value = fruit.buff || 0
      document.getElementById("fruit-heal").value = fruit.heal || 0
      document.getElementById("fruit-pv").value = fruit.pv || 0
    }
  })

  document.getElementById("fruit-stats-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const selectedFruit = document.getElementById("fruit-select").value

    if (selectedFruit) {
      const fruit = Database.getFruit(selectedFruit)
      if (fruit) {
        const updatedFruit = {
          ...fruit,
          degats: Number.parseFloat(document.getElementById("fruit-degats").value) || 0,
          debuff: Number.parseFloat(document.getElementById("fruit-debuff").value) || 0,
          buff: Number.parseFloat(document.getElementById("fruit-buff").value) || 0,
          heal: Number.parseFloat(document.getElementById("fruit-heal").value) || 0,
          pv: Number.parseFloat(document.getElementById("fruit-pv").value) || 0,
        }

        Database.updateFruit(selectedFruit, updatedFruit)

        alert(`Les statistiques du fruit ${fruit.name} ont été mises à jour.`)
        updateUI()
      }
    }
  })

  // Gestion de la suppression d'un fruit
  document.getElementById("delete-fruit").addEventListener("click", () => {
    const selectedFruit = document.getElementById("fruit-select").value

    if (selectedFruit) {
      const fruit = Database.getFruit(selectedFruit)
      if (fruit) {
        if (confirm(`Êtes-vous sûr de vouloir supprimer le fruit ${fruit.name} ?`)) {
          if (Database.deleteFruit(selectedFruit)) {
            alert(`Le fruit ${fruit.name} a été supprimé avec succès.`)
            updateUI()

            // Réinitialiser le formulaire
            document.getElementById("fruit-select").selectedIndex = 0
            document.getElementById("fruit-degats").value = ""
            document.getElementById("fruit-debuff").value = ""
            document.getElementById("fruit-buff").value = ""
            document.getElementById("fruit-heal").value = ""
            document.getElementById("fruit-pv").value = ""
          } else {
            alert("Une erreur s'est produite lors de la suppression du fruit.")
          }
        }
      }
    } else {
      alert("Veuillez sélectionner un fruit à supprimer.")
    }
  })

  // Gestion du formulaire d'ajout de nouveau fruit
  document.getElementById("new-fruit-form").addEventListener("submit", function (e) {
    e.preventDefault()
    const fruitId = document.getElementById("new-fruit-id").value.trim()
    const fruitName = document.getElementById("new-fruit-name").value.trim()
    const fruitDesc = document.getElementById("new-fruit-desc").value.trim()

    if (fruitId && fruitName) {
      // Vérifier si l'ID existe déjà
      if (Database.getFruit(fruitId)) {
        alert(`Un fruit avec l'ID "${fruitId}" existe déjà. Veuillez choisir un autre ID.`)
        return
      }

      const newFruit = {
        id: fruitId,
        name: fruitName,
        description: fruitDesc || `Description de ${fruitName}`,
        degats: Number.parseFloat(document.getElementById("new-fruit-degats").value) || 0,
        debuff: Number.parseFloat(document.getElementById("new-fruit-debuff").value) || 0,
        buff: Number.parseFloat(document.getElementById("new-fruit-buff").value) || 0,
        heal: Number.parseFloat(document.getElementById("new-fruit-heal").value) || 0,
        pv: Number.parseFloat(document.getElementById("new-fruit-pv").value) || 0,
      }

      if (Database.addFruit(fruitId, newFruit)) {
        alert(`Le fruit ${fruitName} a été ajouté avec succès.`)
        updateUI()
        this.reset()
      } else {
        alert("Une erreur s'est produite lors de l'ajout du fruit.")
      }
    }
  })

  // Gestion des races
  document.getElementById("race-select").addEventListener("change", function () {
    const selectedRace = this.value
    const race = Database.getRace(selectedRace)

    if (race) {
      document.getElementById("race-degats").value = race.degats || 0
      document.getElementById("race-debuff").value = race.debuff || 0
      document.getElementById("race-buff").value = race.buff || 0
      document.getElementById("race-heal").value = race.heal || 0
    }
  })

  document.getElementById("race-stats-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const selectedRace = document.getElementById("race-select").value

    if (selectedRace) {
      const race = Database.getRace(selectedRace)
      if (race) {
        const updatedRace = {
          ...race,
          degats: Number.parseFloat(document.getElementById("race-degats").value) || 0,
          debuff: Number.parseFloat(document.getElementById("race-debuff").value) || 0,
          buff: Number.parseFloat(document.getElementById("race-buff").value) || 0,
          heal: Number.parseFloat(document.getElementById("race-heal").value) || 0,
        }

        Database.updateRace(selectedRace, updatedRace)
        alert(`Les statistiques de la race ${race.name} ont été mises à jour.`)
        updateUI()
      }
    }
  })

  document.getElementById("delete-race").addEventListener("click", () => {
    const selectedRace = document.getElementById("race-select").value

    if (selectedRace) {
      const race = Database.getRace(selectedRace)
      if (race) {
        if (confirm(`Êtes-vous sûr de vouloir supprimer la race ${race.name} ?`)) {
          if (Database.deleteRace(selectedRace)) {
            alert(`La race ${race.name} a été supprimée avec succès.`)
            updateUI()

            // Réinitialiser le formulaire
            document.getElementById("race-select").selectedIndex = 0
            document.getElementById("race-degats").value = ""
            document.getElementById("race-debuff").value = ""
            document.getElementById("race-buff").value = ""
            document.getElementById("race-heal").value = ""
          } else {
            alert("Une erreur s'est produite lors de la suppression de la race.")
          }
        }
      }
    } else {
      alert("Veuillez sélectionner une race à supprimer.")
    }
  })

  document.getElementById("new-race-form").addEventListener("submit", function (e) {
    e.preventDefault()
    const raceId = document.getElementById("new-race-id").value.trim()
    const raceName = document.getElementById("new-race-name").value.trim()
    const raceDesc = document.getElementById("new-race-desc").value.trim()

    if (raceId && raceName) {
      // Vérifier si l'ID existe déjà
      if (Database.getRace(raceId)) {
        alert(`Une race avec l'ID "${raceId}" existe déjà. Veuillez choisir un autre ID.`)
        return
      }

      const newRace = {
        id: raceId,
        name: raceName,
        description: raceDesc || `Description de ${raceName}`,
        degats: Number.parseFloat(document.getElementById("new-race-degats").value) || 0,
        debuff: Number.parseFloat(document.getElementById("new-race-debuff").value) || 0,
        buff: Number.parseFloat(document.getElementById("new-race-buff").value) || 0,
        heal: Number.parseFloat(document.getElementById("new-race-heal").value) || 0,
      }

      if (Database.addRace(raceId, newRace)) {
        alert(`La race ${raceName} a été ajoutée avec succès.`)
        updateUI()
        this.reset()
      } else {
        alert("Une erreur s'est produite lors de l'ajout de la race.")
      }
    }
  })

  // Gestion des classes
  document.getElementById("classe-select").addEventListener("change", function () {
    const selectedClasse = this.value
    const classe = Database.getClasse(selectedClasse)

    if (classe) {
      document.getElementById("classe-degats").value = classe.degats || 0
      document.getElementById("classe-debuff").value = classe.debuff || 0
      document.getElementById("classe-buff").value = classe.buff || 0
      document.getElementById("classe-heal").value = classe.heal || 0
    }
  })

  document.getElementById("classe-stats-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const selectedClasse = document.getElementById("classe-select").value

    if (selectedClasse) {
      const classe = Database.getClasse(selectedClasse)
      if (classe) {
        const updatedClasse = {
          ...classe,
          degats: Number.parseFloat(document.getElementById("classe-degats").value) || 0,
          debuff: Number.parseFloat(document.getElementById("classe-debuff").value) || 0,
          buff: Number.parseFloat(document.getElementById("classe-buff").value) || 0,
          heal: Number.parseFloat(document.getElementById("classe-heal").value) || 0,
        }

        Database.updateClasse(selectedClasse, updatedClasse)
        alert(`Les statistiques de la classe ${classe.name} ont été mises à jour.`)
        updateUI()
      }
    }
  })

  document.getElementById("delete-classe").addEventListener("click", () => {
    const selectedClasse = document.getElementById("classe-select").value

    if (selectedClasse) {
      const classe = Database.getClasse(selectedClasse)
      if (classe) {
        if (confirm(`Êtes-vous sûr de vouloir supprimer la classe ${classe.name} ?`)) {
          if (Database.deleteClasse(selectedClasse)) {
            alert(`La classe ${classe.name} a été supprimée avec succès.`)
            updateUI()

            // Réinitialiser le formulaire
            document.getElementById("classe-select").selectedIndex = 0
            document.getElementById("classe-degats").value = ""
            document.getElementById("classe-debuff").value = ""
            document.getElementById("classe-buff").value = ""
            document.getElementById("classe-heal").value = ""
          } else {
            alert("Une erreur s'est produite lors de la suppression de la classe.")
          }
        }
      }
    } else {
      alert("Veuillez sélectionner une classe à supprimer.")
    }
  })

  document.getElementById("new-classe-form").addEventListener("submit", function (e) {
    e.preventDefault()
    const classeId = document.getElementById("new-classe-id").value.trim()
    const classeName = document.getElementById("new-classe-name").value.trim()
    const classeDesc = document.getElementById("new-classe-desc").value.trim()

    if (classeId && classeName) {
      // Vérifier si l'ID existe déjà
      if (Database.getClasse(classeId)) {
        alert(`Une classe avec l'ID "${classeId}" existe déjà. Veuillez choisir un autre ID.`)
        return
      }

      const newClasse = {
        id: classeId,
        name: classeName,
        description: classeDesc || `Description de ${classeName}`,
        degats: Number.parseFloat(document.getElementById("new-classe-degats").value) || 0,
        debuff: Number.parseFloat(document.getElementById("new-classe-debuff").value) || 0,
        buff: Number.parseFloat(document.getElementById("new-classe-buff").value) || 0,
        heal: Number.parseFloat(document.getElementById("new-classe-heal").value) || 0,
      }

      if (Database.addClasse(classeId, newClasse)) {
        alert(`La classe ${classeName} a été ajoutée avec succès.`)
        updateUI()
        this.reset()
      } else {
        alert("Une erreur s'est produite lors de l'ajout de la classe.")
      }
    }
  })

  // Gestion de la base de données JSON
  document.getElementById("update-database").addEventListener("click", () => {
    try {
      const jsonData = document.getElementById("database-json").value
      if (Database.import(jsonData)) {
        alert("Base de données mise à jour avec succès.")
        updateUI()
      } else {
        alert("Erreur lors de la mise à jour de la base de données.")
      }
    } catch (error) {
      alert("Erreur: " + error.message)
    }
  })

  document.getElementById("reset-database").addEventListener("click", () => {
    if (
      confirm("Êtes-vous sûr de vouloir réinitialiser la base de données ? Toutes les modifications seront perdues.")
    ) {
      if (Database.reset()) {
        alert("Base de données réinitialisée avec succès.")
        updateUI()
      } else {
        alert("Erreur lors de la réinitialisation de la base de données.")
      }
    }
  })

  // Export des fruits
  document.getElementById("export-fruits").addEventListener("click", () => {
    const fruits = Database.getFruits()
    const jsonBlob = new Blob([JSON.stringify(fruits, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(jsonBlob)

    const a = document.createElement("a")
    a.href = url
    a.download = "beyond-the-curse-fruits.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  })

  // Import des fruits
  document.getElementById("import-fruits").addEventListener("click", () => {
    const fileInput = document.getElementById("import-fruits-file")
    if (fileInput.files.length === 0) {
      alert("Veuillez sélectionner un fichier JSON.")
      return
    }

    const file = fileInput.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const fruitsData = JSON.parse(e.target.result)
        if (Database.importFruits(fruitsData)) {
          alert("Fruits importés avec succès.")
          updateUI()
        } else {
          alert("Erreur lors de l'importation des fruits.")
        }
      } catch (error) {
        alert("Erreur de format JSON: " + error.message)
      }
    }

    reader.readAsText(file)
  })

  // Export de l'historique
  document.getElementById("export-history").addEventListener("click", () => {
    const history = Database.getHistory()
    const jsonBlob = new Blob([JSON.stringify(history, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(jsonBlob)

    const a = document.createElement("a")
    a.href = url
    a.download = "beyond-the-curse-history.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  })

  // Import de l'historique
  document.getElementById("import-history").addEventListener("click", () => {
    const fileInput = document.getElementById("import-history-file")
    if (fileInput.files.length === 0) {
      alert("Veuillez sélectionner un fichier JSON.")
      return
    }

    const file = fileInput.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const historyData = JSON.parse(e.target.result)
        if (Database.importHistory(historyData)) {
          alert("Historique importé avec succès.")
          updateCombatHistory()
        } else {
          alert("Erreur lors de l'importation de l'historique.")
        }
      } catch (error) {
        alert("Erreur de format JSON: " + error.message)
      }
    }

    reader.readAsText(file)
  })

  // Gestion des paliers

  // Sélection d'un palier
  document.getElementById("palier-select").addEventListener("change", function () {
    const selectedPalier = this.value
    const palier = Database.getPalier(selectedPalier)

    if (palier) {
      document.getElementById("palier-niveau").value = palier.niveau
      document.getElementById("palier-pv").value = palier.pv
      document.getElementById("palier-description").value = palier.description || ""
    }
  })

  // Modification d'un palier
  document.getElementById("palier-edit-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const selectedPalier = document.getElementById("palier-select").value

    if (selectedPalier) {
      const palier = Database.getPalier(selectedPalier)
      if (palier) {
        const updatedPalier = {
          ...palier,
          niveau: Number.parseInt(document.getElementById("palier-niveau").value) || 1,
          pv: Number.parseInt(document.getElementById("palier-pv").value) || 100,
          description: document.getElementById("palier-description").value || "",
        }

        const result = Database.updatePalier(selectedPalier, updatedPalier)
        if (result.success) {
          alert(`Le palier ${updatedPalier.niveau} a été mis à jour.`)
          updatePaliersList()
          updatePaliersOptions()
        } else {
          alert(result.message || "Une erreur s'est produite lors de la mise à jour du palier.")
        }
      }
    } else {
      alert("Veuillez sélectionner un palier à modifier.")
    }
  })

  // Suppression d'un palier
  document.getElementById("delete-palier").addEventListener("click", () => {
    const selectedPalier = document.getElementById("palier-select").value

    if (selectedPalier) {
      const palier = Database.getPalier(selectedPalier)
      if (palier) {
        if (confirm(`Êtes-vous sûr de vouloir supprimer le palier ${palier.niveau} ?`)) {
          if (Database.deletePalier(selectedPalier)) {
            alert(`Le palier ${palier.niveau} a été supprimé avec succès.`)
            updatePaliersList()
            updatePaliersOptions()

            // Réinitialiser le formulaire
            document.getElementById("palier-select").selectedIndex = 0
            document.getElementById("palier-niveau").value = ""
            document.getElementById("palier-pv").value = ""
            document.getElementById("palier-description").value = ""
          } else {
            alert("Une erreur s'est produite lors de la suppression du palier.")
          }
        }
      }
    } else {
      alert("Veuillez sélectionner un palier à supprimer.")
    }
  })

  // Ajout d'un nouveau palier
  document.getElementById("new-palier-form").addEventListener("submit", function (e) {
    e.preventDefault()
    const palierId = document.getElementById("new-palier-id").value.trim()
    const palierNiveau = Number.parseInt(document.getElementById("new-palier-niveau").value)

    if (palierId && palierNiveau) {
      const newPalier = {
        id: palierId,
        niveau: palierNiveau,
        pv: Number.parseInt(document.getElementById("new-palier-pv").value) || 100,
        description:
          document.getElementById("new-palier-description").value ||
          `Palier ${palierNiveau}, le joueur a ${document.getElementById("new-palier-pv").value || 100} PV.`,
      }

      const result = Database.addPalier(palierId, newPalier)
      if (result.success) {
        alert(`Le palier ${palierNiveau} a été ajouté avec succès.`)
        updatePaliersList()
        updatePaliersOptions()
        this.reset()
      } else {
        alert(result.message || "Une erreur s'est produite lors de l'ajout du palier.")
      }
    }
  })

  // Export des paliers
  document.getElementById("export-paliers").addEventListener("click", () => {
    const paliers = Database.getPaliers()
    const jsonBlob = new Blob([JSON.stringify(paliers, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(jsonBlob)

    const a = document.createElement("a")
    a.href = url
    a.download = "beyond-the-curse-paliers.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  })

  // Import des paliers
  document.getElementById("import-paliers").addEventListener("click", () => {
    const fileInput = document.getElementById("import-paliers-file")
    if (fileInput.files.length === 0) {
      alert("Veuillez sélectionner un fichier JSON.")
      return
    }

    const file = fileInput.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const paliersData = JSON.parse(e.target.result)
        if (Database.importPaliers(paliersData)) {
          alert("Paliers importés avec succès.")
          updatePaliersList()
          updatePaliersOptions()
        } else {
          alert("Erreur lors de l'importation des paliers.")
        }
      } catch (error) {
        alert("Erreur de format JSON: " + error.message)
      }
    }

    reader.readAsText(file)
  })

  // Mise à jour des listes complètes
  function updateListesPage() {
    // Mise à jour liste des fruits
    const fruits = Database.getFruits()
    const fruitsBody = document.getElementById("liste-fruits-body")
    fruitsBody.innerHTML = ""

    for (const id in fruits) {
      const fruit = fruits[id]
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${fruit.id}</td>
        <td>${fruit.name}</td>
        <td>${fruit.description || ""}</td>
        <td>${fruit.degats || 0}</td>
        <td>${fruit.debuff || 0}</td>
        <td>${fruit.buff || 0}</td>
        <td>${fruit.heal || 0}</td>
        <td>${fruit.pv || 0}</td>
      `
      fruitsBody.appendChild(row)
    }

    // Mise à jour liste des races
    const races = Database.getRaces()
    const racesBody = document.getElementById("liste-races-body")
    racesBody.innerHTML = ""

    for (const id in races) {
      const race = races[id]
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${race.id}</td>
        <td>${race.name}</td>
        <td>${race.description || ""}</td>
        <td>${race.degats || 0}</td>
        <td>${race.debuff || 0}</td>
        <td>${race.buff || 0}</td>
        <td>${race.heal || 0}</td>
      `
      racesBody.appendChild(row)
    }

    // Mise à jour liste des classes
    const classes = Database.getClasses()
    const classesBody = document.getElementById("liste-classes-body")
    classesBody.innerHTML = ""

    for (const id in classes) {
      const classe = classes[id]
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${classe.id}</td>
        <td>${classe.name}</td>
        <td>${classe.description || ""}</td>
        <td>${classe.degats || 0}</td>
        <td>${classe.debuff || 0}</td>
        <td>${classe.buff || 0}</td>
        <td>${classe.heal || 0}</td>
      `
      classesBody.appendChild(row)
    }
  }
})

// Fonctions utilitaires

// Mettre à jour l'interface utilisateur avec les données de la base de données
function updateUI() {
  updateFruitOptions()
  updateRaceOptions()
  updateClasseOptions()
  updatePaliersOptions()

  updateFruitDisplay()
  updateCombatHistory()
  updatePaliersList()
  updateListesPage()

  // Mettre à jour le JSON dans l'éditeur
  if (document.getElementById("modif-stats").classList.contains("active")) {
    document.getElementById("database-json").value = Database.export()
  }
}

// Mettre à jour les options de sélection des fruits
function updateFruitOptions() {
  const fruits = Database.getFruits()
  const fruitSelects = ["p1-fdd", "p2-fdd", "fruit-select"]

  fruitSelects.forEach((selectId) => {
    const select = document.getElementById(selectId)
    if (!select) return

    // Vider le select sauf la première option
    while (select.options.length > 1) {
      select.remove(1)
    }

    // Ajouter les options de fruits
    for (const id in fruits) {
      const fruit = fruits[id]
      const option = document.createElement("option")
      option.value = id
      option.textContent = fruit.name
      select.appendChild(option)
    }
  })
}

// Mettre à jour les options de sélection des races
function updateRaceOptions() {
  const races = Database.getRaces()
  const raceSelects = ["p1-race", "p2-race", "race-select"]

  raceSelects.forEach((selectId) => {
    const select = document.getElementById(selectId)
    if (!select) return

    // Vider le select sauf la première option
    while (select.options.length > 1) {
      select.remove(1)
    }

    // Ajouter les options de races
    for (const id in races) {
      const race = races[id]
      const option = document.createElement("option")
      option.value = id
      option.textContent = race.name
      select.appendChild(option)
    }
  })
}

// Mettre à jour les options de sélection des classes
function updateClasseOptions() {
  const classes = Database.getClasses()
  const classeSelects = ["p1-classe", "p2-classe", "classe-select"]

  classeSelects.forEach((selectId) => {
    const select = document.getElementById(selectId)
    if (!select) return

    // Vider le select sauf la première option
    while (select.options.length > 1) {
      select.remove(1)
    }

    // Ajouter les options de classes
    for (const id in classes) {
      const classe = classes[id]
      const option = document.createElement("option")
      option.value = id
      option.textContent = classe.name
      select.appendChild(option)
    }
  })
}

// Mettre à jour l'affichage des fruits
function updateFruitDisplay() {
  const fruits = Database.getFruits()
  const fruitContainer = document.getElementById("fruits-container")
  if (!fruitContainer) return

  let fruitHTML = ""

  for (const id in fruits) {
    const fruit = fruits[id]
    fruitHTML += `
            <div class="col-md-4 mb-4">
                <div class="fruit-card">
                    <h3>${fruit.name}</h3>
                    <p>${fruit.description || "Aucune description disponible."}</p>
                    <div class="mt-3">
                        <strong>Statistiques de base:</strong>
                        <ul class="list-unstyled mt-2">
                            <li>Dégâts/min: ${fruit.degats || 0}</li>
                            <li>Debuff Entités: ${fruit.debuff || 0}</li>
                            <li>Buff Utilisateur: ${fruit.buff || 0}</li>
                            <li>Heal Utilisateur: ${fruit.heal || 0}</li>
                            <li>PV MAX (Palier 1): ${fruit.pv || 0}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `
  }

  fruitContainer.innerHTML = fruitHTML
}

// Mettre à jour l'historique des combats
function updateCombatHistory() {
  const history = Database.getHistory()
  const historyList = document.getElementById("combat-history-list")
  if (!historyList) return

  if (history.length === 0) {
    historyList.innerHTML = `
            <div class="alert alert-info">
                Aucun combat n'a encore été enregistré.
            </div>
        `
    return
  }

  let historyHTML = ""

  history.forEach((combat, index) => {
    const date = new Date(combat.date).toLocaleString()
    const winner = combat.winner === "p1" ? combat.p1 : combat.p2
    const loser = combat.winner === "p1" ? combat.p2 : combat.p1

    historyHTML += `
            <div class="history-item">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h4>Combat #${index + 1}</h4>
                    <small class="combat-result">${date}</small>
                </div>
                <div class="row">
                    <div class="col-md-5">
                        <h5>${combat.p1.nom} (${combat.p1.fddName})</h5>
                        <ul class="list-unstyled">
                            <li>Dégâts/min: ${combat.p1.degats}</li>
                            <li>Heal: ${combat.p1.healUser}</li>
                            <li>PV: ${combat.p1.pvMax}</li>
                        </ul>
                    </div>
                    <div class="col-md-2 d-flex justify-content-center align-items-center">
                        <h5>VS</h5>
                    </div>
                    <div class="col-md-5">
                        <h5>${combat.p2.nom} (${combat.p2.fddName})</h5>
                        <ul class="list-unstyled">
                            <li>Dégâts/min: ${combat.p2.degats}</li>
                            <li>Heal: ${combat.p2.healUser}</li>
                            <li>PV: ${combat.p2.pvMax}</li>
                        </ul>
                    </div>
                </div>
                <div class="combat-result">
                    <h5 class="winner">Vainqueur: ${winner.nom} (${winner.fddName})</h5>
                    <p>Temps: ${combat.winnerTime === Number.POSITIVE_INFINITY ? "∞" : combat.winnerTime.toFixed(2)} minutes contre ${combat.loserTime === Number.POSITIVE_INFINITY ? "∞" : combat.loserTime.toFixed(2)} minutes</p>
                </div>
            </div>
        `
  })

  historyList.innerHTML = historyHTML
}

// Mettre à jour la liste des paliers dans le gestionnaire de paliers
function updatePaliersList() {
  const paliers = Database.getPaliers()
  const paliersList = document.getElementById("paliers-list")
  const palierSelect = document.getElementById("palier-select")

  if (!paliersList || !palierSelect) return

  // Vider la liste des paliers
  paliersList.innerHTML = ""

  // Vider le select sauf la première option
  while (palierSelect.options.length > 1) {
    palierSelect.remove(1)
  }

  // Trier les paliers par niveau
  const paliersArray = Object.values(paliers).sort((a, b) => a.niveau - b.niveau)

  paliersArray.forEach((palier) => {
    // Ajouter à la liste
    const row = document.createElement("tr")
    row.innerHTML = `
            <td>${palier.id}</td>
            <td>${palier.niveau}</td>
            <td>${palier.pv}</td>
            <td>${palier.description || ""}</td>
        `
    paliersList.appendChild(row)

    // Ajouter au select
    const option = document.createElement("option")
    option.value = palier.id
    option.textContent = `Palier ${palier.niveau} (${palier.pv} PV)`
    palierSelect.appendChild(option)
  })
}

// Mettre à jour les options de sélection des paliers dans les formulaires de combat
function updatePaliersOptions() {
  const paliers = Database.getPaliers()
  const palierSelects = ["p1-palier", "p2-palier"]

  palierSelects.forEach((selectId) => {
    const select = document.getElementById(selectId)
    if (!select) return

    // Vider le select sauf la première option
    while (select.options.length > 1) {
      select.remove(1)
    }

    // Trier les paliers par niveau
    const paliersArray = Object.values(paliers).sort((a, b) => a.niveau - b.niveau)

    // Ajouter les options de paliers
    paliersArray.forEach((palier) => {
      const option = document.createElement("option")
      option.value = palier.niveau
      option.textContent = `Palier ${palier.niveau} (${palier.pv} PV)`
      select.appendChild(option)
    })
  })
}

// Mettre à jour les listes complètes (onglet "Listes")
function updateListesPage() {
  // Mise à jour liste des fruits
  const fruitsBody = document.getElementById("liste-fruits-body")
  if (fruitsBody) {
    const fruits = Database.getFruits()
    fruitsBody.innerHTML = ""

    for (const id in fruits) {
      const fruit = fruits[id]
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${fruit.id}</td>
        <td>${fruit.name}</td>
        <td>${fruit.description || ""}</td>
        <td>${fruit.degats || 0}</td>
        <td>${fruit.debuff || 0}</td>
        <td>${fruit.buff || 0}</td>
        <td>${fruit.heal || 0}</td>
        <td>${fruit.pv || 0}</td>
      `
      fruitsBody.appendChild(row)
    }
  }

  // Mise à jour liste des races
  const racesBody = document.getElementById("liste-races-body")
  if (racesBody) {
    const races = Database.getRaces()
    racesBody.innerHTML = ""

    for (const id in races) {
      const race = races[id]
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${race.id}</td>
        <td>${race.name}</td>
        <td>${race.description || ""}</td>
        <td>${race.degats || 0}</td>
        <td>${race.debuff || 0}</td>
        <td>${race.buff || 0}</td>
        <td>${race.heal || 0}</td>
      `
      racesBody.appendChild(row)
    }
  }

  // Mise à jour liste des classes
  const classesBody = document.getElementById("liste-classes-body")
  if (classesBody) {
    const classes = Database.getClasses()
    classesBody.innerHTML = ""

    for (const id in classes) {
      const classe = classes[id]
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${classe.id}</td>
        <td>${classe.name}</td>
        <td>${classe.description || ""}</td>
        <td>${classe.degats || 0}</td>
        <td>${classe.debuff || 0}</td>
        <td>${classe.buff || 0}</td>
        <td>${classe.heal || 0}</td>
      `
      classesBody.appendChild(row)
    }
  }
}
