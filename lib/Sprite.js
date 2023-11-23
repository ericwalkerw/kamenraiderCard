import {Node} from "./Node.js"

export class Sprite extends Node{
    constructor(src){
        super();
        this.elm = document.createElement('img');
        this.elm.style.width = "100%";
        this.elm.style.height = "100%"
        this.image = src;
    }
    get image(){return this._image;}
    get id(){return this._id;}
    set image(value){
        this._image = value;
        this.elm.src = value;
        this.elm.alt = value;
        
        const [src, name,ext] = this.image.split('.');
        const [,file, id] = name.split('/');
        this._id = id;
    }
}