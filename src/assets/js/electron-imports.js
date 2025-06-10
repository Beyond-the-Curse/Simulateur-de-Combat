// Centralisation des imports Electron pour éviter les conflits

// Imports Electron
window.electronAPI = {
    ipcRenderer: require('electron').ipcRenderer,
    shell: require('electron').shell
};

// Imports Node.js
window.nodeAPI = {
    fs: require('fs'),
    path: require('path'),
    crypto: require('crypto'),
    https: require('https'),
    spawn: require('child_process').spawn
};

// URL constructor
window.URLConstructor = URL;

console.log('APIs centralisées chargées');