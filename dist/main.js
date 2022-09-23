import * as canvas from "./canvasHandler.js";
import * as vertex from "./vertex.js";
import * as color from "./color.js";
import * as graphBuilder from "./graphBuilder.js";
function main() {
    console.log("程式開始!");
    canvas.canvasSizeMatchWindow();
    console.log(canvas.CANVAS.width, canvas.CANVAS.height);
    graphBuilder.buildTriangleRect(120, 70, 16);
    var v = vertex.GraphVertex.getRandomGraphVertex();
    v.setColor(color.WHITE);
    //v.getLinkedVertex(0).setColor(color.GRAY);
    window.setInterval(update, 225);
} //--------------------------------------------------
function update() {
    canvas.clearCanvas();
    vertex.Vertex.showVertexs();
    //vertex.Vertex.showEdges();
    vertex.Vertex.updateVertexs();
    vertex.GraphVertex.allVertexsChangeToNextColor();
}
main();
