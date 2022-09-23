export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    } //------------------------------------------------
    toString() {
        return " (" + this.x + ", " + this.y + ") ";
    } //------------------------------------------------
    copy() {
        return new Position(this.x, this.y);
    } //------------------------------------------------
    static getDistance(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    }
} //=====================================================
export class Counter {
} //======================================================
export class NormalCounter extends Counter {
    //----------------------------------------------------
    constructor(max_count, start_count = max_count) {
        super();
        this._count = start_count;
        this._max_count = max_count;
    } //----------------------------------------------------
    ready() {
        return (this._count <= 0);
    } //----------------------------------------------------
    count() {
        if (!this.ready()) {
            this._count -= 1;
        }
    } //-----------------------------------------------------
    reset() {
        this._count = this._max_count;
    }
} //=========================================================
export class RandomCounter extends Counter {
    constructor(count_min, count_max, start_count = Math.floor(Math.random() * (count_max - count_min))) {
        super();
        this._count_range = { min: 0, max: 0 };
        this._count_range.min = count_min;
        this._count_range.max = count_max;
        this._count = start_count;
    } //----------------------------------------------------------------------
    ready() {
        return (this._count <= 0);
    } //----------------------------------------------------------------------
    count() {
        if (!this.ready()) {
            this._count -= 1;
        }
    } //----------------------------------------------------------------------
    reset(max_rate = 1) {
        this._count = Math.floor((this._count_range.min +
            Math.random() * (this._count_range.max - this._count_range.min + 1)) * max_rate);
    } //----------------------------------------------------------------------
} //=============================================================
