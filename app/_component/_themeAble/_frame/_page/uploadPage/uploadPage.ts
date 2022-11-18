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
import type { File } from "../../../../../../electron/src/api"
import path from "path"

function extractNameFromFile(file: File) {
  if (file instanceof FileSystemFileHandle) {
    return file.name
  }
  else if (typeof file === "string") {
    return path.basename(file)
  }
}


class UploadPage extends Page {

  private uploadElem = this.body.upload as Input
  private btnElem = this.body.btn as Button
  constructor() {
    super();

    // this.uploadElem.on("change" , (e) => {
    //   console.log(e)
    //   console.log(this.uploadElem.value)
    // })

    this.btnElem.on("click", async () => {
      const file = await com.selectFile()
      console.log(file)
      const content = await com.readFile(file)
      console.log(content)

      const encrypted = await com.encryptFile(content, "test123")
      console.log(encrypted)

      const newFile = await com.selectNewFile(`${extractNameFromFile(file)}.enc`)
      console.log(newFile)

      

      com.writeFile(newFile, encrypted)

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