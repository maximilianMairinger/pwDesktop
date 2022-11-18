import type * as API from "./../../electron/src/api"

export const com = new Proxy({}, {
  get(target, prop) {
    return (...args) => {
      return send(prop as keyof typeof API, ...args)
    }
  }
}) as typeof API

function send(call: keyof typeof API, ...payload: any) {
  return (window as any).electronAPI[call](payload)
}

if ((window as any).electronAPI === undefined) {
  console.log("Not running in electron");

  const localCom = import("./localCom");

  (window as any).electronAPI = new Proxy({}, {
    get: (target, prop) => {
      return async (args) => {
        return await (await localCom)[prop](...args)
      }
    }
  })
}


