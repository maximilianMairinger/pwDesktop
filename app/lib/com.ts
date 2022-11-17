import type * as API from "./../../electron/src/api"

export const com = new Proxy({}, {
  get(target, prop) {
    return (...args) => {
      send(prop as keyof typeof API, ...args)
    }
  }
}) as typeof API

function send(call: keyof typeof API, ...payload: any) {
  return (window as any).electronAPI[call](JSON.stringify(payload))
}

if ((window as any).electronAPI === undefined) {
  console.log("Not running in electron");

  (window as any).electronAPI = new Proxy({}, {
    get: (target, prop) => {
      return (args) => {
        console.log("dummy call:", prop, JSON.parse(args))
        return dummyFunc[prop] !== undefined ? dummyFunc[prop](JSON.parse(args)) : undefined
      }
    }
  })
}


const dummyFunc = {
  checkPassword: (a) => {
    return true
  }
}
