import { declareComponent } from "../../../../../../lib/declareComponent"
import GamePage from "../gamePage"

import Input from "../../../../_focusAble/_formUi/_editAble/input/input"
import RandoClock from "./../../../../../randoClock/randoClock"
import "./../../../../../randoClock/randoClock"
import "./../../../../_focusAble/_formUi/_editAble/input/input"
import { ElementList } from "extended-dom"
import delay from "delay"

function range(n: number) {
  return Array.from({length: n}, (_, i) => i)
}

class FourSomePage extends GamePage {
  disableInputs() {
    this.vals.hide()
  }
  enableInputs() {
    this.vals.show()
  }
  focusInputs() {
    this.vals[0].focus()
  }
  clearInputs() {
    this.vals.forEach((e) => e.clear())
  }
  hideClocks() {
    this.clocks.css({opacity: 0})
  }
  showClocks() {
    this.clocks.css({opacity: 1})
  }
  rerenderClocks() {
    this.clocks.forEach((e) => e.assignRandom())
  }

  async tryAnswere() {
    const prom = [] as any[]
    this.elems.forEach((elem: any) => {
      prom.push((async () => {
        if (elem.clock.check(+elem.val.value.get())) {
          await elem.val.moveBody.anim({background: "#4ee44e"})
          await delay(500)
          await elem.val.moveBody.anim({background: ""})
          // db.score.single.add(1)
        }
        else {
          await elem.val.moveBody.anim({background: "#ff726f"})
          await delay(500)
          await elem.val.moveBody.anim({background: ""})
          // db.score.single.add(-1)
        }
      })())
    })
    await Promise.all(prom)
  }


  private elems = range(4).map(() => {
    const clock = new RandoClock()
    const val = new Input("Value")
    const container = ce("elem-container")
    container.append(clock, val)
    this.body.gameContainer.append(container)
    return {clock, val}
  })
  private clocks = new ElementList(...this.elems.map(e => e.clock)) as ElementList<RandoClock> as any
  private vals = new ElementList(...this.elems.map(e => e.val)) as ElementList<Input> as any


  constructor() {
    super("4some")

    this.vals.forEach((e, i) => {
      e.userFeedbackMode.focus.set(false)

      let lastLength = 0
      e.value.get((val) => {
        this.updateContentFunc()
        const thisLength = val.length
        if (lastLength < thisLength) {
          selectNext()
        }
        lastLength = thisLength
      })

      e.on("keydown", (ev) => {
        //back
        if (ev.key === "Backspace") {
          if (e.inputElem.selectionEnd === 0) {
            selectPrev()
          }
        }
        // left
        else if (ev.key === "ArrowLeft") {
          if (e.inputElem.selectionStart === 0) {
            const el = selectPrev()
            setTimeout(() => {
              if (el) el.select()
            })
          }
        }
        else if (ev.key === "ArrowRight") {
          if (e.inputElem.selectionEnd === e.value.get().length) {
            const el = selectNext()
            setTimeout(() => {
              if (el) el.select()
            })
          }
        }
      })


      const selectPrev = () => {
        if (i > 0) {
          this.vals[i - 1].focus()
          return this.vals[i - 1]
        }
      }
      const selectNext = () => {
        if (i < this.vals.length - 1) {
          this.vals[i + 1].focus()
          return this.vals[i + 1]
        }
      }
      


    })
  }

  


  stl() {
    return super.stl() + require("./4some.css").toString()
  }

}

export default declareComponent("4some-page", FourSomePage)