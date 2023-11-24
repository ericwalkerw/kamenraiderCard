import { Node } from "../lib/Node.js";
import { Sprite } from "../lib/Sprite.js";

export class Card {
  constructor(src, cover) {
    this.node = new Node();
    this.sprite = new Sprite(src);
    this.cover = new Sprite(cover);
    this.node.addChild(this.sprite);
    this.node.addChild(this.cover);
    this.show = false;
    this.elm = this.node.elm;
    this.uniqueID = this.sprite.id;
    this.isFlipped = false;
  }

  //#region GET
  get sizeX(){return this._sizeX;}
  get sizeY(){return this._sizeY;}
  get elm(){return this._elm;}
  get show() {return this._show;}
  //#endregion

  //#region SET
  set sizeX(value){
    this._sizeX = value;
    this.node.width = value;
  }
  set sizeY(value){
    this._sizeY = value;
    this.node.height = value;
  }
  set show(value) {
    this._show = value;
    this.sprite.active = value
    this.cover.active = !value;
  }
  set elm(value){
    this._elm = value;
    this.node.elm = value;
  }
  //#endregion
  
  showImg(value){
    this.show = value;
  }
  flip(dur, delay = 0){
    gsap.to(this.node,{
      scaleX:0, duration: dur,delay, onComplete:()=>{
          this.showImg(!this.show);
        this.isFlipped = true;
      }
    })
    gsap.to(this.node, {scaleX:1, duration:dur, delay:dur+delay,
    onComplete:()=> {
      this.isFlipped = false;
    }});
  }
  matchAnim(size, dur){
    gsap.to(this.node, {
      scaleX: size,
      scaleY: size,
      duration: dur,
      delay:dur,
      onComplete: () => {
        gsap.to(this.node, {
          blur: 0,
          duration: dur,
          onComplete: () => {
            this.node.removeChild(this.sprite);
            this.node.elm.remove();
          },
        });
      },
    });
  }
}
