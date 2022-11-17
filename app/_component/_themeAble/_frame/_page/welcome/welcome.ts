import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"
import "./../../../_focusAble/_formUi/_editAble/input/input"
import Input from "./../../../_focusAble/_formUi/_editAble/input/input"
import "./../../../_focusAble/_formUi/_rippleButton/_blockButton/blockButton"
import "./../../../textBlob/textBlob"
import "./../../../../form/form"
import store, { doubleLink } from "./../../../../../lib/db"
import BlockButton from "./../../../_focusAble/_formUi/_rippleButton/_blockButton/blockButton"



class WelcomePage extends Page {
  defaultDomain = "welcome"

  constructor() {
    super();

    doubleLink(store.username, (this.body.username as Input).value);


    (this.body.username as Input).isEmpty.get((v) => {
      (this.body.btn as BlockButton).enabled.set(!v)
    })
    
  }


  stl() {
    return super.stl() + require("./welcome.css").toString()
  }
  pug() {
    return require("./welcome.pug").default
  }

}

export default declareComponent("welcome-page", WelcomePage)