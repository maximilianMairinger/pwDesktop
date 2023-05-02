import {promises as fs} from 'fs';
import open from "open"
import crypto from "crypto"
import { dialog } from "electron"




const extension = ".enc"

export async function encryptFile(file: Buffer | ArrayBuffer, password: string) {
  const iv = crypto.randomBytes(16)
  const salt = crypto.randomBytes(64)
  const key = crypto.scryptSync(password, salt, 32)
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)
  const encrypted = Buffer.concat([cipher.update(file as Buffer), cipher.final()])
  const tag = cipher.getAuthTag()
  const encryptedFile = Buffer.concat([salt, iv, tag, encrypted])
  return encryptedFile
  // const encryptedFilePath = filePath + extension
  // await fs.writeFile(encryptedFilePath, encryptedFile)
  // console.log("encrypted file saved to", encryptedFilePath)
  // return true

  

}


export async function decryptFile(_encryptedFile: Buffer | ArrayBuffer, password: string) {
  const encryptedFile = _encryptedFile as Buffer;  
  const salt = encryptedFile.slice(0, 64)
  const iv = encryptedFile.slice(64, 80)
  const tag = encryptedFile.slice(80, 96)
  const encrypted = encryptedFile.slice(96)
  const key = crypto.scryptSync(password, salt, 32)
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)
  decipher.setAuthTag(tag)
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
  return decrypted
  // const decryptedFilePath = filePath.slice(0, -extension.length) // remove .enc
  // await fs.writeFile(decryptedFilePath, decrypted)
  // console.log("decrypting file saved to", decryptedFilePath)
  // return true
}


export async function selectFile(ext: keyof typeof extIndex = "all") {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [extIndex[ext]]
  })
  return result.filePaths[0]
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



export async function selectNewFile(suggestedPath: string, ext: keyof typeof extIndex = "all") {
  const result = await dialog.showSaveDialog({
    filters: [extIndex[ext]],
    defaultPath: suggestedPath,

  })
  return result.filePath
}

export async function writeFile(name: string, content: Buffer) {
  await fs.writeFile(name as string, content as Buffer)
}

export async function readFile(name: string) {
  return await fs.readFile(name as string) as Buffer
}

