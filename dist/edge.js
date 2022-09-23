export class Edge {
    //-----------------------------------------------------------
    constructor(vertex1, vertex2) {
        this._vertex1 = vertex1;
        this._vertex2 = vertex2;
    }
    //-----------------------------------------------------------
    linkedVertexs() {
        return [this._vertex1, this._vertex2];
    }
}
