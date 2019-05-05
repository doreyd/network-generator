let nodeList = [
  [200, 300, 20],
  [200, 300, 20],
  [200, 300, 20],
  [200, 300, 20],
  [200, 300, 20]
];
nodeList = nodeList.map((x, i) => [i, ...x, [], []]);
// console.log(nodeList);

let links = [
  { start: 5, end: 3 },
  { start: 12, end: 10 },
  { start: 2, end: 22 },
  { start: 10, end: 15 }
];

links.forEach((x, i) => (x["id"] = i));
console.log(links);
