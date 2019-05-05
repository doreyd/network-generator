// Dom selection
let svg = document.getElementById("svg");

// Function to create and set up SVG elements
const nodeGenerator = (type, props = {}, x) => {
  let newElem = document.createElementNS("http://www.w3.org/2000/svg", type);
  for (prop in props) newElem.setAttribute(prop, props[prop]);
  newElem.setAttribute("id", `node${x[0]}`);
  svg.append(newElem);
  dragSVGgroup([newElem.getAttribute("id"), "aaa"], x[4], x[5]);
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

// node and links lists
let nodeList = [
  [200, 300, 20],
  [100, 500, 30],
  [400, 200, 40],
  [500, 300, 20],
  [350, 400, 60]
];

let links = [
  [0, 3],
  [1, 2],
  [4, 3],
  [1, 3],
  [1, 4],
  [2, 3],
  [2, 0],
  [0, 1],
  [0, 4]
];

// Formatting the node list
nodeList = nodeList.map((x, i) => [i, ...x, [], []]);

// Formatting the links
links = links.map((x, i) => ({ id: i, start: x[0], end: x[1] }));

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
