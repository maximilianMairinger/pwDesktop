import { lang } from "./../../../../lib/lang"
import { Borrow } from "./../../../../lib/borrowMap"
import { site } from "./../../../../main"
import keyIndex from "key-index"
import declareComponent from "../../../../lib/declareComponent";
import Popup from "../popup";
import BlockButton from "../../_focusAble/_formUi/_rippleButton/_blockButton/blockButton";
import Input from "../../_focusAble/_formUi/_editAble/input/input";
import Form from "../../../form/form";
import TextBlob from "../../textBlob/textBlob";
import { Data } from "josm";
import { ReadonlyData } from "../../_focusAble/_formUi/formUi";
import ResablePromise from "../../../../lib/resablePromise";




export default class UiPopup extends Popup {
  private form: Form
  private container: HTMLElement
  private textBlob: TextBlob
  private confBtn: BlockButton
  private cancelBtn: BlockButton
  private input: Input


  constructor(heading?: string, text?: string, action?: {confirmText?: string, cancelText?: string} | {confirmText?: string, inputPlaceholder: string}) {
    super()


    this.form = new Form()
    this.body.body.append(this.form)
    this.container = ce("el-container")
    this.form.append(this.container)
    this.textBlob = new TextBlob()
    this.container.append(this.textBlob as any)
    this.confBtn = new BlockButton()
    this.form.submitElement(this.confBtn)
    this.container.append(this.confBtn.hide())
    this.cancelBtn = new BlockButton()
    this.container.append(this.cancelBtn.hide())
    this.input = new Input()
    this.container.append(this.input.hide())


    if (heading) this.heading(heading)
    if (text) this.content(text)
    if (action) this.action(action)


    this.form.submit(() => {
      this.done.res(this.input.value.get() || true)
      this.hide()
    })
    this.cancelBtn.click(() => {
      this.done.res(false)
      this.hide()
    })

  }

  heading(heading: string) {
    this.textBlob.heading(heading)
    return this
  }
  content(text: string) {
    this.textBlob.text(text)
    return this
  }
  action(action: {confirmText?: string, cancelText?: string} | {confirmText?: string, inputPlaceholder: string}) {
    this.input.hide()
    this.cancelBtn.hide()
    this.confBtn.content(action.confirmText || lang.confirm)

    if ("inputPlaceholder" in action) {
      this.input.show()
      this.input.placeholder(action.inputPlaceholder)
    }
    else {
      this.input.clear()
      this.input.hide()
    }
    if ("cancelText" in action) {
      this.cancelBtn.show()
      this.cancelBtn.text(action.cancelText)
    }
    else {
      this.cancelBtn.hide()
    }
    
    return this
  }



  

  
  stl() {
    return super.stl() + require("./uiPopup.css").toString()
  }
  
}
declareComponent("ui-pop-up", UiPopup)


const k = new Borrow(() => {
  const pop = new UiPopup()
  site.apd(pop)
  return pop
})



let showing = 0
export function popup(heading: string, text: string, action?: {confirmText?: string, cancelText?: string} | {confirmText?: string, inputPlaceholder: string}) {
  const { elem: pop, done } = k.borrow()

  const lastStillVis = showing > 0
  showing++


  pop.heading(heading)
  if (text) pop.content(text)
  if (action) pop.action(action)


  pop.done.then(() => {
    showing--
    done()
  })


  pop.show()

}

export function getPopup() {
  const pop = new Popup()
  site.apd(pop)

  return pop
}


