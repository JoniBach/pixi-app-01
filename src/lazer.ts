// import { BLEND_MODES, Point, SimpleRope, Texture } from "pixi.js";

import { Graphics } from "pixi.js";

export const Lazer = (app: any, avatar: any, x: number, y: number) => {
  var sprite: any = new Graphics();

  let quant = 0;

  let active = false;
  const activeColor = 0xff0000;
  const inactiveColor = 0x00ffffff;

  let start: any = [];
  let end: any = [];

  const mouseDown = () => {
    active = true;
  };

  const mouseUp = () => {
    active = false;
    app.stage.removeChild(sprite);
    sprite = new Graphics();
  };

  const shoot = () => {
    sprite.lineStyle(2, 0xff0000, 1);
    sprite.moveTo(start.x, start.y);
    sprite.lineTo(end.x, end.y);
    app.stage.addChild(sprite);

    quant += 1;
  };

  window.addEventListener("mouseup", mouseUp);
  window.addEventListener("mousedown", mouseDown);
  console.log(x, y, avatar, active, activeColor, inactiveColor);

  // Listen for animate update
  app.ticker.add(() => {
    const mouseposition = app.renderer.plugins.interaction.mouse.global;
    end = mouseposition;
    start = avatar.position;

    if (active) {
      shoot();
    }

    if (quant > 1) {
      app.stage.removeChild(sprite);
      sprite = new Graphics();
      quant = 0;
    }
  });
};
