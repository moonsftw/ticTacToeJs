const boardElement = document.querySelector('#board');
const cellElements = document.querySelectorAll('#cell');
/* Globals */
let crossTurn = true; //Primer turno: las cruces
const crossClass = 'cross';
const circleClass = 'circle';
const winningCombinations = [
  [0,1,2], //horizontal
  [3,4,5],
  [6,7,8],

  [0,3,6], //vertical
  [1,4,7],
  [2,5,8],

  [0,4,8], //diagonal
  [2,4,6],
]

boardElement.addEventListener('click', handleClick); //(e) => handleClick(e) aquí el evento se pasa explicitamente

function handleClick(e) {
  const cell = e.target;
  const currentMark = crossTurn ? crossClass : circleClass;
  const cellIsMarked = cell.classList.contains(crossClass) || cell.classList.contains(circleClass);

  if(cellIsMarked) return;

  placeMark(cell, currentMark);
  if(checkWin(currentMark)) {
    alert(`WINS: ${currentMark}`);
  } else if(checkDraw()) {
    alert(`It's a DRAW!`);
  } else {
    swapTurns();
  }
  
}

function placeMark(cell, markToAdd) {
  cell.classList.add(markToAdd);
}

function swapTurns(){
  crossTurn = !crossTurn;
}

function checkWin(currentMark) {
  return winningCombinations.some(combination => {
    return combination.every(cell => {
      return cellElements[cell].classList.contains(currentMark);
    })
  })
}

function checkDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(crossClass) || cell.classList.contains(circleClass);
  })
}