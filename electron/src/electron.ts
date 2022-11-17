import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import serve from 'electron-serve';
import * as api from "./api"

const loadURL = serve({directory: path.resolve('public')});



(async () => {
	await app.whenReady();

	const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  win.webContents.openDevTools()


  for (const key in api) {
    ipcMain.handle(key, (event, a) => {
      return api[key](JSON.parse(a))
    })
  }

	await loadURL(win);
})();