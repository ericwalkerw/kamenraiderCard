import { Node } from "./Node.js";

export class Label extends Node {
  constructor(txt) {
    super();
    this.elm = document.createElement('p');
    this.text = txt;
  }
  
  get text() {return this._text;}
  get font() {return this._font;}
  get color() {return this._color;}
  get size() {return this._size;}

  set text(value) {
    this._text = value;
    this.elm.textContent = value;
  }
  set font(value) {
      this._font = value;
      this.elm.style.fontFamily = value;
  }
  set color(value) {
    this._color = value;
    this.elm.style.color = value;
  }
  set size(value) {
    this._size = value;
    this.elm.style.fontSize = `${value}px`;
  }
}