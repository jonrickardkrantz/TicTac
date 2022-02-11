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
// const cellArray = Array.from(cellElements);
// var cellArray = new Array(9);
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);

let circleTurn;

randomizeStartplayer();

function randomizeStartplayer() {
  cellElements.forEach(function (cell) {
    // en loop
    // nedan startar om efter restartButton
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    setBoardHoverClass();
    winningMessageElement.classList.remove("show");
  });

  var randomNumberBetween0and2 = 1;
  // var randomNumberBetween0and2 = Math.floor(Math.random() * 2); original, den ovan startar alltid AI
  if (randomNumberBetween0and2 == 1) {
    circleTurn = true;
    AIPlays();
  } else {
    startGame();
  }
}

// randomCell = Math.floor(Math.random() * 8);
// let botBox = document.getElementById(randomCell);
// while (botBox.innerHTML == null) {

function AIPlays() {
  randomCell = Math.floor(Math.random() * 8);
  while (cellElements[randomCell] === "") {
    // har en tom array, men den går inte accessa
    randomCell = Math.floor(Math.random() * 8);
  }
  let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; // om currentClass är circleTurn return CIRCLE-CLASS, annars X_CLASS
  placeMark(randomCell, currentClass);
}

restartButton.addEventListener("click", randomizeStartplayer);

function startGame() {
  circleTurn = false;
  cellElements.forEach(function (cell) {
    cell.addEventListener("click", handleClick, { once: true }); // vid "click" gå till metoden "handleClick"
  });
}

function handleClick(e) {
  // "e" är eventet som sker vid "click" i addEventListener
  const cell = e.target; // cellen är den vi klickade på (e.target)
  let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; // om currentClass är circleTurn return CIRCLE-CLASS, annars X_CLASS
  placeMark(cell, currentClass);
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass); // skriver in currentClass (tex X_CLASS som är "x") på div som är klickad på. Och då används css för att skapa ett X.
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Oavgjort!";
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} vinner!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return cellElements.every(function (cell) {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}
// funktionen förklaras 34.00 min i videon
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(function (combination) {
    return combination.every(function (index) {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
