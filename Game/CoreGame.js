import { Card } from "./Card.js";
import { Label } from "../lib/Label.js";
import * as sp from "../lib/utilities.js";

export class CoreGame {
  constructor(data) {
    this._data = data;
    this.openedCards = [];
    this.matchCards = [];
    this._score_txt = this.createScoreText();
    this.init();
  }
  get status() {
    return this._status;
  }
  set status(value) {
    return (this._status = value);
  }
  init() {
    const shuffleData = sp.shuffle([
      ...this._data.images,
      ...this._data.images,
    ]);
    const shuffleData2 = [...this._data.images, ...this._data.images];
    this.createBoard(shuffleData2);
  }
  createScoreText() {
    const scoreEl = document.querySelector(".Score");
    const score_txt = new Label(`SCORE : ${this._data.score}`);
    scoreEl.replaceChildren(score_txt.elm);
    score_txt.size = 48;
    score_txt.y = 50;
    score_txt.x = 10;
    score_txt.font = "arial";
    score_txt.color = "red";
    scoreEl.appendChild(score_txt.elm);
    return score_txt;
  }

  createCard(sprite, cover) {
    const containerNode = document.querySelector(".container");
    const card = new Card(sprite, cover);
    card.sizeX = this._data.width;
    card.sizeY = this._data.height;
    card.node.x = 350;
    card.node.y = 300;
    containerNode.style.top = "100px";
    containerNode.appendChild(card.elm);
    return card;
  }
  createBoard(data) {
    const gapX = this._data.width + this._data.gap;
    const gapY = this._data.height + this._data.gap;
    for (let i = 0; i < this._data.row * this._data.col; i++) {
      const newCard = this.createCard(
        data[i],
        this._data.cover,
        this._data.width,
        this._data.height
      );
      this.animateCard(newCard, i, gapX, gapY);
      setTimeout(() => {
        newCard.elm.onclick = () => {
          this.clickHandler(newCard);
        };
      }, 1500);
    }
  }

  animateCard(card, index, gapX, gapY) {
    gsap.to(card.node, {
      x: gapX * (index % this._data.col),
      y: gapY * Math.floor(index / this._data.col),
      duration: 1.5,
      delay: index * 0.1,
      ease: "back.inOut",
    });
  }

  clickHandler(card) {
    if (
      this.openedCards.length <= 1 &&
      !this.openedCards.includes(card) &&
      !this.matchCards.includes(card)
    ) {
      card.flip(0.3);
      this.openedCards.push(card);
      console.log(this.openedCards);
      if (this.openedCards.length === 2) {
        this.checkMatch();
        if (this.matchCards.length === this._data.row * this._data.col) {
          setTimeout(() => {
            const winText = new Label("CHÚC MỪNG BẠN ĐÃ CHIẾN THẮNG!");
            winText.width = 1920;
            winText.size = 50;
            winText.x = 440;
            winText.y = 440;
            winText.color = "white";
            document.body.appendChild(winText.elm);
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
      card1.matchAnim(1.2, 1);
      card2.matchAnim(1.2, 1);
      this._data.score += 1000;
    } else {
      card1.flip(0.3, 1.3);
      card2.flip(0.3, 1.3);
      this._data.score -= 500;
    }
    this._score_txt.text = `SCORE : ${this._data.score}`;
    setTimeout(() => {
      this.openedCards = [];
    }, 2500);
  }
}
