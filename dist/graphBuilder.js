import * as vertex from "./vertex.js";
import * as color from "./color.js";
export function buildRect(width, height, gap, hollow_rate = 0) {
    var offset = { x: -width / 2, y: -height / 2 };
    for (var dx = 0; dx < width; dx++) {
        for (var dy = 0; dy < height; dy++) {
            if (Math.random() < hollow_rate)
                continue;
            var v_pos = { x: (dx + offset.x) * gap, y: (dy + offset.y) * gap };
            console.log(v_pos);
            new vertex.RandomLinkVertex(v_pos.x, v_pos.y, color.GetRandomRGBColor());
        }
    }
    vertex.GraphVertex.allVertexsLinkVertexsInRange(gap * 1.9, 1);
} //---------------------------------------------------------------------------
export function buildTriangleRect(width, height, gap, hollow_rate = 0) {
    var offset = { x: -width / 2, y: -height / 2 };
    for (var dx = 0; dx < width; dx++) {
        for (var dy = 0; dy < height; dy++) {
            if (Math.random() < hollow_rate)
                continue;
            var v_pos = { x: (dx + offset.x + (dy % 2) * 0.5) * gap, y: (dy + offset.y) * gap };
            console.log(v_pos);
            new vertex.CurrentVertex(v_pos.x, v_pos.y);
        }
    }
    vertex.GraphVertex.allVertexsLinkVertexsInRange(gap * 1.5, 1);
} //----------------------------------------------------------------------------
