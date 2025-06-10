// Easter Egg - Key Sequences
document.addEventListener("DOMContentLoaded", () => {
  // Variables pour suivre les séquences de touches
  let keySequence = []
  const btcSequence = ["b", "d", "p"]
  const darlingSequence = ["d", "a", "r", "l", "i", "n", "g"]
  let animationActive = false

  // Créer les éléments audio à l'avance
  const btcAudio = new Audio("assets/audio/btc.mp3")
  const idAudio = new Audio("assets/audio/ID.mp3")

  // Créer le conteneur pour l'animation du logo BTC
  const btcContainer = document.createElement("div")
  btcContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(93, 45, 167, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.5s ease;
  `
  document.body.appendChild(btcContainer)

  // Créer l'élément image du logo BTC
  const btcLogo = document.createElement("img")
  btcLogo.src = "assets/img/logo.png"
  btcLogo.alt = "Beyond The Curse"
  btcLogo.style.cssText = `
    max-width: 80%;
    max-height: 80%;
    transform: scale(0.1);
    opacity: 0;
    transition: transform 1s ease, opacity 1s ease;
  `
  btcContainer.appendChild(btcLogo)

  // Créer le conteneur pour l'animation Darling
  const darlingContainer = document.createElement("div")
  darlingContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.5s ease;
  `
  document.body.appendChild(darlingContainer)

  // Créer l'élément image pour Darling
  const idLogo = document.createElement("img")
  idLogo.src = "assets/img/ID.png"
  idLogo.alt = "Darling"
  idLogo.style.cssText = `
    max-width: 80%;
    max-height: 80%;
    transform: scale(0.1) rotate(-10deg);
    opacity: 0;
    transition: transform 1.2s ease, opacity 1.2s ease, rotate 1.5s ease;
  `
  darlingContainer.appendChild(idLogo)

  // Écouteur d'événement pour les touches
  document.addEventListener("keydown", (event) => {
    // Ignorer si l'animation est déjà active
    if (animationActive) return

    // Ajouter la touche à la séquence
    const key = event.key.toLowerCase()
    keySequence.push(key)

    // Limiter la taille de la séquence
    if (keySequence.length > 10) {
      keySequence.shift()
    }

    // Vérifier si la séquence BTC correspond
    if (endsWithSequence(keySequence, btcSequence)) {
      triggerBtcEasterEgg()
    }

    // Vérifier si la séquence DARLING correspond
    if (endsWithSequence(keySequence, darlingSequence)) {
      triggerDarlingEasterEgg()
    }
  })

  // Fonction pour vérifier si un tableau se termine par une séquence
  function endsWithSequence(arr, sequence) {
    if (arr.length < sequence.length) return false

    const startIndex = arr.length - sequence.length
    for (let i = 0; i < sequence.length; i++) {
      if (arr[startIndex + i] !== sequence[i]) return false
    }
    return true
  }

  // Fonction pour déclencher l'Easter Egg BTC
  function triggerBtcEasterEgg() {
    // Éviter les déclenchements multiples
    if (animationActive) return
    animationActive = true

    // Réinitialiser la séquence
    keySequence = []

    // Afficher le conteneur
    btcContainer.style.opacity = "1"

    // Jouer le son
    btcAudio.currentTime = 0
    btcAudio.play()

    // Animation du logo
    setTimeout(() => {
      btcLogo.style.transform = "scale(1)"
      btcLogo.style.opacity = "1"
    }, 100)

    // Masquer après 5 secondes
    setTimeout(() => {
      btcLogo.style.transform = "scale(1.5)"
      btcLogo.style.opacity = "0"

      setTimeout(() => {
        btcContainer.style.opacity = "0"

        // Réinitialiser après la fin de l'animation
        setTimeout(() => {
          btcLogo.style.transform = "scale(0.1)"
          animationActive = false
        }, 500)
      }, 1000)
    }, 5000)
  }

  // Fonction pour déclencher l'Easter Egg Darling
  function triggerDarlingEasterEgg() {
    // Éviter les déclenchements multiples
    if (animationActive) return
    animationActive = true

    // Réinitialiser la séquence
    keySequence = []

    // Afficher le conteneur
    darlingContainer.style.opacity = "1"

    // Jouer le son
    idAudio.currentTime = 0
    idAudio.play()

    // Animation du logo avec rotation
    setTimeout(() => {
      idLogo.style.transform = "scale(1) rotate(0deg)"
      idLogo.style.opacity = "1"
    }, 100)

    // Animation supplémentaire pendant l'affichage
    setTimeout(() => {
      idLogo.style.transform = "scale(1.1) rotate(5deg)"

      setTimeout(() => {
        idLogo.style.transform = "scale(1) rotate(-5deg)"

        setTimeout(() => {
          idLogo.style.transform = "scale(1.05) rotate(0deg)"
        }, 700)
      }, 700)
    }, 1500)

    // Masquer après 5 secondes
    setTimeout(() => {
      idLogo.style.transform = "scale(1.5) rotate(10deg)"
      idLogo.style.opacity = "0"

      setTimeout(() => {
        darlingContainer.style.opacity = "0"

        // Réinitialiser après la fin de l'animation
        setTimeout(() => {
          idLogo.style.transform = "scale(0.1) rotate(-10deg)"
          animationActive = false
        }, 500)
      }, 1000)
    }, 8000)
  }
})
