const dragSVGgroup = (elemGroupId, linkStart = [], linkEnd = []) => {
  // console.log(linkStart, linkEnd);
  let stElem = linkStart.map(x => document.getElementById(x));
  let enElem = linkEnd.map(x => document.getElementById(x));
  let elemGroup = elemGroupId.map(x => document.getElementById(x));
  elemGroup.forEach(x => dragSVG(x, elemGroup, stElem, enElem));
};

// This is a module for drag and drop SVG elements
const dragSVG = (elem, elemGroup, stElem, enElem) => {
  let delta = [];
  let deltaSt = [];
  let deltaEn = [];

  let elemDragged;

  const coord = (e, elem) => {
    let cursX = e.pageX;
    let cursY = e.pageY;

    let elemX = elem.x ? elem.getAttribute("x") : elem.getAttribute("cx");
    let elemY = elem.y ? elem.getAttribute("y") : elem.getAttribute("cy");

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
    deltaSt.forEach(arr => {
      arr[0].setAttribute("x1", d2[0] - arr[1]);
      arr[0].setAttribute("y1", d2[1] - arr[2]);
    });
    deltaEn.forEach(arr => {
      arr[0].setAttribute("x2", d2[0] - arr[1]);
      arr[0].setAttribute("y2", d2[1] - arr[2]);
    });
  };

  const newPos = e => {
    elemGroup.forEach((x, i) => {
      getDelta(e, x, i);
    });
  };

  const setDelta = (e, elem) => {
    let d = coord(e, elem);
    console.log(d);
    delta.push([
      // parseInt(d[0]) - parseInt(d[2]),
      // parseInt(d[1]) - parseInt(d[3])
      d[0] - d[2],
      d[1] - d[3]
    ]);
    deltaSt = stElem.map(elem => [
      elem,
      d[0] - elem.x1.animVal.value,
      d[1] - elem.y1.animVal.value
    ]);

    deltaEn = enElem.map(elem => [
      elem,
      d[0] - elem.x2.animVal.value,
      d[1] - elem.y2.animVal.value
    ]);
    // console.log(delta);
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
    deltaSt = [];
    deltaEn = [];
    elemDragged = "";
    svg.onmousemove = e => {};
  };
};
