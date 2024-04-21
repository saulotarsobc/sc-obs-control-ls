/* eslint-disable @typescript-eslint/no-namespace */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ipcRenderer } from "electron";

declare global {
  namespace NodeJS {
    interface Global {
      API: any;
    }
  }
}

const db = {
  createUser: (data: {}) => ipcRenderer.sendSync("createUser", data),
};

const sys = {
  chooseFiles: () => ipcRenderer.sendSync("chooseFiles"),
};

process.once("loaded", () => {
  (global as any).api = { ipcRenderer, db, sys };
});
