import { wasHere } from "./../modeOptionPage/modeOptionPage"
import { declareComponent } from "../../../../../lib/declareComponent"
import Page from "../page"
import db, { doubleLink } from "./../../../../../lib/db"

import "./../../../_focusAble/_formUi/_rippleButton/_blockButton/blockButton"
import BlockButton from "./../../../_focusAble/_formUi/_rippleButton/_blockButton/blockButton"
import delay from "tiny-delay"
import * as domain from "../../../../../lib/domain"
import { linkRecord } from "../../../link/link"


abstract class GamePage extends Page {

  private btn = this.body.btn as BlockButton

  private evLs = document.body.on("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      this.continue()
      e.preventDefault()
    }
    else if (e.key === "?") {
      this.submitted = true
      this.tryAnswere()
      e.preventDefault()
    }
  }).deactivate()

  private escLs = document.body.on("keydown", (e) => {
    if (e.key === "Escape") {
      domain.set("../")
    }
  }).deactivate()

  private countDowns = this.q(".count")

  constructor(private storeName: keyof typeof db.msSettings) {
    super();

    linkRecord.add({link: "../", level: 0});
    
    (this.btn as any).click(() => {
      this.continue()
    })
  }
  abstract tryAnswere(): any
  abstract disableInputs(): any
  abstract enableInputs(): any
  abstract focusInputs(): any
  
  abstract clearInputs(): any
  abstract hideClocks(): any
  abstract showClocks(): any
  abstract rerenderClocks(): any

  async continue() {
    this.submitted = true
    this.btn.css({pointerEvents: "none"}).anim({opacity: 0})
    await this.tryAnswere()
    this.disableInputs()
    await this.body.rdy.anim([{opacity: 1, translateY: 7, offset: .1}, {opacity: 1, translateY: 13, offset: .9}, {opacity: 0, translateY: 20, offset: 1}], 600).then(() => {
      this.body.rdy.css({translateY: 0})
    })
    await delay(250)
    this.showClock()
  }


  activationCallback(active: boolean) {
    this.escLs.active(active)
    if (active) {
      this.btn.css({opacity: 0, pointerEvents: "none"})
      this.disableInputs()
      this.hideClocks()
      if (wasHere) {
        delay(350).then(() => {
          this.showClock()
        })
      }
      else {
        let durInc = 500;
        Promise.all(this.countDowns.map((elem) => {
          durInc += 1000
          return delay(durInc - 1500).then(() => elem.anim([{opacity: 1, translateY: 7, offset: .1}, {opacity: 1, translateY: 13, offset: .9}, {opacity: 0, translateY: 20, offset: 1}], 1200))
        })).then(() => {
          delay(100).then(() => {
            this.showClock()
            this.countDowns.forEach((elem) => elem.css({opacity: 0, translateY: 0}))
          })
        })
      }
    }
  }

  protected updateContentFunc = () => {}

  private submitted = false
  showClock() {
    this.evLs.deactivate()
    this.rerenderClocks()
    this.showClocks()
    delay(db.msSettings[this.storeName]).then(async () => {
      this.hideClocks()
      let lastHintDelay: any //CancelAblePromise
      let alreadyShown = true // gets turned false down below
      this.submitted = false
      this.updateContentFunc = () => {
        if (this.submitted) return
        if (alreadyShown) return
        if (lastHintDelay) lastHintDelay.cancel()
        lastHintDelay = delay(lastHintDelay === undefined ? 2000 : 1000)
        lastHintDelay.then(() => {
          alreadyShown = true
          if (!this.submitted) this.btn.css({pointerEvents: "all"}).anim({opacity: 1})
          this.updateContentFunc = () => {}
        })
      }
      
      this.clearInputs()
      alreadyShown = false
      this.updateContentFunc()
      this.enableInputs()
      this.focusInputs()
      this.evLs.activate()
    })
  }


  stl() {
    return super.stl() + require("./gamePage.css").toString()
  }
  pug() {
    return require("./gamePage.pug").default
  }

}

export default GamePage
