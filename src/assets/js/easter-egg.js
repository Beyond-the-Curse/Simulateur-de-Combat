// Easter Egg - BTC Key Sequence
document.addEventListener("DOMContentLoaded", () => {
  // Variables pour suivre la séquence de touches
  let keySequence = []
  const targetSequence = ["b", "t", "c"]
  let animationActive = false

  // Créer l'élément audio à l'avance
  const btcAudio = new Audio("assets/audio/btc.mp3")

  // Créer le conteneur pour l'animation du logo
  const easterEggContainer = document.createElement("div")
  easterEggContainer.style.cssText = `
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
  document.body.appendChild(easterEggContainer)

  // Créer l'élément image du logo
  const logoImg = document.createElement("img")
  logoImg.src = "assets/img/logo.png"
  logoImg.alt = "Beyond The Curse"
  logoImg.style.cssText = `
    max-width: 80%;
    max-height: 80%;
    transform: scale(0.1);
    opacity: 0;
    transition: transform 1s ease, opacity 1s ease;
  `
  easterEggContainer.appendChild(logoImg)

  // Écouteur d'événement pour les touches
  document.addEventListener("keydown", (event) => {
    // Ignorer si l'animation est déjà active
    if (animationActive) return

    // Ajouter la touche à la séquence
    const key = event.key.toLowerCase()
    keySequence.push(key)

    // Ne garder que les 3 dernières touches
    if (keySequence.length > 3) {
      keySequence.shift()
    }

    // Vérifier si la séquence correspond
    if (arraysEqual(keySequence, targetSequence)) {
      triggerEasterEgg()
    }
  })

  // Fonction pour vérifier si deux tableaux sont égaux
  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false
    }
    return true
  }

  // Fonction pour déclencher l'Easter Egg
  function triggerEasterEgg() {
    // Éviter les déclenchements multiples
    if (animationActive) return
    animationActive = true

    // Réinitialiser la séquence
    keySequence = []

    // Afficher le conteneur
    easterEggContainer.style.opacity = "1"

    // Jouer le son
    btcAudio.currentTime = 0
    btcAudio.play()

    // Animation du logo
    setTimeout(() => {
      logoImg.style.transform = "scale(1)"
      logoImg.style.opacity = "1"
    }, 100)

    // Masquer après 8 secondes (pour une durée totale de ~10 secondes avec les transitions)
    setTimeout(() => {
      logoImg.style.transform = "scale(1.5)"
      logoImg.style.opacity = "0"

      setTimeout(() => {
        easterEggContainer.style.opacity = "0"

        // Réinitialiser après la fin de l'animation
        setTimeout(() => {
          logoImg.style.transform = "scale(0.1)"
          animationActive = false
        }, 500)
      }, 1000)
    }, 8000)
  }
})
