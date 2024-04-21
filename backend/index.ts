import { ipcMain, IpcMainEvent } from "electron/main";
import { app, BrowserWindow } from "electron/main";
import { join } from "node:path";

import { isDev } from "./utils/env";
import { prepareNext } from "./utils/prepareNext";
import { initLogs } from "./utils/initLogs";

function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 400,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, "preload.js"),
    },
  });

  // win.setMenu(null);

  isDev && win.webContents.openDevTools();

  isDev
    ? win.loadURL("http://localhost:3000/")
    : win.loadFile(join(__dirname, "..", "frontend", "out", "index.html"));
}

app.whenReady().then(async () => {
  await prepareNext("./frontend", 3000);

  await initLogs();

  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

/* ++++++++++ code ++++++++++ */
ipcMain.on("target", (event: IpcMainEvent, data: {}) => {
  event.returnValue = data;
});
