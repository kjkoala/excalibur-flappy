import { type Entity, type Engine, Component } from "excalibur"
import debounce from "just-debounce-it"

type Owner = Entity & {
  onWindowResize: () => void
}
export class WindowResizeComponent extends Component<"window-resize"> {
  readonly type = "window-resize"

  declare owner: Owner
  engine: Engine;
  constructor(engine: Engine) {
    super()
    this.engine = engine;
  }

  onResize = () => {
    console.log(1234)
    if (this.owner?.onWindowResize) {
      this.engine.once("predraw", () => {
        this.owner.onWindowResize.call(this.owner, this.engine)
      })
    }
  }

  onAdd?(owner: Owner): void {
    window.addEventListener("resize", debounce(this.onResize, 500))
  }

//   onRemove?(previousOwner: Owner): void {
//     window.removeEventListener("resize", this.onResize)
//   }
}