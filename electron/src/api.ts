import {promises as fs} from 'fs';
import open from "open"
import crypto from "crypto"




const extension = ".enc"

export async function encryptFile(filePath: string, password: string) {
  const file = await fs.readFile(filePath)
  const iv = crypto.randomBytes(16)
  const salt = crypto.randomBytes(64)
  const key = crypto.scryptSync(password, salt, 32)
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)
  const encrypted = Buffer.concat([cipher.update(file), cipher.final()])
  const tag = cipher.getAuthTag()
  const encryptedFile = Buffer.concat([salt, iv, tag, encrypted])
  const encryptedFilePath = filePath + extension
  await fs.writeFile(encryptedFilePath, encryptedFile)

  console.log("encrypted file saved to", encryptedFilePath)
}


export async function decryptFile(filePath: string, password: string) {
  const encryptedFile = await fs.readFile(filePath)
  const salt = encryptedFile.slice(0, 64)
  const iv = encryptedFile.slice(64, 80)
  const tag = encryptedFile.slice(80, 96)
  const encrypted = encryptedFile.slice(96)
  const key = crypto.scryptSync(password, salt, 32)
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)
  decipher.setAuthTag(tag)
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
  const decryptedFilePath = filePath.slice(0, -extension.length) // remove .enc
  await fs.writeFile(decryptedFilePath, decrypted)
}


