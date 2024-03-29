import declareComponent from "../../../../../lib/declareComponent";
import FormUi from "../formUi";
import Button from "../../_button/button"
import { PrimElem, Token, VariableLibrary } from "extended-dom";
import { Token as TToken } from "fast-linked-list"





//@ts-ignore
export default class UiButton extends FormUi<Button> {
  protected button: Button

  constructor() {
    const button = new Button()
    super(button)

    this.sra(ce("slot"))
    
    // const observer = new MutationObserver(this.mutateChildsCb.bind(this))
    // observer.observe(this, { attributes: false, childList: true, subtree: false });



    this.button = button
    button.userFeedbackMode.focus.set(false)

    this.validMouseButtons = button.validMouseButtons


    let keyPressed = false
    this.on("keydown", (e) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault()
        if (!keyPressed) {
          keyPressed = true
          this.initRipple(e)
        }
      }
    }, {capture: true})
    this.on("keyup", (e) => {
      if (e.key === " " || e.key === "Enter") keyPressed = false
    })

    this.enabled.get(this.button.enabled.set.bind(this.button.enabled))
  }

  // private mutateChildsCb() {
  //   const childs = this.childNodes as any
  //   console.log(childs, this.moveBody)
  //   debugger
  //   this.moveBody.append(...childs)
  // }

  // connectedCallback() {
  //   this.mutateChildsCb()
  // }


  
  public link: ((() => string) & ((to: null) => this) & ((to: string, domainLevel?: number, push?: boolean, notify?: boolean) => this))
  public addActivationCallback?<CB extends (e: MouseEvent | KeyboardEvent | undefined) => void>(cb: CB): CB
  public removeActivationCallback?<CB extends (e: MouseEvent | KeyboardEvent | undefined) => void>(cb: CB): CB
  public click?<CB extends (e?: MouseEvent | KeyboardEvent) => void>(f: CB): TToken<CB>
  public click?(e?: MouseEvent | KeyboardEvent): Promise<any[]>
  public hotkey?(key: string): void

  disable() {
    this.enabled.set(false)
  }
  enable() {
    this.enabled.set(true)
  }
  


  set tabIndex(to: number) {
    this.componentBody.tabIndex = to
  }
  get tabIndex() {
    return this.componentBody.tabIndex
  }

  public pug(): string {
    return super.pug() + require("./rippleButton.pug").default
  }
  stl() {
    return super.stl() + require("./rippleButton.css").toString()
  }
  
}

for (const f of ["link", "addActivationCallback", "removeActivationCallback", "click", "hotkey"]) {
  UiButton.prototype[f] = function (...args: any[]) {
    return this.button[f](...args)
  }
}

declareComponent("ripple-button", UiButton)
