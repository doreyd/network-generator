// This is a module for drag and drop SVG elements
const dragSVG = elem => {
  let deltaX = 0;
  let deltaY = 0;
  let elemDragged;

  const coord = e => {
    let cursX = e.pageX;
    let cursY = e.pageY;
    let elemX = elemDragged.x
      ? elemDragged.x.animVal.value
      : elemDragged.cx.animVal.value;
    let elemY = elemDragged.y
      ? elemDragged.y.animVal.value
      : elemDragged.cy.animVal.value;
    return [cursX, cursY, elemX, elemY];
  };

  const newPos = e => {
    let d2 = coord(e);
    if (elemDragged.cx) {
      elemDragged.setAttribute("cx", d2[0] - deltaX);
      elemDragged.setAttribute("cy", d2[1] - deltaY);
    } else if (elemDragged.x) {
      elemDragged.setAttribute("x", d2[0] - deltaX);
      elemDragged.setAttribute("y", d2[1] - deltaY);
    }
  };

  elem.onmousedown = e => {
    elemDragged = e.target;
    let d = coord(e);
    deltaX = d[0] - d[2];
    deltaY = d[1] - d[3];
    svg.onmousemove = e => newPos(e);
  };

  elem.onmouseup = e => {
    deltaX = 0;
    deltaY = 0;
    elemDragged = "";
    svg.onmousemove = e => {};
  };
};
