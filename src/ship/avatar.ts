// import { Sprite } from "pixi.js";
// import { Trail } from "./trail";
// import { Trail } from "./trail";

export const Avatar = (app: any, avatar: any, getName: any) => {
  let keyName: string = "";
  const incrament = 3;
  //   let keyName: string = "";

  const keysDown = (e: any) => {
    const name = getName(e.keyCode);
    keyName = name;
  };

  const keysUp = (e: any) => {
    const name = getName(e.keyCode);
    if (keyName === name) {
      keyName = "";
    }
  };

  //   const gameLoop = () => {
  //     // Trail(app, { x: avatar.position.x, y: avatar.position.y });
  //   };
  window.addEventListener("keydown", keysDown);
  window.addEventListener("keyup", keysUp);
  //   app.ticker.add(gameLoop);
  avatar.position.set(0, 0);
  avatar.pivot.set(28, 80);

  //   var square = new Graphics();
  //   square.beginFill(0xff0000);
  //   square.drawRect(0, 0, 50, 50);
  //   square.endFill();
  //   square.x = 100;
  //   square.y = 100;
  app.stage.addChild(avatar);

  function update() {
    // Trail(app, { x: avatar.position.x, y: avatar.position.y });

    if (keyName === "right") {
      // movement
      avatar.position.x += incrament;

      // rotation
      if (avatar.rotation !== Math.PI * 2 * 0.25) {
        if (avatar.rotation > Math.PI * 2 * 0.25) {
          avatar.rotation -= 0.1;
        }
        if (avatar.rotation < Math.PI * 2 * 0.25) {
          avatar.rotation += 0.1;
        }
      }
    }
    if (keyName === "left") {
      avatar.position.x += -incrament;
      // rotation
      if (avatar.rotation !== Math.PI * 2 * 0.75) {
        if (avatar.rotation > Math.PI * 2 * 0.75) {
          avatar.rotation -= 0.1;
        }
        if (avatar.rotation < Math.PI * 2 * 0.75) {
          avatar.rotation += 0.1;
        }
      }
    }
    if (keyName === "up") {
      avatar.position.y += -incrament;
      // rotation
      if (avatar.rotation !== Math.PI * 2 * 0) {
        if (avatar.rotation > Math.PI * 2 * 0) {
          avatar.rotation -= 0.1;
        }
        if (avatar.rotation < Math.PI * 2 * 0) {
          avatar.rotation += 0.1;
        }
      }
    }
    if (keyName === "down") {
      avatar.position.y += incrament;
      // rotation
      if (avatar.rotation !== Math.PI * 2 * 0.5) {
        if (avatar.rotation > Math.PI * 2 * 0.5) {
          avatar.rotation -= 0.1;
        }
        if (avatar.rotation < Math.PI * 2 * 0.5) {
          avatar.rotation += 0.1;
        }
      }
    }

    app.render(app.stage);

    requestAnimationFrame(update);
  }

  //   Trail(app, { x: avatar.position.x, y: avatar.position.y });

  requestAnimationFrame(update);
};
