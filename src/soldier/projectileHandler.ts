// @ts-nocheck

import PIXI, { Sprite, Text, Ticker } from "pixi.js";
import { Bullets } from "./bullets";

export const projectileHandler = ({ target, app }: any) => {
  // console.log({ target, activeKeys, app, mouse });

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  const boxesIntersect = (a: any, b: any) => {
    var ab = a.getBounds();
    var bb = b.getBounds();
    return (
      ab.x + ab.width > bb.x &&
      ab.x < bb.x + bb.width &&
      ab.y + ab.height > bb.y &&
      ab.y < bb.y + bb.height
    );
  };

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
  var monsters: any = [];
  var bulletSpeed = 5;
  var safeZone = 5;
  var killCount = 0;
  var messages: any = [];

  //   const handleTermination = (bullet: any, ticker: any) => {
  //     const impact = boxesIntersect(bullet, monster);
  //    if (
  //      impact ||
  //      bullet.position.x >= window.innerWidth - 20 ||
  //      bullet.position.x <= 0 + 20 ||
  //      bullet.position.y >= window.innerHeight - 20 ||
  //      bullet.position.y <= 0 + 20
  //    ) {
  //      console.log("gone");
  //      //     bullet.destroy({children: true, texture: true, baseTexture: false})
  //      // console.log(bullets)
  //      // bullets = []
  //      const index = bullets.indexOf(bullet);
  //      if (index > -1) {
  //        // only splice bullets when item is found
  //        bullets.splice(index, 1); // 2nd parameter means remove one item only
  //      }
  //          app.stage.removeChild(bullet);

  //      // ticker.stop()

  //    }
  //  };
  //   const ticker = Ticker.shared;
  //   ticker.autoStart = false;
  //   ticker.add(() => handleTermination(bullet, ticker));
  //   ticker.start();

  app.ticker.add(() => {
    if (bullets.length) {
      bullets.forEach((bullet) => {
        monsters.forEach((monster) => {
          const impact = boxesIntersect(bullet, monster);

          if (
            impact ||
            bullet.position.x >= window.innerWidth - safeZone ||
            bullet.position.x <= 0 + safeZone ||
            bullet.position.y >= window.innerHeight - safeZone ||
            bullet.position.y <= 0 + safeZone
          ) {
            app.stage.removeChild(bullet);
            const index = bullets.indexOf(bullet);
            if (index > -1) {
              // only splice bullets when item is found
              bullets.splice(index, 1); // 2nd parameter means remove one item only
            }
          }
          if (impact) {
            app.stage.removeChild(monster);
            const index = monsters.indexOf(monster);
            if (index > -1) {
              // only splice monsters when item is found
              monsters.splice(index, 1); // 2nd parameter means remove one item only
            }
            killCount += 1;

            const text = new Text(`Monsters killed: ${killCount}`, {
              fontFamily: "Arial",
              fontSize: 24,
              fill: 0xff1010,
              align: "center",
            });
            text.position = { x: 20, y: 20 };

            app.stage.removeChild(messages[0]);
            messages.splice(0, 1);
            messages.push(text);

            app.stage.addChild(text);
            spawn();
          }
        });
      });
    }
  });

  function shoot(rotation: any, startPosition: any) {
    const bullet = Sprite.from("bullets.png");
    bullet.pivot.set(20, 35);
    bullet.position.x = startPosition.x;
    bullet.position.y = startPosition.y;
    bullet.rotation = target.rotation - Math.PI * 2 * 0.25;
    app.stage.addChild(bullet);
    bullets.push(bullet);
  }

  function spawn(rotation: any, startPosition: any) {
    const monster = Sprite.from("eye_monster.png");

    monster.pivot.set(25, 25);

    monster.position.x = getRandomInt(window.innerWidth);
    monster.position.y = getRandomInt(window.innerHeight);

    app.stage.addChild(monster);

    monsters.push(monster);
  }

  // start animating
  function animate() {
    requestAnimationFrame(animate);

    for (var b = bullets.length - 1; b >= 0; b--) {
      bullets[b].position.x += Math.cos(bullets[b].rotation) * bulletSpeed;
      bullets[b].position.y += Math.sin(bullets[b].rotation) * bulletSpeed;
    }
    // render the container
    // renderer.render(app);
  }
  spawn();
  animate();
};
