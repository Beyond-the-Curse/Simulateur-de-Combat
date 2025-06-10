// Theme Switcher - Détecte les périodes spéciales et change le thème du site
document.addEventListener("DOMContentLoaded", () => {
  // Fonction principale pour détecter et appliquer le thème
  function applySeasonalTheme() {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() // 0-11 (janvier = 0, décembre = 11)
    const currentDay = currentDate.getDate() // 1-31

    // Vérifier si nous sommes à Pâques (du 20 mars au 25 avril)
    if ((currentMonth === 2 && currentDay >= 20) || (currentMonth === 3 && currentDay <= 25)) {
      applyEasterTheme()
    }
    // Vérifier si nous sommes à Halloween (du 15 octobre au 1er novembre)
    else if ((currentMonth === 9 && currentDay >= 15) || (currentMonth === 10 && currentDay <= 1)) {
      applyHalloweenTheme()
    }
    // Vérifier si nous sommes à Noël (du 1er décembre au 25 décembre)
    else if (currentMonth === 11 && currentDay >= 1 && currentDay <= 25) {
      applyChristmasTheme()
    }
    // Vérifier si nous sommes au Nouvel An (du 26 décembre au 5 janvier)
    else if ((currentMonth === 11 && currentDay >= 26) || (currentMonth === 0 && currentDay <= 5)) {
      applyNewYearTheme()
    } else {
      // Si nous ne sommes pas dans une période spéciale, on peut restaurer le thème par défaut
      // ou ne rien faire si le thème par défaut est déjà appliqué
      removeSeasonalThemes()
    }
  }

  // Appliquer le thème Pâques
  function applyEasterTheme() {
    // Supprimer d'abord tous les thèmes saisonniers
    removeSeasonalThemes()

    // Ajouter la classe pour le thème Pâques
    document.body.classList.add("easter-theme")

    // Créer et ajouter la feuille de style pour Pâques
    const easterStyle = document.createElement("style")
    easterStyle.id = "seasonal-theme-css"
    easterStyle.textContent = `
      :root {
        --purple-primary: #6a0dad; /* Violet pastel pour Pâques */
        --light-purple: #f5f0ff; /* Violet très clair */
      }
      
      body.easter-theme {
        background-color: #fffef0;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="3" fill="%23ffcccc10"/><circle cx="5" cy="5" r="2" fill="%23ccffcc10"/><circle cx="35" cy="35" r="2" fill="%23ccccff10"/></svg>');
      }
      
      .header {
        background: linear-gradient(135deg, #ffcccc, #ccffcc, #ccccff) !important;
        position: relative;
        overflow: hidden;
      }
      
      .header::before {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
      }
      
      .header::after {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
      }
      
      .btn-purple {
        background-color: #6a0dad !important;
        border-color: #6a0dad !important;
      }
      
      .btn-purple:hover {
        background-color: #5a0b8d !important;
        border-color: #5a0b8d !important;
      }
      
      .combat-btn {
        background-color: #6a0dad !important;
      }
      
      .combat-btn:hover {
        background-color: #5a0b8d !important;
      }
      
      .winner {
        color: #6a0dad !important;
      }
      
      /* Bordures festives pour les cartes */
      .stats-card {
        border: 1px solid rgba(106, 13, 173, 0.2) !important;
        box-shadow: 0 4px 6px rgba(106, 13, 173, 0.1) !important;
        background-color: #ffffff !important;
        border-radius: 15px !important;
      }
      
      /* Couleur de fond pour la section de combat */
      .combat-section {
        background-color: #f0f8ff !important;
      }
      
      /* Animation d'œufs de Pâques flottants */
      .easter-egg {
        position: fixed;
        font-size: 1.5rem;
        z-index: 9998;
        pointer-events: none;
        animation: float-egg 15s ease-in-out infinite;
      }
      
      @keyframes float-egg {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
        }
        25% {
          transform: translateY(-20px) rotate(5deg);
        }
        50% {
          transform: translateY(0) rotate(0deg);
        }
        75% {
          transform: translateY(20px) rotate(-5deg);
        }
      }
      
      /* Styles pour les boutons de navigation */
      .header .btn {
        color: #6a0dad !important;
        font-weight: 600 !important;
      }
      
      .header .btn:hover, .header .btn.active {
        background-color: rgba(106, 13, 173, 0.2) !important;
      }
      
      /* Style pour les formulaires */
      .form-control, .form-select {
        border: 1px solid rgba(106, 13, 173, 0.2) !important;
      }
      
      .form-control:focus, .form-select:focus {
        border-color: rgba(106, 13, 173, 0.5) !important;
        box-shadow: 0 0 0 0.25rem rgba(106, 13, 173, 0.25) !important;
      }
    `
    document.head.appendChild(easterStyle)

    // Ajouter un message saisonnier
    addSeasonalMessage("🐰 Joyeuses Pâques ! 🥚")

    // Ajouter des œufs de Pâques flottants
    createFloatingEasterEggs()
  }

  // Appliquer le thème Halloween
  function applyHalloweenTheme() {
    // Supprimer d'abord tous les thèmes saisonniers
    removeSeasonalThemes()

    // Ajouter la classe pour le thème Halloween
    document.body.classList.add("halloween-theme")

    // Créer et ajouter la feuille de style pour Halloween
    const halloweenStyle = document.createElement("style")
    halloweenStyle.id = "seasonal-theme-css"
    halloweenStyle.textContent = `
      :root {
        --purple-primary: #ff6600; /* Orange pour Halloween */
        --light-purple: #fff0e6; /* Orange clair */
      }
      
      body.halloween-theme {
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M10,0 L20,10 L10,20 L0,10 Z" fill="%23ff660010"/></svg>');
      }
      
      .header {
        background-color: #1a1a1a !important; /* Noir pour Halloween */
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><path d="M15,5 L20,15 L15,25 L10,15 Z" fill="%23ff660030"/></svg>');
      }
      
      .btn-purple {
        background-color: #ff6600 !important;
        border-color: #ff6600 !important;
      }
      
      .btn-purple:hover {
        background-color: #e65c00 !important;
        border-color: #e65c00 !important;
      }
      
      .combat-btn {
        background-color: #ff6600 !important;
      }
      
      .combat-btn:hover {
        background-color: #e65c00 !important;
      }
      
      .winner {
        color: #ff6600 !important;
      }
      
      /* Ajouter des éléments décoratifs Halloween */
      .header::before {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
      }
      
      .header::after {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
      }
    `
    document.head.appendChild(halloweenStyle)

    // Ajouter un message saisonnier
    addSeasonalMessage("🎃 Joyeux Halloween ! 👻")
  }

  // Appliquer le thème Noël
  function applyChristmasTheme() {
    // Supprimer d'abord tous les thèmes saisonniers
    removeSeasonalThemes()

    // Ajouter la classe pour le thème Noël
    document.body.classList.add("christmas-theme")

    // Créer et ajouter la feuille de style pour Noël
    const christmasStyle = document.createElement("style")
    christmasStyle.id = "seasonal-theme-css"
    christmasStyle.textContent = `
      :root {
        --purple-primary: #c1121f; /* Rouge de Noël */
        --light-purple: #f8f9fa; /* Blanc neige */
      }
      
      body.christmas-theme {
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path d="M10,10 L10,0 M5,5 L15,15 M0,10 L20,10 M5,15 L15,5" stroke="%23c1121f10" stroke-width="1"/></svg>');
      }
      
      .header {
        background: linear-gradient(135deg, #c1121f, #165b33) !important; /* Dégradé rouge-vert */
        position: relative;
        overflow: hidden;
      }
      
      .header::before {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
      }
      
      .header::after {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
      }
      
      .btn-purple {
        background-color: #c1121f !important;
        border-color: #c1121f !important;
      }
      
      .btn-purple:hover {
        background-color: #a10f1a !important;
        border-color: #a10f1a !important;
      }
      
      .combat-btn {
        background-color: #c1121f !important;
      }
      
      .combat-btn:hover {
        background-color: #a10f1a !important;
      }
      
      .winner {
        color: #c1121f !important;
      }
      
      /* Flocons de neige */
      .snowflake {
        position: fixed;
        color: white;
        font-size: 1em;
        font-family: Arial, sans-serif;
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        z-index: 9998;
        pointer-events: none;
        opacity: 0.8;
        animation: snowfall linear infinite;
      }
      
      @keyframes snowfall {
        0% {
          transform: translateY(-100%) rotate(0deg);
        }
        100% {
          transform: translateY(100vh) rotate(360deg);
        }
      }
      
      /* Bordures festives pour les cartes */
      .stats-card {
        border: 1px solid rgba(193, 18, 31, 0.2) !important;
        box-shadow: 0 4px 6px rgba(193, 18, 31, 0.1) !important;
      }
      
      /* Couleur de fond pour la section de combat */
      .combat-section {
        background-color: rgba(22, 91, 51, 0.1) !important;
      }
    `
    document.head.appendChild(christmasStyle)

    // Ajouter un message saisonnier
    addSeasonalMessage("🎄 Joyeux Noël ! 🎁")

    // Ajouter des flocons de neige
    createSnowflakes()
  }

  // Appliquer le thème Nouvel An
  function applyNewYearTheme() {
    // Supprimer d'abord tous les thèmes saisonniers
    removeSeasonalThemes()

    // Ajouter la classe pour le thème Nouvel An
    document.body.classList.add("new-year-theme")

    // Créer et ajouter la feuille de style pour le Nouvel An
    const newYearStyle = document.createElement("style")
    newYearStyle.id = "seasonal-theme-css"
    newYearStyle.textContent = `
      :root {
        --purple-primary: #0066cc; /* Bleu festif */
        --light-purple: #e6f0ff; /* Bleu clair */
      }
      
      body.new-year-theme {
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="10" r="2" fill="%23ffd70010"/></svg>');
      }
      
      .header {
        background: linear-gradient(135deg, #0066cc, #003366) !important;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="3" fill="%23ffd70030"/></svg>');
      }
      
      .btn-purple {
        background-color: #0066cc !important;
        border-color: #0066cc !important;
      }
      
      .btn-purple:hover {
        background-color: #005bb8 !important;
        border-color: #005bb8 !important;
      }
      
      .combat-btn {
        background-color: #0066cc !important;
      }
      
      .combat-btn:hover {
        background-color: #005bb8 !important;
      }
      
      .winner {
        color: #0066cc !important;
      }
      
      /* Ajouter des éléments décoratifs Nouvel An */
      .header::before {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
      }
      
      .header::after {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 2rem;
      }
      
      /* Animation de confettis pour le Nouvel An */
      @keyframes confetti-fall {
        0% { transform: translateY(-100%) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
      }
      
      .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        background-color: gold;
        opacity: 0.8;
        animation: confetti-fall 8s linear infinite;
        z-index: 9998;
      }
    `
    document.head.appendChild(newYearStyle)

    // Ajouter un message saisonnier
    addSeasonalMessage("✨ Bonne Année ! 🎊")

    // Ajouter des confettis pour le Nouvel An
    createConfetti()
  }

  // Supprimer tous les thèmes saisonniers
  function removeSeasonalThemes() {
    // Supprimer les classes de thème du body
    document.body.classList.remove("halloween-theme", "christmas-theme", "new-year-theme", "easter-theme")

    // Supprimer la feuille de style saisonnière si elle existe
    const existingStyle = document.getElementById("seasonal-theme-css")
    if (existingStyle) {
      existingStyle.remove()
    }

    // Supprimer le message saisonnier s'il existe
    const seasonalMessage = document.getElementById("seasonal-message")
    if (seasonalMessage) {
      seasonalMessage.remove()
    }

    // Supprimer les confettis s'ils existent
    const confettis = document.querySelectorAll(".confetti")
    confettis.forEach((confetti) => confetti.remove())

    // Supprimer les flocons de neige s'ils existent
    const snowflakes = document.querySelectorAll(".snowflake")
    snowflakes.forEach((snowflake) => snowflake.remove())

    // Supprimer les œufs de Pâques s'ils existent
    const easterEggs = document.querySelectorAll(".easter-egg")
    easterEggs.forEach((egg) => egg.remove())
  }

  // Ajouter un message saisonnier en haut de la page
  function addSeasonalMessage(message) {
    // Supprimer le message existant s'il y en a un
    const existingMessage = document.getElementById("seasonal-message")
    if (existingMessage) {
      existingMessage.remove()
    }

    // Créer le nouvel élément de message
    const messageElement = document.createElement("div")
    messageElement.id = "seasonal-message"
    messageElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      text-align: center;
      padding: 8px;
      font-size: 1.2rem;
      z-index: 9999;
    `
    messageElement.textContent = message

    // Ajouter le message au body
    document.body.appendChild(messageElement)

    // Faire disparaître le message après 5 secondes
    setTimeout(() => {
      messageElement.style.opacity = "0"
      messageElement.style.transition = "opacity 1s ease"

      // Supprimer l'élément après la transition
      setTimeout(() => {
        if (messageElement.parentNode) {
          messageElement.remove()
        }
      }, 1000)
    }, 5000)
  }

  // Créer des confettis pour le Nouvel An
  function createConfetti() {
    const colors = ["#ffd700", "#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#00ffff"]
    const confettiCount = 50

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div")
      confetti.className = "confetti"
      confetti.style.left = `${Math.random() * 100}%`
      confetti.style.width = `${Math.random() * 10 + 5}px`
      confetti.style.height = `${Math.random() * 10 + 5}px`
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0"
      confetti.style.animationDelay = `${Math.random() * 5}s`
      confetti.style.animationDuration = `${Math.random() * 5 + 5}s`

      document.body.appendChild(confetti)
    }
  }

  // Créer des flocons de neige pour Noël
  function createSnowflakes() {
    const snowflakeChars = ["❄", "❅", "❆", "•"]
    const snowflakeCount = 40

    for (let i = 0; i < snowflakeCount; i++) {
      const snowflake = document.createElement("div")
      snowflake.className = "snowflake"
      snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)]
      snowflake.style.left = `${Math.random() * 100}%`
      snowflake.style.fontSize = `${Math.random() * 20 + 10}px`
      snowflake.style.animationDuration = `${Math.random() * 10 + 10}s`
      snowflake.style.animationDelay = `${Math.random() * 5}s`
      snowflake.style.opacity = Math.random() * 0.7 + 0.3

      document.body.appendChild(snowflake)
    }
  }

  // Créer des œufs de Pâques flottants
  function createFloatingEasterEggs() {
    const easterEmojis = ["🥚", "🐰", "🐣", "🌷", "🌸", "🐥"]
    const eggCount = 15

    for (let i = 0; i < eggCount; i++) {
      const egg = document.createElement("div")
      egg.className = "easter-egg"
      egg.textContent = easterEmojis[Math.floor(Math.random() * easterEmojis.length)]
      egg.style.left = `${Math.random() * 90 + 5}%`
      egg.style.top = `${Math.random() * 80 + 10}%`
      egg.style.animationDuration = `${Math.random() * 5 + 10}s`
      egg.style.animationDelay = `${Math.random() * 5}s`
      egg.style.opacity = Math.random() * 0.5 + 0.3

      document.body.appendChild(egg)
    }
  }

  // Fonction pour tester les thèmes (à utiliser uniquement pour le développement)

   // Fonction pour tester les thèmes (à utiliser uniquement pour le développement)

  // window.testThemes('halloween');  // Pour Halloween
  // window.testThemes('christmas');  // Pour Noël
  // window.testThemes('newyear');    // Pour le Nouvel An
  // window.testThemes('easter');     // Pour Pâques
  // window.testThemes();            // Pour revenir au thème normal

  window.testThemes = (theme) => {
    if (theme === "halloween") {
      applyHalloweenTheme()
    } else if (theme === "christmas") {
      applyChristmasTheme()
    } else if (theme === "newyear") {
      applyNewYearTheme()
    } else if (theme === "easter") {
      applyEasterTheme()
    } else {
      removeSeasonalThemes()
    }
  }

  // Gestion du thème sombre/clair
  const themeToggle = document.getElementById("theme-toggle-checkbox")

  // Fonction pour appliquer le thème sombre ou clair
  function applyTheme(isDark) {
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.setAttribute("data-theme", "light")
      localStorage.setItem("theme", "light")
    }
  }

  // Vérifier si l'utilisateur a déjà une préférence enregistrée
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    themeToggle.checked = true
    applyTheme(true)
  } else if (savedTheme === "light") {
    themeToggle.checked = false
    applyTheme(false)
  } else {
    // Si pas de préférence, utiliser la préférence du système
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    themeToggle.checked = prefersDarkScheme
    applyTheme(prefersDarkScheme)
  }

  // Écouter les changements du bouton toggle
  themeToggle.addEventListener("change", function () {
    applyTheme(this.checked)
  })

  // Appliquer le thème saisonnier au chargement de la page
  applySeasonalTheme()
})
