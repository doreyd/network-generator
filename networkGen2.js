// Dom selection
let svg = document.getElementById("svg");

// Function to create and set up SVG elements
const nodeGenerator = (type, props = {}, x) => {
  let newElem0 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  newElem0.setAttribute("id", `node0${x[0]}`);

  let cx2 = parseInt(props.cx) + 20;
  let cy2 = parseInt(props.cy) - 20;
  newElem0.setAttribute("stroke-width", 4);
  newElem0.setAttribute("stroke", "white");

  newElem0.setAttribute("cx", cx2);
  newElem0.setAttribute("cy", cy2);
  newElem0.setAttribute("r", 15);
  svg.append(newElem0);

  let newElem = document.createElementNS("http://www.w3.org/2000/svg", type);
  for (prop in props) newElem.setAttribute(prop, props[prop]);
  newElem.setAttribute("id", `node${x[0]}`);
  svg.append(newElem);

  let newElem2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );

  newElem2.setAttribute("id", `node2${x[0]}`);
  newElem2.setAttribute("fill", "steelblue");

  newElem2.setAttribute("cx", cx2);
  newElem2.setAttribute("cy", cy2);
  newElem2.setAttribute("r", 14);
  svg.append(newElem2);

  dragSVGgroup([`node0${x[0]}`, `node${x[0]}`, `node2${x[0]}`], x[4], x[5]);
  return newElem;
};

// ****************************************************************
// ****** This section allows for random generation of node********
// ****************************************************************

// Function generating random numbers between 0 and the picked base
const ran = base => Math.round(20 + Math.random() * base);

// Function to generate a random nodes list
const nodeslistGen = qty => {
  let nodes = [];
  for (let i = 0; i < qty; i++)
    nodes.push([i, ran(800), ran(1300), ran(30), [], []]);
  return nodes;
};

// let nodeList = nodeslistGen(30);

// ****************************************************************
// ****************************************************************
// ****************************************************************

let links = [];
// Converting regular coordinates into polar coordinates
// based on a given center

let center = [400, 500, 140, 6];
// let qty = 4;
let nodeRaw = [];

const sinCos = a => [Math.sin(a), Math.cos(a)];

const netShape = (cx, cy, r, sin, cos, i, shape) => {
  let x, y;
  if (shape === "circle") {
    x = parseInt(cx + r * cos);
    y = parseInt(cy + r * sin);
  } else if (shape === "star") {
    x = parseInt(cx + r * cos * (1 + (i % 2) / 2));
    y = parseInt(cy + r * sin * (1 + (i % 2) / 2));
  }
  return [x, y];
};

let r0 = 30;

const graphGen = (cx, cy, r, qty) => {
  for (let i = 0; i < qty; i++) {
    let alpha = (i * (Math.PI * 2)) / qty;
    let [sin, cos] = sinCos(alpha);
    let [x, y] = netShape(cx, cy, r, sin, cos, i, "star");
    nodeRaw.push([x, y, r0]);
    links.push([qty, i]);
  }
  nodeRaw.push([cx, cy, r0]);
};

graphGen(...center);

// Formatting the node list
nodeList = nodeRaw.map((x, i) => [i, [x[0], x[1], x[2]], 555, 555, [], []]);

// Formatting the links
links = links.map((x, i) => ({ id: i, start: x[0], end: x[1] }));
console.log(links);
// Common node style
let nodeStyle = { fill: "steelblue", "stroke-width": 3, stroke: "white" };

// Function to generate the SVG nodes
const nodesGen = nodesList => {
  nodesList.forEach(x => {
    nodeGenerator(
      "circle",
      {
        cy: x[1][0],
        cx: x[1][1],
        r: x[1][2],
        ...nodeStyle
      },
      x
    );
  });
};

const createLink = id => {
  let newLink = document.createElementNS("http://www.w3.org/2000/svg", "line");
  //   for (prop in linkProps) newLink.setAttribute(prop, linkProps[prop]);
  newLink.setAttribute("id", id);
  newLink.setAttribute("style", "stroke:white;stroke-width:2px;");
  // newLink.setAttribute("style", "stroke:white;stroke-width:3px;");
  newLink.setAttribute("x1", nodeList[links[id]["start"]][1][1]);
  newLink.setAttribute("y1", nodeList[links[id]["start"]][1][0]);
  newLink.setAttribute("x2", nodeList[links[id]["end"]][1][1]);
  newLink.setAttribute("y2", nodeList[links[id]["end"]][1][0]);
  svg.append(newLink);
  return newLink;
};

const linkingNodes = () => {
  links.forEach((x, i) => {
    createLink(i);
  });
};

const attachNodeLinks = () => {
  links.forEach((x, i) => {
    let nodeSt = x["start"];
    nodeList[nodeSt][4].push(x["id"]);
    let nodeEnd = x["end"];
    nodeList[nodeEnd][5].push(x["id"]);
  });
};

attachNodeLinks();
linkingNodes();
nodesGen(nodeList);
