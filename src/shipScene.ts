import { Sprite } from "pixi.js";
import { Avatar } from "./avatar";
import { Burn } from "./burn";
import { Lazer } from "./lazer";
import { Trail } from "./trail";

export const ShipScene = (app: any) => {
  const avatar = Sprite.from("starship.png");

  const keyNames = [
    { keyNumber: 87, keyName: "up" },
    { keyNumber: 83, keyName: "down" },
    { keyNumber: 65, keyName: "left" },
    { keyNumber: 68, keyName: "right" },
  ];
  const getName = (keyNumber: number) => {
    const name = keyNames.filter((key) => keyNumber === key.keyNumber)[0];
    return name.keyName;
  };

  Avatar(app, avatar, getName);
  Trail(app, avatar, -20, 0);
  Lazer(app, avatar, -20, 0);
  Burn(app, avatar, -20, 0);
};
