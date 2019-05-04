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
const ran = base => Math.round(Math.random() * base);

// Function to generate a random nosed list
const nodeslistGen = qty => {
  let nodes = [];
  for (let i = 0; i < qty; i++) nodes.push([ran(800), ran(1300), ran(100)]);
  return nodes;
};

// Function to generate the SVG nodes
const nodesGen = nodesList => {
  nodesList.forEach(x => {
    nodeGenerator("circle", {
      cy: x[0],
      cx: x[1],
      r: x[2],
      fill: "steelblue",
      "stroke-width": 3,
      stroke: "white"
    });
  });
};

nodesGen(nodeslistGen(30));
