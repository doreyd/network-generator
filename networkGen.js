// Dom selection
let svg = document.getElementById("svg");

// Function to create and set up SVG elements
const nodeGenerator = (type, props = {}, x) => {
  let newElem = document.createElementNS("http://www.w3.org/2000/svg", type);
  for (prop in props) newElem.setAttribute(prop, props[prop]);
  newElem.setAttribute("id", `node${x[0]}`);
  svg.append(newElem);
  dragSVGgroup([newElem.getAttribute("id")], x[4], x[5]);
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

let center = [400, 500, 140, 24];
// let qty = 4;
let nodeRaw = [];

const sinCos = a => [Math.sin(a), Math.cos(a)];

const netShape = (cx, cy, r, sin, cos, i, shape) => {
  let x, y;
  if (shape === "circle") {
    x = parseInt(cx + r * cos);
    y = parseInt(cy + r * sin);
  } else if (shape === "star") {
    x = parseInt(cx + r * cos * (1 + (i % 2)));
    y = parseInt(cy + r * sin * (1 + (i % 2)));
  }
  return [x, y];
};

const graphGen = (cx, cy, r, qty) => {
  for (let i = 0; i < qty; i++) {
    let alpha = (i * (Math.PI * 2)) / qty;
    let [sin, cos] = sinCos(alpha);
    let [x, y] = netShape(cx, cy, r, sin, cos, i, "star");
    nodeRaw.push([x, y, 30]);
    // console.log([qty + 1, i]);
    links.push([qty, i]);
  }
  nodeRaw.push([cx, cy, 30]);
  // console.log(links);
};

graphGen(...center);

// Formatting the node list
nodeList = nodeRaw.map((x, i) => [i, x[0], x[1], x[2], [], []]);

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
        cy: x[1],
        cx: x[2],
        r: x[3],
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
  newLink.setAttribute("style", "stroke:white;stroke-width:3px;");
  newLink.setAttribute("x1", nodeList[links[id]["start"]][2]);
  newLink.setAttribute("y1", nodeList[links[id]["start"]][1]);
  newLink.setAttribute("x2", nodeList[links[id]["end"]][2]);
  newLink.setAttribute("y2", nodeList[links[id]["end"]][1]);
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
