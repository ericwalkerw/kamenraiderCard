import { Card } from "./Card.js";
import { Label } from "../lib/Label.js";
import * as sp from "../lib/utilities.js";

export class CoreGame {
  constructor(data) {
      this._data = data;
      this.openedCards = [];
      this.matchCards = [];
      this._score_txt = this.createText();
      this.init();
  }
  init(){
    const shufferData = sp.shuffle([...this._data.images,...this._data.images]);
    const shufferData2 = ([...this._data.images,...this._data.images]);
    this.createBoard(shufferData2);
  }
  createText() {
    const scoreEl = document.querySelector(".Score");
    const score_txt = new Label("SCORE : 10000");
    score_txt.size = 50;
    score_txt.font = "arial";
    score_txt.color = "red";
    scoreEl.appendChild(score_txt.elm);
    return score_txt;
  }
  createCard(sprite, cover, x, y) {
    const containerNode = document.querySelector(".container");
    const card = new Card(sprite, cover, x, y);
    containerNode.appendChild(card.elm);
    return card;
  }
  createBoard(data) {
    for (let i = 0; i < data.length; i++) {
      const newCard = this.createCard(
        data[i],
        this._data.cover,
        this._data.width,
        this._data.height
      );
      newCard.posX = (this._data.width + this._data.gap) * (i % this._data.col);
      newCard.posY =
        (this._data.height + this._data.gap) * Math.floor(i / this._data.col);
      newCard.elm.onclick = () => {
        this.clickHandler(newCard);
      };
    }
  }
  clickHandler(card) {
    if (
      this.openedCards.length <= 1 &&
      !this.openedCards.includes(card) &&
      !this.matchCards.includes(card)
    ) {
      card.flip(0.6);
      this.openedCards.push(card);
      console.log(this.openedCards);
      if (this.openedCards.length === 2) {
        this.checkMatch();
        if (this.matchCards.length === this._data.row * this._data.col) {
          setTimeout(() => {
            alert("WIN GAME");
          }, 1000);
        }
      }
    }
    return;
  }
  checkMatch() {
    const [card1, card2] = this.openedCards;
    console.log(card1.uniqueID, card2.uniqueID);
    const isMatch = card1.uniqueID === card2.uniqueID;
    if (isMatch) {
      this.matchCards.push(card1, card2);
      card1.matchAnim(1.1, 1.2);
      card2.matchAnim(1.1, 1.2);
      this._data.score += 1000;
    } else {
      card1.flip(0.6, 1.5);
      card2.flip(0.6, 1.5);
      this._data.score -= 500;
    }
    setTimeout(() => {
      this.openedCards = [];
      this._score_txt.text = `SCORE : ${this._data.score}`;
    }, 2500);
  }
}
