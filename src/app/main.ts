import { Engine, DisplayMode, Color, Input } from "excalibur";
import { loader } from "./Loader";
import { Main } from "src/scenes";
import './style.css';

const engine = new Engine({
  antialiasing: false,
  backgroundColor: Color.fromHex('#5ee371'),
  resolution: {
    width: 375,
    height: 667,
  },
  canvasElementId: 'game',
  pointerScope: Input.PointerScope.Canvas,
  fixedUpdateFps: 60,
  viewport: {
    width: 375,
    height: 624,
  },
  displayMode: DisplayMode.FitScreenAndFill
})

engine.addScene('main', new Main)
engine.start(loader)
.then(() => engine.goToScene('main'))