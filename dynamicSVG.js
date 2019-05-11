let svg = document.getElementById("svg");
let clipPath = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "clipPath"
);
clipPath.setAttribute("id", "pp");
let cx = 300,
  cy = 300,
  r = 100;
let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
circle.setAttribute("cx", cx);
circle.setAttribute("cy", cy);
circle.setAttribute("r", r);

svg.append(clipPath);
clipPath.append(circle);

let image = document.createElementNS("http://www.w3.org/2000/svg", "image");
image.setAttribute("x", cx - r);
image.setAttribute("y", cy - r);
image.setAttribute("height", cx - r);
image.setAttribute("href", "john.jpg");
image.setAttribute("clip-path", "url(#pp)");

svg.append(image);
