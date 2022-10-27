export const Bullets = ({ sprite, getInputName, mouse,  target, app }: any) => {
    console.log({ sprite, getInputName });
    app.ticker.add(() => {
      sprite.position = target.position
      sprite.rotation = target.rotation
    })
    console.log(mouse)
    app.stage.addChild(sprite);
  };
  