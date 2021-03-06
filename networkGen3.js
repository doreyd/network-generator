!(function(center, graphType) {
  // Dom selection
  let svg = document.getElementById("svg");

  const setSVGelem = (type, style = {}, appendTo) => {
    let elem = document.createElementNS("http://www.w3.org/2000/svg", type);
    for (let prop in style) elem.setAttribute(prop, style[prop]);
    appendTo.append(elem);
    return elem;
  };

  // Function to create and set up SVG elements
  const nodeGenerator = (
    props = {},
    outer,
    imgProps,
    newMsg,
    newMsg2,
    unreadMsg,
    unreadMsg2,
    x
  ) => {
    let clipPath = setSVGelem("clipPath", { id: `clipPath${x[0]}` }, svg);
    let newElem = setSVGelem(
      "circle",
      { id: `node${x[0]}`, ...props },
      clipPath
    );
    setSVGelem("circle", outer, svg);
    let idList = [`node${x[0]}`, `img${x[0]}`, `outer${x[0]}`];

    if (center[3].msgNew[x[0]] > 0) {
      setSVGelem("circle", newMsg, svg);
      let text2 = setSVGelem("text", newMsg2, svg);
      text2.textContent = center[3].msgNew[x[0]];
      idList = [...idList, `text${x[0]}`, `text2${x[0]}`];
    }
    if (center[3].msgUnread[x[0]] > 0) {
      setSVGelem("circle", unreadMsg, svg);
      let text2 = setSVGelem("text", unreadMsg2, svg);
      text2.textContent = center[3].msgUnread[x[0]];
      idList = [...idList, `unread${x[0]}`, `unread2${x[0]}`];
    }

    setSVGelem("image", imgProps, svg);

    dragSVGgroup([...idList], x[5], x[6]);
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

  // let center = [400, 500, 140, 40];

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

  const graphGen = (cx, cy, r, msgs) => {
    let qty = msgs.nodes.length;
    for (let i = 0; i < qty; i++) {
      let alpha = (i * (Math.PI * 2)) / qty;
      let [sin, cos] = sinCos(alpha);
      let [x, y] = netShape(cx, cy, r, sin, cos, i, graphType);
      nodeRaw.push([x, y, r0, msgs.nodes[i]]);
      links.push([qty, i]);
    }
    nodeRaw.push([cx, cy, r0, "myself"]);
  };

  graphGen(...center);

  // Formatting the node list
  nodeList = nodeRaw.map((x, i) => [
    i,
    x[0],
    x[1],
    x[2],
    `${x[3]}.jpg`,
    [],
    []
  ]);

  // Formatting the links
  links = links.map((x, i) => ({ id: i, start: x[0], end: x[1] }));
  // Common node style
  let nodeStyle = { fill: "white", "stroke-width": 3, stroke: "white" };

  // Function to generate the SVG nodes
  const nodesGen = nodesList => {
    nodesList.forEach(x => {
      nodeGenerator(
        {
          cy: x[1],
          cx: x[2],
          r: x[3]
        },
        {
          cy: x[1],
          cx: x[2],
          r: x[3] + 6,
          id: `outer${x[0]}`,
          ...nodeStyle,
          fill: "#006ab4",
          "stroke-width": 2
        },
        {
          y: x[1] - x[3],
          x: x[2] - x[3],
          height: x[3] * 2,
          width: x[3] * 2,
          id: `img${x[0]}`,
          href: x[4],
          onclick: `console.log("img${x[0]}")`,
          "clip-path": `url(#clipPath${x[0]})`
        },
        {
          cy: x[1] - x[3],
          cx: x[2] + x[3],
          r: 10,
          id: `text${x[0]}`,
          fill: "white"
        },
        {
          y: x[1] - x[3] + 5,
          x: x[2] + x[3] - 4,
          id: `text2${x[0]}`,
          fill: "steelblue"
        },
        {
          cy: x[1] - x[3],
          cx: x[2] - x[3],
          r: 10,
          id: `unread${x[0]}`,
          fill: "white"
        },
        {
          y: x[1] - x[3] + 5,
          x: x[2] - x[3] - 4,
          id: `unread2${x[0]}`,
          fill: "steelblue"
        },
        x
      );
    });
  };

  const createLink = id => {
    let newLink = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    //   for (prop in linkProps) newLink.setAttribute(prop, linkProps[prop]);
    newLink.setAttribute("id", id);
    newLink.setAttribute("style", "stroke:white;stroke-width:2px;");
    // newLink.setAttribute("style", "stroke:white;stroke-width:3px;");
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
      nodeList[nodeSt][5].push(x["id"]);
      let nodeEnd = x["end"];
      nodeList[nodeEnd][6].push(x["id"]);
    });
  };

  attachNodeLinks();
  linkingNodes();
  nodesGen(nodeList);

  // graphGen(...center);
})([300, 300, 140, msgData], "star");

// console.log(svg);

// let arr = { a: 25, b: 23, c: 58, d: 7, e: 32 };
// console.table(arr);
