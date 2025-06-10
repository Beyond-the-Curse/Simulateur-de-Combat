

document.addEventListener("DOMContentLoaded", () => {
  // Titlebar button handlers
  const minimizeBtn = document.getElementById("minimize-btn")
  const maximizeBtn = document.getElementById("maximize-btn")
  const closeBtn = document.getElementById("close-btn")

  if (minimizeBtn) {
    minimizeBtn.addEventListener("click", () => {
      window.electronAPI.ipcRenderer.invoke("minimize-window")
    })
  }

  if (maximizeBtn) {
    maximizeBtn.addEventListener("click", () => {
      window.electronAPI.ipcRenderer.invoke("maximize-window")
    })
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      window.electronAPI.ipcRenderer.invoke("close-window")
    })
  }
})
