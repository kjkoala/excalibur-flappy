import { type Entity, type Engine, Component } from "excalibur"
import debounce from "just-debounce-it"

type Owner = Entity & {
  onWindowResize: () => void
}
export class WindowResizeComponent extends Component<"window-resize"> {
  readonly type = "window-resize"
  debounce: () => void;
  declare owner: Owner
  engine: Engine;
  constructor(engine: Engine) {
    super()
    this.engine = engine;
    this.debounce = this.onDebounce()
  }

  onResize = () => {
    if (this.owner?.onWindowResize) {
      this.engine.once("predraw", () => {
        window.removeEventListener("resize", this.debounce)
        this.owner.onWindowResize.call<Owner, [engine: Engine], void>(this.owner, this.engine)
      })
    }
  }
  onDebounce = () => {
   return debounce(this.onResize, 250)
  }
  onAdd?(): void {
    window.addEventListener("resize", this.debounce)
  }
}