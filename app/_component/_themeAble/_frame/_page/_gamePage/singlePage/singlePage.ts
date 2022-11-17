import delay from "tiny-delay"
import { declareComponent } from "../../../../../../lib/declareComponent"
import GamePage from "../gamePage"
import Input from "../../../../_focusAble/_formUi/_editAble/input/input"
import RandoClock from "./../../../../../randoClock/randoClock"
import "./../../../../../randoClock/randoClock"
import "./../../../../_focusAble/_formUi/_editAble/input/input"


class SinglePage extends GamePage {
  disableInputs() {
    this.val.hide()
  }
  enableInputs() {
    this.val.show()
  }
  focusInputs() {
    this.val.focus()
  }
  clearInputs() {
    this.val.clear()
  }
  hideClocks() {
    this.clock.css({opacity: 0})
  }
  showClocks() {
    this.clock.css({opacity: 1})
  }
  rerenderClocks() {
    this.clock.assignRandom()
  }

  private clock = new RandoClock()
  private val = new Input("Value")


  constructor() {
    super("single");
    this.body.gameContainer.append(this.clock, this.val);

    this.val.userFeedbackMode.focus.set(false)
    

    this.val.value.get(() => {
      this.updateContentFunc()
    })
  }

  async tryAnswere() {
    const val = this.val.value.get()
    if (this.clock.check(+val)) {
      await this.val.moveBody.anim({background: "#4ee44e"})
      await delay(500)
      await this.val.moveBody.anim({background: ""})
      // db.score.single.add(1)
    }
    else {
      await this.val.moveBody.anim({background: "#ff726f"})
      await delay(500)
      await this.val.moveBody.anim({background: ""})
      // db.score.single.add(-1)
    }
  }


  stl() {
    return super.stl() + require("./singlePage.css").toString()
  }

}

export default declareComponent("single-page", SinglePage)
