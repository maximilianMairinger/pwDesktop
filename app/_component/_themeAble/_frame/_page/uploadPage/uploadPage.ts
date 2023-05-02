import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"
import "./../../../_focusAble/_formUi/_editAble/input/input"
import Input from "./../../../_focusAble/_formUi/_editAble/input/input"
import "./../../../_focusAble/_formUi/_rippleButton/_blockButton/blockButton"
import Button from "./../../../_focusAble/_formUi/_rippleButton/_blockButton/blockButton"
import "./../../../textBlob/textBlob"
import "./../../../../form/form"
import Form from "./../../../../form/form"
import { com } from "../../../../../lib/com"
import * as domain from "./../../../../../lib/domain"
import type Path from "path"
import _path from "path-browserify"
const path = _path as unknown as typeof Path
import Popup, { popup } from "../../../popup/uiPopup/uiPopup"


console.log(new Popup())

class UploadPage extends Page {

  private encBtn = this.body.encryptBtn as Button
  private decBtn = this.body.decryptBtn as Button
  constructor() {
    super();

    // this.uploadElem.on("change" , (e) => {
    //   console.log(e)
    //   console.log(this.uploadElem.value)
    // })


    
    

    this.encBtn.click(async () => {


      const pop = popup("test", "test")
      // const file = await com.selectFile()
      // console.log(file)
      // const content = await com.readFile(file)
      // console.log(content)

      // const encrypted = await com.encryptFile(content, "test123")
      
      // console.log(encrypted)

      // const p = path.parse(file)

      // const newFile = await com.selectNewFile(`${extractNameFromFile(file)}.enc`)
      // console.log(newFile)

      // com.writeFile(newFile, encrypted)
    })

    this.decBtn.click(async () => {
      const file = await com.selectFile("enc")
      console.log(file)
      const content = await com.readFile(file)
      console.log(content)

      const decr = await com.decryptFile(content, "test123")
      console.log(decr)

      // const newFile = await com.selectNewFile(`${extractNameFromFile(file)}.decrypted`)
      // console.log(newFile)

      

      // com.writeFile(newFile, decr)
    })

  }


  stl() {
    return super.stl() + require("./uploadPage.css").toString()
  }
  pug() {
    return require("./uploadPage.pug").default
  }

}

export default declareComponent("upload-page", UploadPage)