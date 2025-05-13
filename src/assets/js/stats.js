// Structure de la base de données JSON
const defaultDatabase = {
  fruits: {
    gomu: {
      id: "gomu",
      name: "Gomu Gomu",
      description: "Fruit du caoutchouc qui rend le corps élastique.",
      degats: 80,
      debuff: 10,
      buff: 20,
      heal: 5,
      pv: 1000,
    },
    mera: {
      id: "mera",
      name: "Mera Mera",
      description: "Fruit du feu qui permet de créer et contrôler le feu.",
      degats: 100,
      debuff: 15,
      buff: 10,
      heal: 0,
      pv: 900,
    },
    hie: {
      id: "hie",
      name: "Hie Hie",
      description: "Fruit de la glace qui permet de créer et contrôler la glace.",
      degats: 90,
      debuff: 25,
      buff: 5,
      heal: 0,
      pv: 950,
    },
    gura: {
      id: "gura",
      name: "Gura Gura",
      description: "Fruit du tremblement qui permet de créer des séismes.",
      degats: 120,
      debuff: 20,
      buff: 0,
      heal: 0,
      pv: 1100,
    },
    ope: {
      id: "ope",
      name: "Ope Ope",
      description: "Fruit de l'opération qui permet de créer une \"salle d'opération\".",
      degats: 70,
      debuff: 30,
      buff: 15,
      heal: 20,
      pv: 850,
    },
    yami: {
      id: "yami",
      name: "Yami Yami",
      description: "Fruit des ténèbres qui permet de créer et contrôler les ténèbres.",
      degats: 110,
      debuff: 35,
      buff: 0,
      heal: 0,
      pv: 1000,
    },
  },
  capacites: {
    // Capacités par défaut
    cap0_niv1: {
      id: "cap0_niv1",
      type: "cap0",
      niveau: 1,
      nom: "Capacité 0 Niveau 1",
      description: "Description de la capacité 0 niveau 1",
    },
    cap0_niv2: {
      id: "cap0_niv2",
      type: "cap0",
      niveau: 2,
      nom: "Capacité 0 Niveau 2",
      description: "Description de la capacité 0 niveau 2",
    },
    cap0_niv3: {
      id: "cap0_niv3",
      type: "cap0",
      niveau: 3,
      nom: "Capacité 0 Niveau 3",
      description: "Description de la capacité 0 niveau 3",
    },
    cap1_niv1: {
      id: "cap1_niv1",
      type: "cap1",
      niveau: 1,
      nom: "Capacité 1 Niveau 1",
      description: "Description de la capacité 1 niveau 1",
    },
    cap1_niv2: {
      id: "cap1_niv2",
      type: "cap1",
      niveau: 2,
      nom: "Capacité 1 Niveau 2",
      description: "Description de la capacité 1 niveau 2",
    },
    cap1_niv3: {
      id: "cap1_niv3",
      type: "cap1",
      niveau: 3,
      nom: "Capacité 1 Niveau 3",
      description: "Description de la capacité 1 niveau 3",
    },
  },
  paliers: {
    palier1: {
      id: "palier1",
      niveau: 1,
      pv: 100,
      description: "Palier de base, le joueur a 100 PV."
    },
    palier10: {
      id: "palier10",
      niveau: 10,
      pv: 200,
      description: "Palier intermédiaire, le joueur a 200 PV."
    },
    palier20: {
      id: "palier20",
      niveau: 20,
      pv: 300,
      description: "Palier avancé, le joueur a 300 PV."
    },
    palier30: {
      id: "palier30",
      niveau: 30,
      pv: 400,
      description: "Palier expert, le joueur a 400 PV."
    },
    palier40: {
      id: "palier40",
      niveau: 40,
      pv: 500,
      description: "Palier maître, le joueur a 500 PV."
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

        // Vérifier si la structure capacites existe, sinon l'ajouter
        if (!this.data.capacites) {
          this.data.capacites = defaultDatabase.capacites
          this.save()
        }

        // Vérifier si la structure paliers existe, sinon l'ajouter
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

  // Obtenir toutes les capacités
  getCapacites() {
    return this.data.capacites || {}
  },

  // Obtenir les capacités par type
  getCapacitesByType(type) {
    const capacites = this.getCapacites()
    const result = {}

    for (const id in capacites) {
      if (capacites[id].type === type) {
        result[id] = capacites[id]
      }
    }

    return result
  },

  // Obtenir une capacité spécifique
  getCapacite(id) {
    return this.data.capacites ? this.data.capacites[id] : null
  },

  // Mettre à jour une capacité
  updateCapacite(id, capaciteData) {
    if (!this.data.capacites) {
      this.data.capacites = {}
    }

    this.data.capacites[id] = { ...capaciteData, id }
    return this.save()
  },

  // Ajouter une nouvelle capacité
  addCapacite(id, capaciteData) {
    if (!this.data.capacites) {
      this.data.capacites = {}
    }

    if (this.data.capacites[id]) {
      return false // ID déjà existant
    }

    this.data.capacites[id] = { ...capaciteData, id }
    return this.save()
  },

  // Supprimer une capacité
  deleteCapacite(id) {
    if (!this.data.capacites || !this.data.capacites[id]) {
      return false // Capacité inexistante
    }

    delete this.data.capacites[id]
    return this.save()
  },

  // Importer les capacités
  importCapacites(capacitesData) {
    this.data.capacites = capacitesData
    return this.save()
  },

  // Obtenir tous les paliers
  getPaliers() {
    return this.data.paliers || {}
  },

  // Obtenir un palier spécifique
  getPalier(id) {
    return this.data.paliers ? this.data.paliers[id] : null
  },

  // Mettre à jour un palier
  updatePalier(id, palierData) {
    if (!this.data.paliers) {
      this.data.paliers = {}
    }

    this.data.paliers[id] = { ...palierData, id }
    return this.save()
  },

  // Ajouter un nouveau palier
  addPalier(id, palierData) {
    if (!this.data.paliers) {
      this.data.paliers = {}
    }

    if (this.data.paliers[id]) {
      return false // ID déjà existant
    }

    this.data.paliers[id] = { ...palierData, id }
    return this.save()
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
    return this.data.history
  },

  // Ajouter un combat à l'historique
  addCombat(combatData) {
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
      if (!parsedData.fruits || !parsedData.history) {
        throw new Error("Format de données invalide")
      }

      this.data = parsedData

      // S'assurer que la structure capacites existe
      if (!this.data.capacites) {
        this.data.capacites = defaultDatabase.capacites
      }

      // S'assurer que la structure paliers existe
      if (!this.data.paliers) {
        this.data.paliers = defaultDatabase.paliers
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

      // Mettre à jour le JSON dans l'éditeur
      if (pageId === "modif-stats") {
        document.getElementById("database-json").value = Database.export()
      }

      // Mettre à jour la liste des capacités
      if (pageId === "modif-capacites") {
        updateCapacitesList()
      }

      // Mettre à jour la liste des paliers
      if (pageId === "modif-paliers") {
        updatePaliersList()
      }
    })
  })

  // Pré-remplir les champs en fonction du FDD sélectionné
  document.getElementById("p1-fdd").addEventListener("change", function () {
    const selectedFruit = this.value
    const fruit = Database.getFruit(selectedFruit)

    if (fruit) {
      document.getElementById("p1-degats").value = fruit.degats
      document.getElementById("p1-debuff").value = fruit.debuff
      document.getElementById("p1-buff").value = fruit.buff
      document.getElementById("p1-heal-user").value = fruit.heal

      // Calculer PV MAX en fonction du palier
      const palier = document.getElementById("p1-palier").value || 1
      document.getElementById("p1-pv-max").value = fruit.pv * palier
    }
  })

  document.getElementById("p2-fdd").addEventListener("change", function () {
    const selectedFruit = this.value
    const fruit = Database.getFruit(selectedFruit)

    if (fruit) {
      document.getElementById("p2-degats").value = fruit.degats
      document.getElementById("p2-debuff").value = fruit.debuff
      document.getElementById("p2-buff").value = fruit.buff
      document.getElementById("p2-heal-user").value = fruit.heal

      // Calculer PV MAX en fonction du palier
      const palier = document.getElementById("p2-palier").value || 1
      document.getElementById("p2-pv-max").value = fruit.pv * palier
    }
  })

  // Ajuster PV MAX quand le palier change
  document.getElementById("p1-palier").addEventListener("change", function () {
    const selectedFruit = document.getElementById("p1-fdd").value
    const selectedPalier = Number.parseInt(this.value) || 1
    const fruit = Database.getFruit(selectedFruit)

    if (fruit) {
      // Rechercher le palier sélectionné dans la base de données
      const paliers = Database.getPaliers()
      const pvMultiplier = 1

      // Trouver le palier correspondant
      for (const id in paliers) {
        if (paliers[id].niveau === selectedPalier) {
          // Utiliser directement la valeur de PV du palier
          document.getElementById("p1-pv-max").value = paliers[id].pv
          return
        }
      }

      // Si palier non trouvé, utiliser la méthode précédente comme fallback
      document.getElementById("p1-pv-max").value = fruit.pv * selectedPalier
    }
  })

  document.getElementById("p2-palier").addEventListener("change", function () {
    const selectedFruit = document.getElementById("p2-fdd").value
    const selectedPalier = Number.parseInt(this.value) || 1
    const fruit = Database.getFruit(selectedFruit)

    if (fruit) {
      // Rechercher le palier sélectionné dans la base de données
      const paliers = Database.getPaliers()
      const pvMultiplier = 1

      // Trouver le palier correspondant
      for (const id in paliers) {
        if (paliers[id].niveau === selectedPalier) {
          // Utiliser directement la valeur de PV du palier
          document.getElementById("p2-pv-max").value = paliers[id].pv
          return
        }
      }

      // Si palier non trouvé, utiliser la méthode précédente comme fallback
      document.getElementById("p2-pv-max").value = fruit.pv * selectedPalier
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
      degats: Number.parseFloat(document.getElementById("p1-degats").value) || 0,
      healUser: Number.parseFloat(document.getElementById("p1-heal-user").value) || 0,
      pvMax: Number.parseFloat(document.getElementById("p1-pv-max").value) || 1000,
    }

    const p2 = {
      nom: document.getElementById("p2-nom").value || "Joueur 2",
      fdd: document.getElementById("p2-fdd").value,
      fddName: document.getElementById("p2-fdd").options[document.getElementById("p2-fdd").selectedIndex].text,
      degats: Number.parseFloat(document.getElementById("p2-degats").value) || 0,
      healUser: Number.parseFloat(document.getElementById("p2-heal-user").value) || 0,
      pvMax: Number.parseFloat(document.getElementById("p2-pv-max").value) || 1000,
    }

    // Calculer selon la formule donnée
    // Elément 1 : Dégâts/min-60% = VAR 1, Heal Utilisateur = VAR 1.5, PV MAX Elément 1 = VARPV1
    const var1 = p1.degats * 0.4 // Dégâts/min-60%
    const var1_5 = p1.healUser
    const varpv1 = p1.pvMax

    // Elément 2 : Dégâts/min-60% = VAR 2, Heal Utilisateur = VAR 2.5, PV MAX Elément 2 = VARPV2
    const var2 = p2.degats * 0.4 // Dégâts/min-60%
    const var2_5 = p2.healUser
    const varpv2 = p2.pvMax

    // Elément 1 VS Elément 2
    // VAR 1 - VAR 2.5 = VAR_DEGATSFINAUX1
    const var_degatsfinaux1 = var1 - var2_5
    // (VARPV2 / VAR_DEGATSFINAUX1) = Temps Combat 1
    const tempsCombat1 = var_degatsfinaux1 > 0 ? varpv2 / var_degatsfinaux1 : Number.POSITIVE_INFINITY

    // VAR 2- VAR 1.5 = VAR_DEGATSFINAUX2
    const var_degatsfinaux2 = var2 - var1_5
    // (VARPV1/ VAR_DEGATSFINAUX2) = Temps Combat 2
    const tempsCombat2 = var_degatsfinaux2 > 0 ? varpv1 / var_degatsfinaux2 : Number.POSITIVE_INFINITY

    // Si "Temps combat 1" < "Temps combat 2", alors Temps combat 1 à gagné. Inversement sinon.
    let winner, loser, winnerTime, loserTime

    if (tempsCombat1 < tempsCombat2) {
      winner = p1
      loser = p2
      winnerTime = tempsCombat1
      loserTime = tempsCombat2
    } else {
      winner = p2
      loser = p1
      winnerTime = tempsCombat2
      loserTime = tempsCombat1
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
                            <li>Dégâts/min: ${p1.degats}</li>
                            <li>Dégâts/min après réduction (40%): ${var1.toFixed(2)}</li>
                            <li>Heal Utilisateur: ${var1_5}</li>
                            <li>PV MAX: ${varpv1}</li>
                            <li>Temps pour vaincre l'adversaire: ${tempsCombat1 === Number.POSITIVE_INFINITY ? "∞" : tempsCombat1.toFixed(2)} minutes</li>
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <h4>${p2.nom} (${p2.fddName})</h4>
                        <ul class="list-unstyled">
                            <li>Dégâts/min: ${p2.degats}</li>
                            <li>Dégâts/min après réduction (40%): ${var2.toFixed(2)}</li>
                            <li>Heal Utilisateur: ${var2_5}</li>
                            <li>PV MAX: ${varpv2}</li>
                            <li>Temps pour vaincre l'adversaire: ${tempsCombat2 === Number.POSITIVE_INFINITY ? "∞" : tempsCombat2.toFixed(2)} minutes</li>
                        </ul>
                    </div>
                </div>
                <div class="mt-4 p-3 bg-light rounded">
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
      document.getElementById("fruit-degats").value = fruit.degats
      document.getElementById("fruit-debuff").value = fruit.debuff
      document.getElementById("fruit-buff").value = fruit.buff
      document.getElementById("fruit-heal").value = fruit.heal
      document.getElementById("fruit-pv").value = fruit.pv
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

  // Gestion des capacités

  // Sélection d'une capacité
  document.getElementById("capacite-select").addEventListener("change", function () {
    const selectedCapacite = this.value
    const capacite = Database.getCapacite(selectedCapacite)

    if (capacite) {
      document.getElementById("capacite-niveau").value = capacite.niveau
      document.getElementById("capacite-nom").value = capacite.nom
      document.getElementById("capacite-description").value = capacite.description || ""
      document.getElementById("capacite-type").value = capacite.type
    }
  })

  // Modification d'une capacité
  document.getElementById("capacite-edit-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const selectedCapacite = document.getElementById("capacite-select").value

    if (selectedCapacite) {
      const capacite = Database.getCapacite(selectedCapacite)
      if (capacite) {
        const updatedCapacite = {
          ...capacite,
          niveau: Number.parseInt(document.getElementById("capacite-niveau").value) || 1,
          nom: document.getElementById("capacite-nom").value,
          description: document.getElementById("capacite-description").value,
          type: document.getElementById("capacite-type").value,
        }

        if (Database.updateCapacite(selectedCapacite, updatedCapacite)) {
          alert(`La capacité ${updatedCapacite.nom} a été mise à jour.`)
          updateCapacitesList()
          updateCapacitesOptions()
        } else {
          alert("Une erreur s'est produite lors de la mise à jour de la capacité.")
        }
      }
    } else {
      alert("Veuillez sélectionner une capacité à modifier.")
    }
  })

  // Suppression d'une capacité
  document.getElementById("delete-capacite").addEventListener("click", () => {
    const selectedCapacite = document.getElementById("capacite-select").value

    if (selectedCapacite) {
      const capacite = Database.getCapacite(selectedCapacite)
      if (capacite) {
        if (confirm(`Êtes-vous sûr de vouloir supprimer la capacité ${capacite.nom} ?`)) {
          if (Database.deleteCapacite(selectedCapacite)) {
            alert(`La capacité ${capacite.nom} a été supprimée avec succès.`)
            updateCapacitesList()
            updateCapacitesOptions()

            // Réinitialiser le formulaire
            document.getElementById("capacite-select").selectedIndex = 0
            document.getElementById("capacite-niveau").value = "1"
            document.getElementById("capacite-nom").value = ""
            document.getElementById("capacite-description").value = ""
            document.getElementById("capacite-type").value = "cap0"
          } else {
            alert("Une erreur s'est produite lors de la suppression de la capacité.")
          }
        }
      }
    } else {
      alert("Veuillez sélectionner une capacité à supprimer.")
    }
  })

  // Ajout d'une nouvelle capacité
  document.getElementById("new-capacite-form").addEventListener("submit", function (e) {
    e.preventDefault()
    const capaciteId = document.getElementById("new-capacite-id").value.trim()
    const capaciteNom = document.getElementById("new-capacite-nom").value.trim()

    if (capaciteId && capaciteNom) {
      // Vérifier si l'ID existe déjà
      if (Database.getCapacite(capaciteId)) {
        alert(`Une capacité avec l'ID "${capaciteId}" existe déjà. Veuillez choisir un autre ID.`)
        return
      }

      const newCapacite = {
        id: capaciteId,
        niveau: Number.parseInt(document.getElementById("new-capacite-niveau").value) || 1,
        nom: capaciteNom,
        description: document.getElementById("new-capacite-description").value,
        type: document.getElementById("new-capacite-type").value,
      }

      if (Database.addCapacite(capaciteId, newCapacite)) {
        alert(`La capacité ${capaciteNom} a été ajoutée avec succès.`)
        updateCapacitesList()
        updateCapacitesOptions()
        this.reset()
      } else {
        alert("Une erreur s'est produite lors de l'ajout de la capacité.")
      }
    }
  })

  // Export des capacités
  document.getElementById("export-capacites").addEventListener("click", () => {
    const capacites = Database.getCapacites()
    const jsonBlob = new Blob([JSON.stringify(capacites, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(jsonBlob)

    const a = document.createElement("a")
    a.href = url
    a.download = "beyond-the-curse-capacites.json"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  })

  // Import des capacités
  document.getElementById("import-capacites").addEventListener("click", () => {
    const fileInput = document.getElementById("import-capacites-file")
    if (fileInput.files.length === 0) {
      alert("Veuillez sélectionner un fichier JSON.")
      return
    }

    const file = fileInput.files[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const capacitesData = JSON.parse(e.target.result)
        if (Database.importCapacites(capacitesData)) {
          alert("Capacités importées avec succès.")
          updateCapacitesList()
          updateCapacitesOptions()
        } else {
          alert("Erreur lors de l'importation des capacités.")
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

        if (Database.updatePalier(selectedPalier, updatedPalier)) {
          alert(`Le palier ${updatedPalier.niveau} a été mis à jour.`)
          updatePaliersList()
          updatePaliersOptions()
        } else {
          alert("Une erreur s'est produite lors de la mise à jour du palier.")
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
      // Vérifier si l'ID existe déjà
      if (Database.getPalier(palierId)) {
        alert(`Un palier avec l'ID "${palierId}" existe déjà. Veuillez choisir un autre ID.`)
        return
      }

      const newPalier = {
        id: palierId,
        niveau: palierNiveau,
        pv: Number.parseInt(document.getElementById("new-palier-pv").value) || 100,
        description: document.getElementById("new-palier-description").value || `Palier ${palierNiveau}, le joueur a ${document.getElementById("new-palier-pv").value || 100} PV.`,
      }

      if (Database.addPalier(palierId, newPalier)) {
        alert(`Le palier ${palierNiveau} a été ajouté avec succès.`)
        updatePaliersList()
        updatePaliersOptions()
        this.reset()
      } else {
        alert("Une erreur s'est produite lors de l'ajout du palier.")
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
})

// Fonctions utilitaires

// Mettre à jour l'interface utilisateur avec les données de la base de données
function updateUI() {
  updateFruitOptions()
  updateFruitDisplay()
  updateCombatHistory()
  updateCapacitesOptions()
  updatePaliersOptions()
  updatePaliersList()

  // Mettre à jour le JSON dans l'éditeur
  if (document.getElementById("modif-stats").classList.contains("active")) {
    document.getElementById("database-json").value = Database.export()
  }

  // Mettre à jour la liste des capacités
  if (document.getElementById("modif-capacites").classList.contains("active")) {
    updateCapacitesList()
  }
}

// Mettre à jour les options de sélection des fruits
function updateFruitOptions() {
  const fruits = Database.getFruits()
  const fruitSelects = ["p1-fdd", "p2-fdd", "fruit-select"]

  fruitSelects.forEach((selectId) => {
    const select = document.getElementById(selectId)

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

// Mettre à jour l'affichage des fruits
function updateFruitDisplay() {
  const fruits = Database.getFruits()
  const fruitContainer = document.getElementById("fruits-container")
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
                            <li>Dégâts/min: ${fruit.degats}</li>
                            <li>Debuff Entités: ${fruit.debuff}</li>
                            <li>Buff Utilisateur: ${fruit.buff}</li>
                            <li>Heal Utilisateur: ${fruit.heal}</li>
                            <li>PV MAX (Palier 1): ${fruit.pv}</li>
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
                    <small class="text-muted">${date}</small>
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
                <div class="mt-3 p-2 bg-light rounded">
                    <h5 class="winner">Vainqueur: ${winner.nom} (${winner.fddName})</h5>
                    <p>Temps: ${combat.winnerTime === Number.POSITIVE_INFINITY ? "∞" : combat.winnerTime.toFixed(2)} minutes contre ${combat.loserTime === Number.POSITIVE_INFINITY ? "∞" : combat.loserTime.toFixed(2)} minutes</p>
                </div>
            </div>
        `
  })

  historyList.innerHTML = historyHTML
}

// Mettre à jour la liste des capacités
function updateCapacitesList() {
  const capacites = Database.getCapacites()
  const capacitesList = document.getElementById("capacites-list")
  const capaciteSelect = document.getElementById("capacite-select")

  // Vider la liste des capacités
  capacitesList.innerHTML = ""

  // Vider le select sauf la première option
  while (capaciteSelect.options.length > 1) {
    capaciteSelect.remove(1)
  }

  // Ajouter les capacités à la liste et au select
  for (const id in capacites) {
    const capacite = capacites[id]

    // Ajouter à la liste
    const row = document.createElement("tr")
    row.innerHTML = `
            <td>${capacite.id}</td>
            <td>${capacite.type}</td>
            <td>${capacite.niveau}</td>
            <td>${capacite.nom}</td>
            <td>${capacite.description || ""}</td>
        `
    capacitesList.appendChild(row)

    // Ajouter au select
    const option = document.createElement("option")
    option.value = id
    option.textContent = `${capacite.nom} (${capacite.type}, Niveau ${capacite.niveau})`
    capaciteSelect.appendChild(option)
  }
}

// Mettre à jour les options de sélection des capacités
function updateCapacitesOptions() {
  const capacites = Database.getCapacites()
  const capTypes = ["cap0", "cap1", "cap2", "cap3", "cap4", "cap5"]

  // Pour chaque type de capacité
  capTypes.forEach((type) => {
    // Sélectionner tous les selects pour ce type (p1 et p2)
    const selects = [document.getElementById(`p1-${type}`), document.getElementById(`p2-${type}`)]

    selects.forEach((select) => {
      if (select) {
        // Vider le select sauf la première option
        while (select.options.length > 1) {
          select.remove(1)
        }

        // Filtrer les capacités par type
        for (const id in capacites) {
          const capacite = capacites[id]
          if (capacite.type === type) {
            const option = document.createElement("option")
            option.value = id
            option.textContent = `${capacite.nom} (Niveau ${capacite.niveau})`
            select.appendChild(option)
          }
        }
      }
    })
  })
}

// Mettre à jour la liste des paliers
function updatePaliersList() {
  const paliers = Database.getPaliers()
  const paliersList = document.getElementById("paliers-list")
  const palierSelect = document.getElementById("palier-select")

  // Vider la liste des paliers
  paliersList.innerHTML = ""

  // Vider le select sauf la première option
  while (palierSelect.options.length > 1) {
    palierSelect.remove(1)
  }

  // Ajouter les paliers à la liste et au select
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

    if (select) {
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
    }
  })
}