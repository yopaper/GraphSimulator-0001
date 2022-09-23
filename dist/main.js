import * as canvas from "./canvasHandler.js";
import * as vertex from "./vertex.js";
import * as color from "./color.js";
import * as graphBuilder from "./graphBuilder.js";
const UPDATE_MODE = 0;
const SHOW_MODE = 1;
var loopMode = SHOW_MODE;
//---------------------------------------------------
function main() {
    console.log("程式開始!");
    canvas.canvasSizeMatchWindow();
    console.log(canvas.CANVAS.width, canvas.CANVAS.height);
    graphBuilder.buildTriangleRect(120, 70, 16);
    var v = vertex.GraphVertex.getRandomGraphVertex();
    v.setColor(color.WHITE);
    window.setInterval(loop, 30);
    var windowSizeButton = document.getElementById("WindowSizeButton");
    windowSizeButton.onclick = canvas.canvasSizeMatchWindow;
} //--------------------------------------------------
function loop() {
    if (loopMode == UPDATE_MODE) {
        vertex.Vertex.updateVertexs();
        if (!vertex.Vertex.updateEnable()) {
            loopMode = SHOW_MODE;
        }
    }
    else if (loopMode == SHOW_MODE) {
        vertex.Vertex.startUpdate();
        loopMode = UPDATE_MODE;
        canvas.clearCanvas();
        vertex.Vertex.showVertexs();
        vertex.GraphVertex.allVertexsChangeToNextColor();
    }
}
main();
