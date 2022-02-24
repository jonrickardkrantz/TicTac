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

let circleTurn;

restartButton.addEventListener("click", startGame);

startGame();

function startGame() {
  circleTurn = false;
  cellElements.forEach(function (cell) {
    // Tömmer spelplan
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
  var randomNumberBetween0and2 = 1;
  // var randomNumberBetween0and2 = Math.floor(Math.random() * 2); original, den ovan startar alltid AI
  if (randomNumberBetween0and2 == 1) {
    circleTurn = true;
  } else {
    circleTurn = false;
  }
  makeMove();
}

function makeMove() {
  if (circleTurn == true) {
    AIPlays();
  } else {
    cellElements.forEach(function (cell) {
      // en loop
      // nedan startar om efter restartButton
      cell.addEventListener("click", handleClick, { once: true }); // vid "click" gå till metoden "handleClick"
    });
  }
}

function AIPlays() {
  randomCell = Math.floor(Math.random() * 8);
  while (
    cellElements[randomCell].classList.contains("circle") ||
    cellElements[randomCell].classList.contains("x")
  ) {
    randomCell = Math.floor(Math.random() * 8);
  }
  let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; // om currentClass är circleTurn return CIRCLE-CLASS, annars X_CLASS
  placeMarkForAI(randomCell, currentClass);
}

function handleClick(e) {
  // "e" är eventet som sker vid "click" i addEventListener
  const cell = e.target; // cellen är den vi klickade på (e.target)
  let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; // om currentClass är circleTurn return CIRCLE-CLASS, annars X_CLASS
  if (cell.classList.contains("circle") || cell.classList.contains("x")) {
    handleClick();
  } else {
    placeMark(cell, currentClass);
  }
}

function placeMarkForAI(cell, currentClass) {
  cellElements[cell].classList.add(currentClass); // skriver in currentClass (tex X_CLASS som är "x") på div som är klickad på. Och då används css för att skapa ett X. Jag har en array (cellElements), jag har en indexplats i arrayen (cell)
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
    makeMove();
  }
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
    makeMove();
  }
}

function endGame(draw) {
  setTimeout(function () {
    if (draw) {
      winningMessageTextElement.innerText = "Oavgjort!";
    } else {
      winningMessageTextElement.innerText = `${circleTurn ? "O" : "X"} vinner!`;
    }
    winningMessageElement.classList.add("show");
  }, 1000);
}

function isDraw() {
  return [...cellElements].every(function (cell) {
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
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(function (combination) {
    return combination.every(function (index) {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
