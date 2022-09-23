export class Color {
    //------------------------------------------
    constructor(color_id, color_text, color_code, sub_color_code) {
        this._color_id = color_id;
        this._color_text = color_text;
        this._color_code = color_code;
        this._sub_color_code = sub_color_code;
    } //------------------------------------------
    ColorID() {
        return this._color_id;
    } //------------------------------------------
    ColorText() {
        return this._color_text;
    } //------------------------------------------
    ColorCode() {
        return this._color_code;
    } //-------------------------------------------
    subColorCode() {
        return this._sub_color_code;
    } //-------------------------------------------
} //===============================================
export class ColorGetter {
}
export const RED = new Color(1, "RED", "#FF0000", "#882222");
export const GREEN = new Color(2, "GREEN", "#00FF00", "#228822");
export const BLUE = new Color(3, "BLUE", "#1111FF", "#222288");
export const WHITE = new Color(4, "WHITE", "#DDDDDD", "#666666");
export const GRAY = new Color(5, "GRAY", "#666666", "#EEEEEE");
export const BLACK = new Color(6, "BLACK", "#111111", "#454545");
export const NULL_COLOR = new Color(-1, "NULL", "", "");
//---------------------------------------------------
const rgb_color_table = [RED, GREEN, BLUE];
const grayscale_color_table = [WHITE, GRAY, BLACK];
const all_color_table = [RED, GREEN, BLUE, WHITE, GRAY, BLACK];
//---------------------------------------------------
export function GetRandomRGBColor() {
    return rgb_color_table[Math.floor(Math.random() * rgb_color_table.length)];
} //---------------------------------------------------
export function GetRandomGrayscaleColor() {
    return grayscale_color_table[Math.floor(Math.random() * grayscale_color_table.length)];
} //---------------------------------------------------
export function GetRandomColorFromAll() {
    return all_color_table[Math.floor(Math.random() * all_color_table.length)];
} //----------------------------------------------------
export function GetRGBColors() {
    return [RED, BLUE, GREEN];
} //----------------------------------------------------
