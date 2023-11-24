import { CoreGame } from "./CoreGame.js";
import { Label } from "../lib/Label.js";

class GameManager {
  constructor() {
    this.data = {
      col: 5,
      row: 4,
      gap: 20,
      width: 140,
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
        "./img/wiseman.jpg",
      ],
    };
    this.init();
  }
  init() {
    const startButton = new Label("START");
    startButton.size = 200;
    startButton.x = 550;
    startButton.y = 350;
    startButton.color = "white";
    startButton.elm.onclick = () => {
      startButton.active = false;
      const core = new CoreGame(this.data);
      this.createReplay();
    };
    document.body.appendChild(startButton.elm);
  }
  createReplay() {
    const containerEL = document.querySelector('.container');
    const replay = new Label("REPLAY");
    replay.size = 50;
    replay.x = 80;
    replay.y = 120;
    replay.color = "white";
    replay.elm.onclick = () => {
      containerEL.replaceChildren();
      const core = new CoreGame(this.data);
      this.data.score = 10000;
    };
    document.body.appendChild(replay.elm);
  }
}

const game = new GameManager();
