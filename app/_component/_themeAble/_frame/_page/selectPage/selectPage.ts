import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"
import "./../../../_focusAble/_formUi/_editAble/input/input"
import Input from "./../../../_focusAble/_formUi/_editAble/input/input"
import "./../../../_focusAble/_formUi/_rippleButton/_blockButton/blockButton"
import "./../../../textBlob/textBlob"
import "./../../../../form/form"
import store from "./../../../../../lib/db"
import RippleButton from "./../../../_focusAble/_formUi/_rippleButton/rippleButton"
import RandoClock from "./../../../../randoClock/randoClock"



class SelectPage extends Page {

  constructor() {
    super();

    (this.q("c-ripple-button", true) as any as RippleButton[]).forEach((btn) => {
      btn.userFeedbackMode.hover.set(false)
      btn.userFeedbackMode.ripple.set(true);
      (btn.childs("c-rando-clock", true) as any as RandoClock[]).forEach((clock) => {
        setTimeout(() => {
          clock.mockTurnSpeed(3000)
          clock.turnOnMockTurning()
        })
      })
    })

  }


  stl() {
    return super.stl() + require("./selectPage.css").toString()
  }
  pug() {
    return require("./selectPage.pug").default
  }

}

export default declareComponent("select-page", SelectPage)