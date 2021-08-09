"use strict";
window.onload = () => {
    const canvas = document.getElementById("canvas");
    if (!canvas)
        throw TypeError;
    if (!canvas.getContext)
        throw TypeError;
    const ctx = canvas.getContext("2d");
    if (!ctx)
        throw TypeError();
    const padding = 20;
    const dimension = 400;
    canvas.width = dimension;
    canvas.height = dimension;
    const radius = (dimension - padding * 2) / 2;
    const color = "#1890FF";
    const lineWidth = 2;
    debugger;
    const axisLength = dimension - lineWidth;
    const unit = axisLength / 8;
    const range = 0.2; // 振幅
    let currRange = range;
    const xOffset = lineWidth;
    let sp = 0; // 周期偏移量
    let currData = 0;
    const waveupsp = 0.005; // 水波上涨速度
    let arcStack = [];
    const bR = radius - lineWidth;
    const circleOffset = -(Math.PI / 2);
    let circleLock = true;
    for (let i = circleOffset; i < circleOffset + 2 * Math.PI; i += 1 / (8 * Math.PI)) {
        arcStack.push([radius + bR * Math.cos(i), radius + bR * Math.sin(i)]);
    }
    const cStartPoint = arcStack.shift();
    ctx.strokeStyle = color;
    ctx.moveTo(cStartPoint[0], cStartPoint[1]);
    ctx.strokeStyle = color;
    const lg = ctx.createLinearGradient(dimension, 0, dimension, dimension);
    lg.addColorStop(0, "#1890FF77");
    lg.addColorStop(1, color);
    ctx.globalCompositeOperation = "destination-over";
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(radius, radius, bR - padding, 0, Math.PI * 2, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.save();
    ctx.arc(radius, radius, radius - 6 * lineWidth - padding, 0, Math.PI * 2, true);
    ctx.restore();
    ctx.clip();
    ctx.fillStyle = lg;
    // ctx.fillStyle = color;
    ctx.fillRect(0, dimension, dimension, -200);
};
