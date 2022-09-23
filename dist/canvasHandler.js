import * as basic from "./basic.js";
export const CANVAS = document.getElementById("Canvas");
export const CONTEX_2D = CANVAS.getContext("2d");
export var clearColor = "#888888";
export function centerPosition() {
    return new basic.Position(CANVAS.width / 2, CANVAS.height / 2);
}
export function clearCanvas() {
    CONTEX_2D.fillStyle = clearColor;
    CONTEX_2D.fillRect(0, 0, CANVAS.width, CANVAS.height);
}
export function canvasSizeMatchWindow() {
    CANVAS.width = window.innerWidth - 30;
    CANVAS.height = window.innerHeight - 30;
}
export function getOffsetCenter(x, y) {
    var center = centerPosition();
    return new basic.Position(center.x + x, center.y + y);
}
