import { app, BrowserWindow, protocol } from 'electron'
import path from 'path'
import serve from 'electron-serve';

const loadURL = serve({directory: path.resolve('public')});



(async () => {
	await app.whenReady();

	const win = new BrowserWindow({
    width: 1200,
    height: 800,
  });
  win.webContents.openDevTools()

	await loadURL(win);
})();