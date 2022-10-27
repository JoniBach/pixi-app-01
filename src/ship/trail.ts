import { BLEND_MODES, Point, SimpleRope, Texture } from "pixi.js";

export const Trail = (app: any, avatar: any, x: number, y: number) => {
  // document.body.appendChild(app.view);
  // Get the texture for rope.
  const trailTexture = Texture.from("trail_blue.png");

  const historyX: any = [];
  const historyY: any = [];
  // historySize determines how long the trail will be.
  const historySize = 60;

  // ropeSize determines how smooth the trail will be.
  const ropeSize = 100;
  const points: any = [];

  // Create history array.
  for (let i = 0; i < historySize; i++) {
    historyX.push(0);
    historyY.push(0);
  }
  // Create rope points.
  for (let i = 0; i < ropeSize; i++) {
    points.push(new Point(0, 0));
  }

  // Create the rope
  const rope: any = new SimpleRope(trailTexture, points);
  // rope.rotation = Math.PI * 2 * 0.25;

  // rope.pivot.set(0, 20);

  // Set the blendmode
  rope.blendmode = BLEND_MODES.ADD;

  app.stage.addChild(rope);
  console.log(rope);
  console.log(x, y);
  // Listen for animate update
  app.ticker.add(() => {
    // console.log(avatar.rotation);

    // let xPos = avatar.position.x + x;
    // let yPos = avatar.position.y + y;
    let xPos = avatar.position.x;
    let yPos = avatar.position.y;
    // console.log(avatar.rotation);
    // Read mouse points, this could be done also in mousemove/touchmove update. For simplicity it is done here for now.
    // When implementing this properly, make sure to implement touchmove as interaction plugins mouse might not update on certain devices.
    // const mouseposition = app.renderer.plugins.interaction.mouse.global;

    // Update the mouse values to history

    // rope.rotation = avatar.rotation;

    historyX.pop();
    // historyX.unshift(x);
    historyX.unshift(xPos);
    historyY.pop();
    // historyY.unshift(y);
    historyY.unshift(yPos);
    // Update the points to correspond with history.
    for (let i = 0; i < ropeSize; i++) {
      const p = points[i];

      // Smooth the curve with cubic interpolation to prevent sharp edges.
      const ix = cubicInterpolation(
        historyX,
        (i / ropeSize) * historySize,
        null
      );
      const iy = cubicInterpolation(
        historyY,
        (i / ropeSize) * historySize,
        null
      );

      p.x = ix;
      p.y = iy;
    }
  });

  /**
   * Cubic interpolation based on https://github.com/osuushi/Smooth.js
   */
  function clipInput(k: any, arr: any) {
    if (k < 0) k = 0;
    if (k > arr.length - 1) k = arr.length - 1;
    return arr[k];
  }

  function getTangent(k: any, factor: any, array: any) {
    return (factor * (clipInput(k + 1, array) - clipInput(k - 1, array))) / 2;
  }

  function cubicInterpolation(array: any, t: any, tangentFactor: any) {
    if (tangentFactor == null) tangentFactor = 1;

    const k = Math.floor(t);
    const m = [
      getTangent(k, tangentFactor, array),
      getTangent(k + 1, tangentFactor, array),
    ];
    const p = [clipInput(k, array), clipInput(k + 1, array)];
    t -= k;
    const t2 = t * t;
    const t3 = t * t2;
    return (
      (2 * t3 - 3 * t2 + 1) * p[0] +
      (t3 - 2 * t2 + t) * m[0] +
      (-2 * t3 + 3 * t2) * p[1] +
      (t3 - t2) * m[1]
    );
  }
};
