const { app, BrowserWindow, ipcMain } = require('electron');
const os = require('os');
const path = require('path');
const { bytesToGigabytes, getCpuLoad, returnIpAddress } = require('./tools/tools');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  // mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('get-os-data', () => {
  const start = Date.now();

  const osData = {
    hostname: os.hostname(),
    username: os.userInfo().username,
    systemRoot: process.env.SystemRoot || path.join(os.homedir(), 'AppData', 'Local', 'Programs', 'Common', 'Microsoft', 'Windows'),
    osVersion: os.version(),
    cpuUsage: os.cpus(),
    cpuLoad: getCpuLoad().toFixed(2),
    memoryUsage: [bytesToGigabytes(os.totalmem() - os.freemem()), bytesToGigabytes(os.totalmem())],
    arch: os.arch(),
    ipAddress: returnIpAddress(),
    countCpus: os.cpus().length
  };

  const end = Date.now();
  const responseTime = end - start;
  osData.responseTime = responseTime;

  return osData;
});