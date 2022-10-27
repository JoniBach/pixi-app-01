export const Soldier = ({ sprite, app, target }: any) => {
  app.ticker.add(() => {
    sprite.position = target.position
    sprite.rotation = target.rotation
  })
  app.stage.addChild(sprite);
};
