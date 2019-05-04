// Function to create and set up SVG elements
const nodeGenerator = (type, props = {}) => {
  let newElem = document.createElementNS("http://www.w3.org/2000/svg", type);
  for (prop in props) newElem.setAttribute(prop, props[prop]);
  svg.append(newElem);
  return newElem;
};
