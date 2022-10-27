export const Gun = ({ sprite, getInputName, target, app }: any) => {
  console.log({ sprite, getInputName });
  app.ticker.add(() => {
    sprite.position = target.position
    sprite.rotation = target.rotation
  })
  app.stage.addChild(sprite);
};
