window.onload = () => {
  const data: {
    day: string;
    value: number;
  }[] = [
    { day: "Mon", value: 130 },
    { day: "Tue", value: 200 },
    { day: "Wen", value: 150 },
    { day: "Thu", value: 70 },
    { day: "Fri", value: 60 },
    { day: "Sat", value: 105 },
    { day: "Sun", value: 125 },
  ];
  const canvas: HTMLCanvasElement | null = document.getElementById(
    "canvas"
  ) as HTMLCanvasElement;
  if (!canvas || !canvas.getContext) throw TypeError;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw TypeError;
  const dimension = 500;
  canvas.width = dimension;
  canvas.height = dimension;
  const [pt, pr, pb, pl] = [20, 20, 20, 40];
  ctx.lineCap = "round";
  ctx.textAlign = "left";
  ctx.moveTo(pl, dimension - pb);
  ctx.lineTo(dimension - pr, dimension - pb);
  const gapWidth = (dimension - pl - pr) / data.length;
  drawBottomScale(data, pl, gapWidth, dimension, pb, ctx, pr);
  // 根据最大值计算出y轴方向的刻度
  const maxValue = data.sort((a, b) => b.value - a.value)[0].value;
  const yLines = maxValue / 50; // FIXME y轴刻度线
  const yHeight = (dimension - pt - pb) / yLines;
  for (let i = 0; i <= yLines; i++) {
    const iy = dimension - (i * yHeight + pb);
    ctx.moveTo(pl, iy);
    ctx.lineTo(dimension - pr, iy);
    const value = `${i * 50}`;
    const {
      width,
      // @ts-ignore
      fontBoundingBoxAscent,
      // @ts-ignore
      fontBoundingBoxDescent,
    } = ctx.measureText(value);
    //https://longviewcoder.com/2021/02/11/html5-canvas-text-line-height-measurement/
    const offsetX = 5;
    const tx = pl - offsetX - width;
    console.log(fontBoundingBoxAscent, fontBoundingBoxDescent);
    const ty = iy + (fontBoundingBoxAscent + fontBoundingBoxDescent) / 2;
    ctx.strokeText(value, tx, ty);
  }
  ctx.stroke();
};
/**
 * 底部刻度尺
 * @param data
 * @param pl
 * @param gapWidth
 * @param dimension
 * @param pb
 * @param ctx
 * @param pr
 */
function drawBottomScale(
  data: { day: string; value: number }[],
  pl: number,
  gapWidth: number,
  dimension: number,
  pb: number,
  ctx: CanvasRenderingContext2D,
  pr: number
) {
  const dotHeight = 5;
  for (let i = 0; i < data.length; i++) {
    const { day } = data[i];
    const ix = pl + i * gapWidth;
    const iy = dimension - pb;
    ctx.moveTo(ix, iy);
    ctx.lineTo(ix, iy + dotHeight);
    const { width: wordWidth } = ctx.measureText(day);
    const wc = (ix + ix + gapWidth) / 2;
    ctx.strokeText(day, wc - wordWidth / 2, iy + 16);
  }
  ctx.moveTo(dimension - pr, dimension - pb);
  ctx.lineTo(dimension - pr, dimension - pb + dotHeight);
  ctx.stroke();
}
