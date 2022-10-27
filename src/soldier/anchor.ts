export const Anchor = ({ sprite, getInputName, app }: any) => {
  console.log({ sprite, getInputName });



  app.stage.addChild(sprite);

  sprite.position.set(100, 100);
};
