const boardElement = document.querySelector('#board');
const cellElements = document.querySelectorAll('#cell');
const dialogElement = document.querySelector('dialog');
const modalMessageElement = document.querySelector('#winner-message')
const crossesScoreElement = document.querySelector('[crosses-score]');
const circlesScoreElement = document.querySelector('[circles-score]')
const resetButton = document.querySelector('[reset-btn]')

/* Globals */
let crossTurn = true; //Primer turno: las cruces
const crossClass = 'cross';
const circleClass = 'circle';
const winningCombinations = [
  [0, 1, 2], //horizontal
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6], //vertical
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8], //diagonal
  [2, 4, 6],
];

let crossesCumulativeScore = 0;
let circlesCumulativeScore = 0;

startGame();

boardElement.addEventListener('click', handleClick); //(e) => handleClick(e) aquí el evento se pasa explicitamente
dialogElement.addEventListener('close', () => {
  resetGame();
  updateScoreOnBoard();  
});
resetButton.addEventListener('click', resetCumulativeScore);


function startGame() {
  setBoardHover(crossTurn);
  crossTurn = true;
  clearBoard();
}

function clearBoard() {
  cellElements.forEach(cell => {
    cell.classList.remove(crossClass);
    cell.classList.remove(circleClass);
  })
}

function setBoardHover(crossTurn) {
  crossTurn ?
    boardElement.classList.replace('circle-plays', 'cross-plays') :
    boardElement.classList.replace('cross-plays', 'circle-plays');
}

function updateScoreOnBoard() {
  if(crossesScoreElement !== crossesCumulativeScore){
    crossesScoreElement.textContent = crossesCumulativeScore;
  }
  if(circlesScoreElement !== circlesCumulativeScore){
    circlesScoreElement.textContent = circlesCumulativeScore;
  }

}

function resetCumulativeScore() {
  crossesCumulativeScore = 0;
  circlesCumulativeScore = 0;
  updateScoreOnBoard();
}

function handleClick(e) {
  const cell = e.target;
  const currentMark = crossTurn ? crossClass : circleClass;
  const cellIsMarked = cell.classList.contains(crossClass) || cell.classList.contains(circleClass);

  if (cellIsMarked) return;

  placeMark(cell, currentMark);
  if (currentMarkWins(currentMark)) {
    incrementScore(currentMark);    
    showWinner(currentMark);
    return;
  }

  if (boardIsFull()) {
    showDraw();
    return;
  }
  swapTurns();
  setBoardHover(crossTurn);
}

function incrementScore(winner) {
  if (winner === crossClass ){
    crossesCumulativeScore++;
  } else {
    circlesCumulativeScore++;
  }
}

function placeMark(cell, markToAdd) {
  cell.classList.add(markToAdd);
}

function swapTurns() {
  crossTurn = !crossTurn;
}

function currentMarkWins(currentMark) {
  return winningCombinations.some(combination => {
    return combination.every(cell => {
      return cellElements[cell].classList.contains(currentMark);
    })
  })
}

function boardIsFull() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(crossClass) || cell.classList.contains(circleClass);
  })
}

function showModal(message){
  modalMessageElement.textContent = message;
  dialogElement.showModal();
}
function showWinner(currentMark) {
  showModal(`${currentMark} wins!`);
}

function resetGame(){
  startGame();
}

function showDraw(){
  showModal("It's a DRAW!")
}
