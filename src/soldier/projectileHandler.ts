import PIXI, { Sprite } from "pixi.js";
import { Bullets } from "./bullets";

export const projectileHandler = ({ target, activeKeys, app, mouse }: any) => {
  console.log({ target, activeKeys, app, mouse });

  const handleLaunch = (e: any) => {
    if (e.keyCode === 32) {
      shoot(target.rotation, {
        x: target.position.x + Math.cos(target.rotation) * 20,
        y: target.position.y + Math.sin(target.rotation) * 20,
      });
    }
  };

  window.addEventListener("keydown", (e) => handleLaunch(e));

  var bullets: any = [];
  var bulletSpeed = 5;

  function shoot(rotation: any, startPosition: any) {
     const bullet = Sprite.from("bullets.png");
    console.log(rotation, startPosition);
    bullet.pivot.set(20, 35);

    bullet.position.x = startPosition.x;
    bullet.position.y = startPosition.y;
    bullet.rotation = target.rotation - ( Math.PI * 2 * 0.25) ;
    app.stage.addChild(bullet);
    bullets.push(bullet);
  }

  // start animating
  function animate() {
    requestAnimationFrame(animate);

    // just for fun, let's rotate mr rabbit a little

    for (var b = bullets.length - 1; b >= 0; b--) {
      bullets[b].position.x += Math.cos(bullets[b].rotation) * bulletSpeed;
      bullets[b].position.y += Math.sin(bullets[b].rotation) * bulletSpeed;
    }
    // render the container
    // renderer.render(app);
  }
  animate();
};
