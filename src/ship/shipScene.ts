import { Sprite } from "pixi.js";
import { Avatar } from "./avatar";
import { Burn } from "./burn";
import { Lazer } from "./lazer";
import { Trail } from "./trail";

export const ShipScene = (app: any) => {
  const avatar = Sprite.from("starship.png");

  const keyNames = [
    { keyNumber: 87, action: "up", keyName: "up" },
    { keyNumber: 83, action: "down", keyName: "down" },
    { keyNumber: 65, action: "left", keyName: "left" },
    { keyNumber: 68, action: "right", keyName: "right" },

    { keyNumber: 38, action: "up", keyName: "up" },
    { keyNumber: 40, action: "down", keyName: "down" },
    { keyNumber: 37, action: "left", keyName: "left" },
    { keyNumber: 39, action: "right", keyName: "right" },

    { keyNumber: 32, action: "fire", keyName: "space" },
    { keyNumber: 13, action: "fire", keyName: "enter" },
  ];
  const getName = (keyNumber: number) => {
    const name = keyNames.filter((key) => keyNumber === key.keyNumber)[0];
    return name.keyName;
  };
  const handleLog = (e: any) => {
    console.log(e.keyCode);
    console.log(getName(e.keyCode));
  };
  window.addEventListener("keyup", handleLog);
  window.addEventListener("keydown", handleLog);

  Avatar(app, avatar, getName);
  Trail(app, avatar, -20, 0);
  Lazer(app, avatar, -20, 0);
  Burn(app, avatar, -20, 0);
};
