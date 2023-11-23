export class Node {
  constructor() {
    this.elm = this.createNodeElement();
    this.children = [];
    this.scaleX = 1;
    this.scaleY = 1;
    this.blur = 1;
  }

//#region GET
  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get active() {
    return this._active;
  }
  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
  get scaleX() {
    return this._scaleX;
  }
  get scaleY() {
    return this._scaleY;
  }
  get blur() {
    return this._opacity;
  }
//#endregion

//#region SET
set x(value) {
    this._x = value;
    this.elm.style.left = `${this._x}px`;
  }
  set y(value) {
    this._y = value;
    this.elm.style.top = `${this._y}px`;
  }
  set active(value) {
    this._active = value;
    this.elm.style.display = value ? "block" : "none";
  }
  set width(value) {
    this._width = value;
    this.elm.style.width = `${value}px`;
  }
  set height(value) {
    this._height = value;
    this.elm.style.height = `${value}px`;
  }
  set scaleX(value) {
    this._scaleX = value;
    this.elm.style.transform = `scale(${this.scaleX},${this.scaleY})`;
  }
  set scaleY(value) {
    this._scaleY = value;
    this.elm.style.transform = `scale(${this.scaleX},${this.scaleY})`;
  }
  set blur(value) {
    this._opacity = value;
    this.elm.style.opacity = value;
  }
//#endregion 

  createNodeElement() {
    const elm = document.createElement("div");
    elm.style.position = "absolute";
    return elm;
  }
  addChild(node) {
    this.children.push(node);
    this.elm.appendChild(node.elm);
  }
  removeChild(node) {
    this.children.pop(node);
    this.elm.removeChild(node.elm);
  }
}
