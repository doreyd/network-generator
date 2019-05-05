// Dom selection
let svg = document.getElementById("svg");

// Function to create and set up SVG elements
const nodeGenerator = (type, props = {}) => {
  let newElem = document.createElementNS("http://www.w3.org/2000/svg", type);
  for (prop in props) newElem.setAttribute(prop, props[prop]);
  svg.append(newElem);
  dragSVG(newElem);
  return newElem;
};

// Function generating random numbers between 0 and the picked base
const ran = base => Math.round(20 + Math.random() * base);

// Function to generate a random nosed list
const nodeslistGen = qty => {
  let nodes = [];
  for (let i = 0; i < qty; i++) nodes.push([i, ran(800), ran(1300), ran(30)]);
  return nodes;
};

// Function to generate the SVG nodes
const nodesGen = nodesList => {
  nodesList.forEach(x => {
    nodeGenerator("circle", {
      cy: x[1],
      cx: x[2],
      r: x[3],
      fill: "steelblue",
      "stroke-width": 3,
      stroke: "white"
    });
  });
};

let nodeList = nodeslistGen(30);

const createLink = id => {
  let newLink = document.createElementNS("http://www.w3.org/2000/svg", "line");
  //   for (prop in linkProps) newLink.setAttribute(prop, linkProps[prop]);
  console.log(nodeslistGen);
  newLink.setAttribute("id", id);
  newLink.setAttribute("style", "stroke:steelblue;");
  newLink.setAttribute("x1", nodeList[links[id]["start"]][2]);
  newLink.setAttribute("y1", nodeList[links[id]["start"]][1]);
  newLink.setAttribute("x2", nodeList[links[id]["ends"]][2]);
  newLink.setAttribute("y2", nodeList[links[id]["ends"]][1]);
  svg.append(newLink);
  return newLink;
};
let links = [
  //   { start: 5, ends: 3 },
  //   { start: 12, ends: 10 },
  //   { start: 2, ends: 22 },
  { id: 0, start: 10, ends: 15 }
];

const linkingNodes = () => {
  links.forEach((x, i) => {
    createLink(i);
  });
};
linkingNodes();
nodesGen(nodeList);
