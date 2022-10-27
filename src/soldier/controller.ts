export const userInputHandler = (arr: any, links?: any, mouse?: any) => {
  const handleLink = (keyCode: any) => {
    if (links) {
      return links.filter((e: any) => e.keyCode === keyCode)[0];
    }
  };
  const handleKeyDown = (e: any) => {
    if (e.repeat === false) {
      if (!arr.includes(e.keyCode)) {
          if (handleLink(e.keyCode)) {
            arr.push(handleLink(e.keyCode));
          }}
    }
  };

  const handleKeyUp = (e: any) => {
    if (links) {
      if (handleLink(e.keyCode)) {
  

        const newArr = arr.filter((object: any) => e.keyCode !== object.keyCode)
       

        arr.splice(0, arr.length, ...newArr);
      }
    }
  };
  const handleMouseMove = (e: any) => {
    Object.assign(mouse, { x: e.x, y: e.y });
  };

  window.addEventListener("keyup", handleKeyUp);
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("mousemove", handleMouseMove);
};
