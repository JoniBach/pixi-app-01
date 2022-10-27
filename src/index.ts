import { Application } from "pixi.js";
import { SoldierScene } from "./soldier/scene";

const app = new Application({
  view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0x151f32,
  width: 1000,
  height: 1000,
});
// pass in the screen size to avoid "asking up"
// const sceene: any = new (ShipScene(app) as any)();
const sceene: any = new (SoldierScene(app) as any)();
// const sceene: any = new (ShipScene(app) as any)();

app.stage.addChild(sceene);