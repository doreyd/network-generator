const dragSVGgroup = elemGroupId => {
  let elemGroup = elemGroupId.map(x => document.getElementById(x));
  elemGroup.forEach(x => dragSVG(x, elemGroup));
};

// This is a module for drag and drop SVG elements
const dragSVG = (elem, elemGroup) => {
  let delta = [];
  let elemDragged;

  const coord = (e, elem) => {
    let cursX = e.pageX;
    let cursY = e.pageY;
    let elemX = elem.x ? elem.x.animVal.value : elem.cx.animVal.value;
    let elemY = elem.y ? elem.y.animVal.value : elem.cy.animVal.value;
    return [cursX, cursY, elemX, elemY];
  };

  const getDelta = (e, elem, i) => {
    let d2 = coord(e, elem);
    if (elem.cx) {
      elem.setAttribute("cx", d2[0] - delta[i][0]);
      elem.setAttribute("cy", d2[1] - delta[i][1]);
    } else if (elem.x) {
      elem.setAttribute("x", d2[0] - delta[i][0]);
      elem.setAttribute("y", d2[1] - delta[i][1]);
    }
  };

  const newPos = e => {
    elemGroup.forEach((x, i) => {
      getDelta(e, x, i);
    });
  };

  const setDelta = (e, elem) => {
    let d = coord(e, elem);
    delta.push([d[0] - d[2], d[1] - d[3]]);
  };

  elem.onmousedown = e => {
    elemDragged = e.target;
    elemGroup.forEach(x => {
      setDelta(e, x);
    });
    svg.onmousemove = e => newPos(e);
  };

  elem.onmouseup = e => {
    delta = [];
    elemDragged = "";
    svg.onmousemove = e => {};
  };
};
