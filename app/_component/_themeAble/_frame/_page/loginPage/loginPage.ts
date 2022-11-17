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



class LoginPage extends Page {
  defaultDomain = "login"

  private form = this.body.form as Form
  private btn = this.body.btn as Button
  constructor() {
    super();

    this.form.submitElement(this.btn)

    this.form.submit(async ({ password }) => {
      console.log("getting back", await com.decryptFile("/Users/maximilianmairinger/Desktop/sol.png.enc", password))
    })
  }


  stl() {
    return super.stl() + require("./loginPage.css").toString()
  }
  pug() {
    return require("./loginPage.pug").default
  }

}

export default declareComponent("login-page", LoginPage)