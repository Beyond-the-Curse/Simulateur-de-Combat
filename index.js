const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const { Customtitlebar, Color } = require('custom-electron-titlebar');
const DiscordRPC = require('discord-rpc');

app.setAboutPanelOptions({
  applicationName: 'Beyond The Curse Calculator',
  applicationVersion: '1.0.2',
  copyright: 'Copyright © 2024 Beyond The Curse',
  authors: ['_ImDarling_'],
  website: 'https://github.com/Beyond-the-Curse'
});

let mainWindow;
let rpc;

// Configuration Discord RPC
const clientId = '1317783820438605865';

// Enregistrer les schémas Discord pour les boutons
DiscordRPC.register(clientId);

function initDiscordRPC() {
    rpc = new DiscordRPC.Client({ transport: 'ipc' });

    rpc.on('ready', () => {
        console.log('Discord RPC connecté avec succès !');
        console.log(`Authed for user ${rpc.user.username}#${rpc.user.discriminator}`);
        
        // Définir l'activité Discord
        setDiscordActivity();
        
        // Mettre à jour l'activité toutes les 15 secondes
        setInterval(() => {
            setDiscordActivity();
        }, 15000);
    });

    rpc.on('disconnected', () => {
        console.log('Discord RPC déconnecté');
        // Tentative de reconnexion après 5 secondes
        setTimeout(() => {
            if (rpc) {
                rpc.login({ clientId }).catch(err => {
                    console.log('Échec de reconnexion Discord RPC:', err.message);
                });
            }
        }, 5000);
    });

    // Se connecter à Discord
    rpc.login({ clientId }).catch(err => {
        console.log('Impossible de se connecter à Discord RPC:', err.message);
        console.log('Assurez-vous que Discord Desktop est ouvert et connecté');
    });
}

async function setDiscordActivity() {
    if (!rpc || !rpc.user) {
        return;
    }

    try {
        await rpc.setActivity({
            details: 'Coming soon...',
            state: 'In development',
            startTimestamp: Date.now(),
            largeImageKey: 'logo', // Nom de votre image sur Discord Developer Portal
            largeImageText: 'Beyond The Curse',
            buttons: [
                {
                    label: 'Discord',
                    url: 'https://discord.gg/tp7X8cEBKH'
                }
            ],
            instance: false
        });
    } catch (err) {
        console.error('❌ Erreur lors de la mise à jour de l\'activité Discord:', err);
    }
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1351,
        height: 870,
        minWidth: 1351,
        minHeight: 870,
        webPreferences: {
            nodeIntegration: true, // Pour utiliser Node.js dans le renderer process
            contextIsolation: false, // Pour permettre l'accès aux APIs Node.js
            preload: path.join(__dirname, 'src/assets/js/electron-imports.js'), // Précharger les APIs
            enableRemoteModule: true // Pour activer le module remote (si nécessaire)
        },
        frame: false, // Pour utiliser custom titlebar
        show: false, // Pour éviter de montrer la fenêtre avant qu'elle soit prête
        backgroundColor: '#ffffff', // Couleur de fond blanche
        icon: path.join(__dirname, 'src/assets/img/icon_256.ico'), // Optionnel
    });

    // Charger la page de connexion au démarrage
    mainWindow.loadFile('src/index.html');

    // Montrer la fenêtre une fois prête
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        // Initialiser Discord RPC après que la fenêtre soit prête
        setTimeout(() => {
            initDiscordRPC();
        }, 3000); // Délai plus long pour assurer la connexion
    });

    // DevTools pour le développement
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }
}

// IPC Handlers pour la communication entre renderer et main process
ipcMain.handle('navigate-to-page', async (event, page) => {
    const pagePath = path.join(__dirname, 'src/index.html');
    mainWindow.loadFile(pagePath);
});

ipcMain.handle('get-user-data-path', async () => {
    return app.getPath('userData');
});

ipcMain.handle('minimize-window', async () => {
    mainWindow.minimize();
});

ipcMain.handle('maximize-window', async () => {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow.maximize();
    }
});

ipcMain.handle('close-window', async () => {
    mainWindow.close();
});

// Nouveau handler pour mettre à jour le statut Discord depuis le renderer
ipcMain.handle('update-discord-activity', async (event, details, state) => {
    if (rpc && rpc.user) {
        try {
            await rpc.setActivity({
                details: details || 'Coming soon...',
                state: state || 'In development',
                startTimestamp: Date.now(),
                largeImageKey: 'logo',
                largeImageText: 'Beyond The Curse',
                buttons: [
                    {
                        label: 'Discord',
                        url: 'https://discord.gg/tp7X8cEBKH'
                    }
                ]
            });
            console.log('✅ Activité Discord mise à jour depuis renderer');
        } catch (err) {
            console.error('❌ Erreur mise à jour depuis renderer:', err);
        }
    }
});

// Events Electron
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    // Nettoyer Discord RPC avant de quitter
    if (rpc) {
        rpc.clearActivity();
        rpc.destroy();
    }
    
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on('before-quit', () => {
    // S'assurer que Discord RPC est nettoyé
    if (rpc) {
        rpc.clearActivity();
        rpc.destroy();
        rpc = null;
    }
});