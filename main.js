// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let bginfoWindow;
let reasonWindow;
let helpWindow;
let evaluationWindow;
let successWindow;
let statisticWindow;

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')

        }


    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
    }));


    bginfoWindow = new BrowserWindow({
        parent: mainWindow,
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')

        }

    });
    bginfoWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'taustatiedot.html'),
        protocol: 'file',
        slashes: true
    }));

    reasonWindow = new BrowserWindow({
        parent: mainWindow,
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')

        }

    });
    reasonWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'yhteydenottosyy.html'),
        protocol: 'file',
        slashes: true
    }));

    helpWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')

        }


    });

    helpWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'tarjottuapu.html'),
        protocol: 'file',
        slashes: true
    }));


    evaluationWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')

        }

    });

    evaluationWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'arvio.html'),
        protocol: 'file',
        slashes: true
    }));


    successWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')

        }

    });

    successWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'tallennusonnistui.html'),
        protocol: 'file',
        slashes: true
    }));

    statisticWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')

        }

    });

    statisticWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'tilastot.html'),
        protocol: 'file',
        slashes: true
    }));


    bginfoWindow.hide();
    reasonWindow.hide();
    helpWindow.hide();
    evaluationWindow.hide();
    successWindow.hide();
    statisticWindow.hide();

    mainWindow.webContents.openDevTools();
    bginfoWindow.webContents.openDevTools();
    reasonWindow.webContents.openDevTools();
    helpWindow.webContents.openDevTools();
    evaluationWindow.webContents.openDevTools();
    successWindow.webContents.openDevTools();
    statisticWindow.webContents.openDevTools();

}


ipcMain.on('clicked_contact', (event, arg) => {
    if (arg === 'ping') {
        console.log("Kirjaa yhteystieto -nappi");
        bginfoWindow.show();
    }
});

ipcMain.on('clicked_stat', (event, arg) => {
    if (arg === 'ping') {
        statisticWindow.show();
    }
});


ipcMain.on('clicked_quit', (event, arg) => {
    if (arg === 'ping') {
        console.log('Sulje-nappi');
        app.quit();
    }
});

ipcMain.on('clicked_cancel', (event, arg) => {
    if (arg === 'ping') {
        console.log('Peruuta-nappi');
        bginfoWindow.hide();
    }
});

ipcMain.on('clicked_next', (event, arg) => {
    if (arg === 'ping') {
        console.log('Seuraava-nappi');
        reasonWindow.show();
        bginfoWindow.hide();

    }
});

ipcMain.on('clicked_previous_r', (event, arg) => {
    if (arg === 'ping') {
        console.log('Edellinen-nappi');
        bginfoWindow.show();
        reasonWindow.hide();
    }
});

ipcMain.on('clicked_next_r', (event, arg) => {
    if (arg === 'ping') {
        console.log('Seuraava-nappi');

        helpWindow.show();
        bginfoWindow.hide();
        reasonWindow.hide();

    }
});


ipcMain.on('clicked_toMain', (event, arg) => {
    if (arg === 'ping') {
        console.log('Lopeta-nappi');
        reasonWindow.hide();
        bginfoWindow.hide();
        helpWindow.hide();
        evaluationWindow.hide();
        successWindow.hide();
        statisticWindow.hide();
    }
});

ipcMain.on('clicked_previous_help', (event, arg) => {
    if (arg === 'ping') {

        reasonWindow.show();
        helpWindow.hide();

    }
});

ipcMain.on('clicked_next_help', (event, arg) => {
    if (arg === 'ping') {
        evaluationWindow.show();
        bginfoWindow.hide();
        helpWindow.hide();
        reasonWindow.hide();

    }
});

ipcMain.on('clicked_previous_evaluation', (event, arg) => {
    if (arg === 'ping') {

        helpWindow.show();
        bginfoWindow.hide();
        reasonWindow.hide();
        evaluationWindow.hide();

    }
});

ipcMain.on('clicked_save', (event, arg) => {
    if (arg === 'ping') {

        successWindow.show();
        bginfoWindow.hide();
        reasonWindow.hide();
        evaluationWindow.hide();
        helpWindow.hide();

    }

});

ipcMain.on('clicked_previous_success', (event, arg) => {
    if (arg === 'ping') {

        evaluationWindow.show();
        bginfoWindow.hide();
        reasonWindow.hide();
        helpWindow.hide();
        successWindow.hide();

    }
});

ipcMain.on('clicked_checkbox_noanswer', (event, arg) => {
    if (arg === 'ping') {

        evaluationWindow.show();
        bginfoWindow.hide();
        reasonWindow.hide();
        helpWindow.hide();
        successWindow.hide();

    }
});

ipcMain.on('update-from-bg', (event, arg) => {
    evaluationWindow.webContents.send('action-update-bg', arg);
});

ipcMain.on('update-from-reason', (event, arg) => {
    evaluationWindow.webContents.send('action-update-reason', arg);
});

ipcMain.on('update-from-help', (event, arg) => {
    evaluationWindow.webContents.send('action-update-help', arg);
});

ipcMain.on('update-from-main', (event, arg) => {
    evaluationWindow.webContents.send('action-update-main', arg);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
