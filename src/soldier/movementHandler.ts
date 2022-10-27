export const actionHandler = ({target, activeKeys, app, mouse}: any) => {
const incrament = 1


const hasAction = (action: any) =>  activeKeys.find((element: any) => {
  if (element.action === action) {
    return true;
  }

  return false;
});

  function update() {

    // let angle = Math.atan2(e.pageX - boxCenter.x, - (e.pageY - boxCenter.y) )*(180 / Math.PI);      

        // const mouse = app.renderer.interaction.mouse.global;
          // const mouse = app.renderer.plugin.interaction.mouse;
    const dx = mouse.x - target.position.x;
    const dy = mouse.y - target.position.y;
    const rtat = Math.atan2( dy, dx);
    // const angle = Math.atan2(e.pageX - boxCenter.x, - (e.pageY - boxCenter.y) )*(180 / Math.PI);      
    let angle = Math.atan2(mouse.x - target.position.x, - (mouse.y - target.position.y) );      
    target.rotation = angle
    // console.log(rtat)
    // console.log(mouse, rtat, dy, dx, target)
    

    if (hasAction("right")) {
      target.position.x += incrament;
      // target.rotation = Math.PI * 2 * 0.25
    }
    if (hasAction("left")) {
      target.position.x -= incrament;
      // target.rotation = Math.PI * 2 * 0.75

    }
    if (hasAction("up")) {
      target.position.y -= incrament;
      // target.rotation = Math.PI * 2 * 0

    }
    if (hasAction("down")) {
      target.position.y += incrament;
      // target.rotation = Math.PI * 2 * 0.50
    }
  }
  app.ticker.add(() => {
   update()
  });
};
