import { AnimatedSprite, Graphics, Sprite } from "pixi.js";
import { Anchor } from "./anchor";
import { Bullets } from "./bullets";
import { userInputHandler } from "./controller";
import { Gun } from "./gun";
import { actionHandler } from "./movementHandler";
import { Soldier } from "./soldier";

export const SoldierScene = (app: any) => {
  const soldier = Sprite.from("soldier.png");
  const guns = Sprite.from("guns.png");
  const bullets = Sprite.from("bullets.png");
  // const anchor = new Graphics()
  // FederatedPointerEvent
  const anchor = AnimatedSprite.from('soldier.png')

  soldier.pivot.set(25, 25);
  guns.pivot.set(25, 25);
  bullets.pivot.set(25, 25);
  anchor.pivot.set(25, 25);


  const activeKeys: any = [];
const mouse: any = {};
  // anchor.beginFill(0xffffff);
  // anchor.drawCircle(25, 25, 25);
  // anchor.endFill();

  const keyNames = [
    { keyCode: 87, action: "up", keyName: "up" },
    { keyCode: 83, action: "down", keyName: "down" },
    { keyCode: 65, action: "left", keyName: "left" },
    { keyCode: 68, action: "right", keyName: "right" },

    { keyCode: 38, action: "up", keyName: "up" },
    { keyCode: 40, action: "down", keyName: "down" },
    { keyCode: 37, action: "left", keyName: "left" },
    { keyCode: 39, action: "right", keyName: "right" },

    { keyCode: 32, action: "fire", keyName: "space" },
    { keyCode: 13, action: "fire", keyName: "enter" },
  ];

  const getName = (keyCode: number) => {
    const name = keyNames.filter((key) => keyCode === key.keyCode)[0];
    return name.keyName;
  };

  const handleInput = (e: any) => {
    console.log(e.keyCode);
    console.log(getName(e.keyCode));
  };

  const update = () => {
    anchor.position.x += 1;
  };

  // requestAnimationFrame(update);
   
  app.ticker.add(() => {
    // console.log(activeKeys);
  });
  userInputHandler(activeKeys, keyNames, mouse)
  actionHandler({target: anchor, activeKeys, app, mouse })
  Bullets({ sprite: bullets,  app, target: anchor });
  Gun({ sprite: guns,  app, target: anchor });
  Anchor({ sprite: anchor, app, });
  Soldier({ sprite: soldier,  app, target: anchor });
};
