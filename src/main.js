const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWin;

function createWin() {
    var mainWin = new BrowserWindow({
        width: 660,
        height: 400,
        minHeight: 350,
        minWidth: 600,
        title: '你猜',
        show: false,
    });

    mainWin.once('ready-to-show', () => {
        mainWin.show();
    });
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
        mainWin.loadURL('http://localhost:3000');
        mainWin.webContents.openDevTools();
    } else {
        mainWin.loadURL(`file://${path.resolve(__dirname, '../build/index.html')}`);
    }

    mainWin.on('closed', () => {
        mainWin = null;
    });
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWin === null) {
        createWin();
    }
});

app.on('ready', createWin);