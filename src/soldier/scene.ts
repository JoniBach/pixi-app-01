import { AnimatedSprite, Graphics, Sprite } from "pixi.js";
import { Anchor } from "./anchor";
import { userInputHandler } from "./controller";
import { Gun } from "./gun";
import { actionHandler } from "./movementHandler";
import { projectileHandler } from "./projectileHandler";

export const SoldierScene = (app: any) => {

  const anchor = AnimatedSprite.from("soldier.png");
  anchor.pivot.set(25, 25);

  const activeKeys: any = [];
  const mouse: any = {};

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

  userInputHandler(activeKeys, keyNames, mouse);
  actionHandler({ target: anchor, activeKeys, app, mouse });
  projectileHandler({ target: anchor, activeKeys, app, mouse });
  Anchor({ sprite: anchor, app });
};
