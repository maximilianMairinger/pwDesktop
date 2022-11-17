import { contextBridge, ipcRenderer } from 'electron'
import type * as API from "./api"
// const api = {send() {}};

type E = {[key in keyof typeof API]: any}

const funcNames: E = {
    checkPassword: ""
}


const o = {} as any
for (const a in funcNames) {
    o[a] = (...p) => ipcRenderer.invoke(a, ...p)
}



contextBridge.exposeInMainWorld('electronAPI', o)
