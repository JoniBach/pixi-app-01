import { Sprite } from "pixi.js";

export const Monster = ({ getInputName, target, app }: any) => {
  console.log({ getInputName, target });
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }


  const sprite = Sprite.from("eye_monster.png");

  sprite.pivot.set(25, 25);


  sprite.position.x = getRandomInt(window.innerWidth)
  sprite.position.y = getRandomInt(window.innerHeight)
  app.ticker.add(() => {
    // sprite.position = {x: 400, y: 400}
 
  })
  app.stage.addChild(sprite);
};
