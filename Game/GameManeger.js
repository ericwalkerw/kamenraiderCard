import { CoreGame } from "./CoreGame.js";

class GameManager {
  constructor() {
    this.data = {
      col: 5,
      row: 4,
      gap:20,
      width: 130,
      height: 180,
      score: 10000,
      cover: "./img/cover.jpg",
      images: [
        "./img/builo.jpg",
        "./img/fif.jpg",
        "./img/g4.jpg",
        "./img/horobi.jpg",
        "./img/impear.jpg",
        "./img/jamu.jpg",
        "./img/jinaai.jpg",
        "./img/leangle.jpg",
        "./img/solomon.jpg",
        "./img/wiseman.jpg"
      ],
    };
    const core = new CoreGame(this.data);
  }
}

const game = new GameManager();
