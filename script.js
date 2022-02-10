// TODO Glue-code
// TODO Test
// TODO Lägg till ställningsräknare

const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]"); // skapar en array av "data-cell"
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);

startGame();

function startGame() {
  var randomNumberBetween0and2 = Math.floor(Math.random() * 2);
  if (randomNumberBetween0and2 == 1) {
    AIPlays();
  } else {
    userPlays();
  }
}

function AIPlays() {}
availible;
