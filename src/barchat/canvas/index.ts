const data: Data[] = [
  {
    name: "questions",
    value: 17,
  },
  {
    name: "schools",
    value: 25,
  },
  {
    name: "philosophers",
    value: 35,
  },
];

const chartWidth = 480;
const chartHeight = 300;
const margin = 15;

const containerWidth = chartWidth + margin * 2;
const containerHeight = chartHeight + margin * 2;

const names = Array.from(data, ({ name }) => name);
const values = Array.from(data, ({ value }) => value);
const indices = Array.from(data, (_, i) => i);

const step = chartWidth / names.length;
const barWidth = step * 0.8;
const xs = Array.from(indices, (i) => i * step); // 起始横坐标

const y = chartHeight;

const vmax = Math.max(...values);
const barHeights = Array.from(values, (value) => chartHeight * (value / vmax));

const nameColor = {
  questions: "#f58b8ff9",
  schools: "#61ddaa",
  philosophers: "#65789b",
};

//@ts-ignore
const colors: string[] = Array.from(names, (name) => nameColor[name]);

/*
const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
if (!canvas) {
  throw Error("canvas is not existed");
}
canvas.style.width = chartWidth + "px";
canvas.style.height = chartHeight + "px";

// 解决模糊问题
canvas.width = chartWidth * 2;
canvas.height = chartHeight * 2;

const context = canvas.getContext("2d");
if (!context) {
  throw Error("not support canvas 2d");
}
context.scale(2, 2);

context.translate(margin, margin); // 坐标原点移动到绘制图表的区域

for (const index of indices) {
  const color = colors[index];
  const x = xs[index];
  const barHeight = barHeights[index];
  const value = values[index];

  context.fillStyle = color;
  context.fillRect(x, y - barHeight, barWidth, barHeight);

  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "white";
  context.font = "25px PingFangSC-Regular, sans-serif";
  context.fillText(`${value}`, x + barWidth / 2, y - barHeight / 2);
}
*/

const createSvgElement = (type: string) =>
  document.createElementNS("http://www.w3.org/2000/svg", type);

const svg = document.getElementById("container-svg");
if (!svg) {
  throw new Error("svg element not existed");
}

svg.setAttribute("width", `${chartWidth}`);
svg.setAttribute("height", `${chartHeight}`);
svg.setAttribute("viewBox", [0, 0, chartWidth, chartHeight].join(" "));

const g = createSvgElement("g") as SVGGElement;
g.setAttribute("transform", `translate(${margin}, ${margin})`);
svg.appendChild(g);

for (const index of indices) {
  const color = colors[index];
  const x = xs[index];
  const barHeight = barHeights[index];
  const value = values[index];

  const rect = createSvgElement("rect");
  rect.setAttribute("x", `${x}`);
  rect.setAttribute("y", `${y - barHeight}`);
  rect.setAttribute("fill", color);
  rect.setAttribute("width", `${barWidth}`);
  rect.setAttribute("height", `${barHeight}`);
  g.appendChild(rect);

  const text = createSvgElement("text");
  text.textContent = `${value}`;
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("fill", "white");
  text.setAttribute("font-family", "PingFangSC-Regular, sans-serif");
  text.setAttribute("font-size", `25`);
  text.setAttribute("alignment-baseline", "middle");
  text.setAttribute("x", `${x + barWidth / 2}`);
  text.setAttribute("y", `${y - barHeight / 2}`);

  g.appendChild(text);
}
