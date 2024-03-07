const boardElement = document.querySelector('#board');
let crossTurn = true; //Primer turno: las cruces

boardElement.addEventListener('click', handleClick); //(e) => handleClick(e) aquí el evento se pasa explicitamente

function handleClick(e) {
  if(e.target.classList.contains('circle') || e.target.classList.contains('cross')) return;
  if(crossTurn) {
    e.target.classList.add('cross');
  } else {
    e.target.classList.add('circle');
  }

  crossTurn = !crossTurn;
}

