// @ts-nocheck

import PIXI, { Sprite, Text, Ticker } from "pixi.js";
import { Bullets } from "./bullets";

export const projectileHandler = ({ target, app }: any) => {
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
    if (e.keyCode === 32 && activeWeapon) {
      shoot(target.rotation, {
        x: target.position.x + Math.cos(target.rotation) * 20,
        y: target.position.y + Math.sin(target.rotation) * 20,
      });
    }
  };

  window.addEventListener("keydown", (e) => handleLaunch(e));

  var bullets: any = [];
  var weapons: any = [];
  var monsters: any = [];
  var monsters2: any = [];
  var bulletSpeed = 5;
  var safeZone = 5;
  var killCount = 0;
  var messages: any = [];
  var health = 8;
  var activeWeapon = null;

  // app.ticker.add(() => {
  //   console.log(monsters2)
  // })

  app.ticker.add(() => {
    if (activeWeapon) {
      activeWeapon.weapon.position = target.position
      activeWeapon.weapon.rotation = target.rotation
  app.stage.addChild(activeWeapon.weapon);

    }
    weapons.forEach((weaponObj) => {
      const pickUp = boxesIntersect(weaponObj.weapon, target);
      if (pickUp) {
        activeWeapon = weaponObj;
      }
    });
    monsters2.forEach((monsterObj) => {
      // monsterObj.monster.position.x += getRandomInt(2)
      // monsterObj.monster.position.y += getRandomInt(2)
      bullets.forEach((bullet) => {
        const impact = boxesIntersect(bullet, monsterObj.monster);
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
          if (monsterObj.health === 1) {
            app.stage.removeChild(monsterObj.monster);

            const index = monsters2.indexOf(monsterObj);
            if (index > -1) {
              // only splice monsters when item is found
              monsters2.splice(index, 1); // 2nd parameter means remove one item only
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
          } else {
            const index = monsters2.indexOf(monsterObj);
            if (index > -1) {
              // only splice monsters when item is found
              monsters2[index].health -= 1;
              const color = () => {
                if (monsters2[index].health > 4) {
                  return 0x00ff00;
                }
                if (monsters2[index].health > 2) {
                  return 0xffa500;
                }
                if (monsters2[index].health > 0) {
                  return 0xff1010;
                }
              };
              const text = new Text(
                `${Array(monsters2[index].health)
                  .fill("[]")
                  .map((e) => e)}`,
                {
                  fontFamily: "Arial",
                  fontSize: 10,
                  fill: color(),
                  align: "center",
                }
              );
              text.position = {
                x: monsterObj.monster.position.x,
                y: monsterObj.monster.position.y + 30,
              };
              app.stage.removeChild(messages[0]);
              messages.splice(0, 1);
              messages.push(text);
              app.stage.addChild(text);
            }
          }
        }
      });
    });
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
    var defaultMonster = { monster, health };
    monster.pivot.set(25, 25);
    monster.position.x = getRandomInt(window.innerWidth);
    monster.position.y = getRandomInt(window.innerHeight);
    app.stage.addChild(monster);
    monsters2.push(defaultMonster);
  }

  function spawnWeapon() {
    const weapon = Sprite.from("guns.png");
    var defaultWeapon = { weapon };
    weapon.pivot.set(25, 25);
    weapon.position.x = getRandomInt(window.innerWidth);
    weapon.position.y = getRandomInt(window.innerHeight);
    app.stage.addChild(weapon);
    weapons.push(defaultWeapon);
  }

  // start animating
  function animate() {
    requestAnimationFrame(animate);

    for (var b = bullets.length - 1; b >= 0; b--) {
      bullets[b].position.x += Math.cos(bullets[b].rotation) * bulletSpeed;
      bullets[b].position.y += Math.sin(bullets[b].rotation) * bulletSpeed;
    }
  }
  spawnWeapon();
  spawn();
  animate();
};
