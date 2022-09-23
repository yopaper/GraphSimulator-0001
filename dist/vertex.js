import * as color from "./color.js";
import * as basic from "./basic.js";
import * as canvas from "./canvasHandler.js";
export class Vertex {
    //------------------------------------------------------
    constructor(x, y) {
        this._pos = new basic.Position(x, y);
        Vertex.addVertex(this);
    } //-----------------------------------------------------
    //-----------------------------------------------------
    // PUBLIC
    pos() {
        return this._pos;
    } //-----------------------------------------------------
    drawPosition() {
        var center_pos = canvas.centerPosition();
        return new basic.Position(center_pos.x + this._pos.x, center_pos.y + this._pos.y);
    } //-----------------------------------------------------
    //------------------------------------------------------
    static addVertex(vertex) {
        if (!this.vertex_list.includes(vertex)) {
            this.vertex_list.push(vertex);
            console.log("Vertex新增:" + vertex);
        }
    } //-----------------------------------------------------
    static removeVertex(vertex) {
        if (this.vertex_list.includes(vertex)) {
            var index = this.vertex_list.indexOf(vertex);
            this.vertex_list.slice(index, 1);
        }
    } //-----------------------------------------------------
    // PUBLIC
    static getVertex(index) {
        return this.vertex_list[index];
    } //-----------------------------------------------------
    static getRandomVertex() {
        return this.vertex_list[Math.floor(Math.random() * this.vertex_list.length)];
    } //-----------------------------------------------------
    static vertexCount() {
        return this.vertex_list.length;
    } //-----------------------------------------------------
    static updateVertexs() {
        for (var i = 0; i < this.vertex_list.length; i++) {
            this.vertex_list[i].update();
        }
    } //----------------------------------------------------
    static showVertexs() {
        for (var i = 0; i < this.vertex_list.length; i++) {
            this.vertex_list[i].showSelf();
        }
    } //----------------------------------------------------
    static showEdges() {
        for (var i = 0; i < this.vertex_list.length; i++) {
            this.vertex_list[i].showEdge();
        }
    } //------------------------------------------------------
} //============================================================
// STATIC ----------------------------------------------
Vertex.vertex_list = [];
export class GraphVertex extends Vertex {
    //-----------------------------------------------------
    constructor(x, y, set_color) {
        super(x, y);
        this._linked_vertexs = [];
        this._color = set_color;
        this._next_color = color.NULL_COLOR;
        GraphVertex.addGraphVertex(this);
    } //-----------------------------------------------------
    color() {
        return this._color;
    } //-----------------------------------------------------
    setColor(set_color) {
        this._color = set_color;
    } //-----------------------------------------------------
    linkedVertexCount() {
        return this._linked_vertexs.length;
    } //-----------------------------------------------------
    getLinkedVertex(index) {
        return this._linked_vertexs[index];
    } //-----------------------------------------------------
    getAllLinkedVertexs() {
        return Array.from(this._linked_vertexs);
    } //-----------------------------------------------------
    link(vertex) {
        if (vertex == this)
            return;
        if (!this._linked_vertexs.includes(vertex)) {
            this._linked_vertexs.push(vertex);
            vertex.link(this);
        }
    } //-----------------------------------------------------
    linkVertexsInRange(range_distance, link_chance = 1) {
        for (var i = 0; i < GraphVertex.graph_vertex_list.length; i++) {
            var vertex = GraphVertex.graph_vertex_list[i];
            var distance = basic.Position.getDistance(this._pos, vertex.pos());
            if (distance <= range_distance && Math.random() < link_chance) {
                this.link(vertex);
            }
        }
    } //-----------------------------------------------------
    changeToNextColor() {
        if (this._next_color != color.NULL_COLOR) {
            this._color = this._next_color;
            this._next_color = color.NULL_COLOR;
        }
    } //-----------------------------------------------------
    showSelf() {
        if (this._color == color.NULL_COLOR)
            return;
        var draw_pos = this.drawPosition();
        canvas.CONTEX_2D.beginPath();
        canvas.CONTEX_2D.fillStyle = this._color.ColorCode();
        canvas.CONTEX_2D.strokeStyle = this._color.subColorCode();
        canvas.CONTEX_2D.lineWidth = 2;
        canvas.CONTEX_2D.arc(draw_pos.x, draw_pos.y, 8, 0, 2 * Math.PI);
        canvas.CONTEX_2D.fill();
        canvas.CONTEX_2D.stroke();
        canvas.CONTEX_2D.closePath();
    } //-----------------------------------------------------
    showEdge() {
        canvas.CONTEX_2D.lineWidth = 1;
        canvas.CONTEX_2D.strokeStyle = "#555555";
        var draw_pos = this.drawPosition();
        for (var i = 0; i < this._linked_vertexs.length; i++) {
            var target_vertex = this._linked_vertexs[i];
            var target_pos = target_vertex.drawPosition();
            canvas.CONTEX_2D.beginPath();
            canvas.CONTEX_2D.moveTo(draw_pos.x, draw_pos.y);
            canvas.CONTEX_2D.lineTo(target_pos.x, target_pos.y);
            canvas.CONTEX_2D.stroke();
            canvas.CONTEX_2D.closePath();
        }
    } //-----------------------------------------------------
    getLinkedVertexData() {
        var data = {};
        for (var i = 0; i < this.linkedVertexCount(); i++) {
            var get_color = this.getLinkedVertex(i).color();
            var color_id = get_color.ColorID();
            if (!(color_id in data)) {
                data[color_id] = { color_object: get_color, color_number: 0 };
            }
            data[color_id].color_number += 1;
        }
        return data;
    } //-----------------------------------------------------
    //------------------------------------------------------
    static linkWithIndex(index1, index2) {
        this.getGraphVertex(index1).link(this.getGraphVertex(index2));
    } //-----------------------------------------------------
    static allVertexsLinkVertexsInRange(range_distance, link_chance = 1) {
        for (var i = 0; i < this.graph_vertex_list.length; i++) {
            this.graph_vertex_list[i].linkVertexsInRange(range_distance, link_chance);
        }
    } //----------------------------------------------------
    static allVertexsChangeToNextColor() {
        for (var i = 0; i < this.graph_vertex_list.length; i++) {
            this.graph_vertex_list[i].changeToNextColor();
        }
    } //-----------------------------------------------------
    static getGraphVertex(index) {
        return this.graph_vertex_list[index];
    } //-----------------------------------------------------
    static getRandomGraphVertex() {
        return this.graph_vertex_list[Math.floor(Math.random() * this.graph_vertex_list.length)];
    } //-----------------------------------------------------
    static addGraphVertex(graph_vertex) {
        if (!this.graph_vertex_list.includes(graph_vertex)) {
            this.graph_vertex_list.push(graph_vertex);
            console.log("GraphVertex新增:" + graph_vertex);
        }
    } //-----------------------------------------------------
} //============================================================
// STATIC
GraphVertex.graph_vertex_list = [];
export class MaxColorVertex extends GraphVertex {
    update() {
        var max_number = 0;
        var max_colors = [];
        var link_data = this.getLinkedVertexData();
        //console.log( link_data );
        for (var i in link_data) {
            var color_data = link_data[i];
            if (color_data.color_number > max_number) {
                max_colors.length = 0;
                max_number = color_data.color_number;
                max_colors.push(color_data.color_object);
            }
            else if (color_data.color_number == max_number) {
                max_colors.push(color_data.color_object);
            }
        }
        if (max_colors.length > 0) {
            this._next_color = max_colors[Math.floor(Math.random() * max_colors.length)];
            //console.log( this._next_color );
        }
    } //------------------------------------------------------
} //============================================================
export class RandomLinkVertex extends GraphVertex {
    update() {
        var linked_vertex = this.getAllLinkedVertexs();
        if (linked_vertex.length > 0) {
            this._next_color = linked_vertex[Math.floor(Math.random() * linked_vertex.length)].color();
        }
    }
} //============================================================
export class ColorFlowVertex extends GraphVertex {
    constructor(x, y, set_color, cool_down_min = 10, cool_down_max = 15) {
        super(x, y, set_color);
        this._cool_down_counter = new basic.RandomCounter(cool_down_min, cool_down_max);
    } //-------------------------------------------------------
    static init() {
        this.colorFlowTable[color.RED.ColorID()] = color.GREEN;
        this.colorFlowTable[color.GREEN.ColorID()] = color.BLUE;
        this.colorFlowTable[color.BLUE.ColorID()] = color.RED;
        this.colorFlowTable[color.WHITE.ColorID()] = color.GRAY;
        this.colorFlowTable[color.GRAY.ColorID()] = color.BLACK;
        this.colorFlowTable[color.BLACK.ColorID()] = color.WHITE;
    } //------------------------------------------------------------
    update() {
        this._cool_down_counter.count();
        if (!this._cool_down_counter.ready())
            return;
        this._cool_down_counter.reset();
        if (!(this._color.ColorID() in ColorFlowVertex.colorFlowTable))
            return;
        var target_color = ColorFlowVertex.colorFlowTable[this._color.ColorID()];
        //console.log( this._color.ColorText()+"嘗試變成"+target_color.ColorText() );
        var link_data = this.getLinkedVertexData();
        if (target_color.ColorID() in link_data) {
            this._next_color = target_color;
        }
    }
} //============================================================
ColorFlowVertex.colorFlowTable = {};
export class CurrentVertex extends GraphVertex {
    //---------------------------------------------------------
    constructor(x, y, cool_down_min = 3, cool_down_max = 17) {
        super(x, y, color.BLACK);
        this._cool_down_counter = new basic.RandomCounter(cool_down_min, cool_down_max, 0);
    } //----------------------------------------------------
    update() {
        this._cool_down_counter.count();
        if (!this._cool_down_counter.ready())
            return;
        if (this._color == color.BLACK) {
            var link_data = this.getLinkedVertexData();
            if (color.WHITE.ColorID() in link_data) {
                this._next_color = color.WHITE;
                this._cool_down_counter.reset();
            }
        }
        else if (this._color == color.WHITE) {
            this._next_color = color.GRAY;
            this._cool_down_counter.reset();
        }
        else if (this._color == color.GRAY) {
            if (Math.random() > 0.053) {
                this._cool_down_counter.reset(2);
                this._next_color = color.BLACK;
            }
            else {
                this._cool_down_counter.reset(10);
                this._next_color = color.NULL_COLOR;
            }
        }
        else {
            this._next_color = color.BLACK;
            this._cool_down_counter.reset(0.55);
        }
    } //----------------------------------------------------
} //============================================================
function init() {
    console.log("Vertex 模組初始化!");
    ColorFlowVertex.init();
} //-------------------------------------------------------------
init();
