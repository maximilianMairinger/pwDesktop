
import type * as API from "./../../electron/src/api"
import type Cryptoo from "crypto"
import type {Buffer} from "buffer/"


import("crypto-browserify")
import("buffer/")

type File = FileSystemFileHandle & { createWritable(): Promise<any> }


const extIndex = {
  enc: {
    description: "Encrypted file",
    accept: {'multipart/encrypted': ['.enc']}
  },
  all: {
    // description: "All Files",
    // accept: ["*"]
  }
}

export async function selectNewFile(suggestedName: string, ext: keyof typeof extIndex = "all") {
  const handle = await (window as any).showSaveFilePicker({
    suggestedName: suggestedName,
    excludeAcceptAllOption: ext !== "all",
    types: ext !== "all" ? [extIndex[ext]] : [] 
  });
  return handle
}
export async function selectFile() {
  const [fileHandle] = await (window as any).showOpenFilePicker();
  return fileHandle as File
}
export async function writeFile(handle: File, content: Buffer) {
  const writable = await handle.createWritable();
  await writable.write(content);
  await writable.close();
}
export async function readFile(handle: File): Promise<Buffer> {
  const [file, Buffer] = await Promise.all([handle.getFile().then((file) => file.arrayBuffer() as Promise<ArrayBuffer>), import("buffer/")])
  return Buffer.Buffer.from(file);
}
export async function decryptFile(encryptedFile: Buffer, password: string) {
  const crypto = await import("crypto-js")

  
}

export async function encryptFile(file: Buffer, password: string) {
  const crypto = await import("crypto-browserify") as typeof Cryptoo

  const salt = crypto.randomBytes(64)
  const iv = crypto.randomBytes(16)
  const key = crypto.scryptSync(password, salt, 32)
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)
  const {Buffer} = await import("buffer/")
  const encrypted = Buffer.concat([cipher.update(file), cipher.final()])
  const tag = cipher.getAuthTag()
  const encryptedFile = Buffer.concat([salt, iv, tag, encrypted])
  return encryptedFile
}