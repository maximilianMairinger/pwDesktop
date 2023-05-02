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

  (window as any).electronAPI = new Proxy({}, {
    get: (target, prop) => {
      return (args) => {
        console.log("dummy call:", prop, args)
        return webFunc[prop] !== undefined ? webFunc[prop](...args) : undefined
      }
    }
  })
}

const extIndex = {
  enc: {
    name: "Encrypted file",
    extensions: ["enc"]
  },
  all: {
    name: "All Files",
    extensions: ["*"]
  }
}


type Optional<O extends object> = {
  [K in keyof O]?: O[K]
}

const webFunc: Optional<typeof API> = {
  
}
