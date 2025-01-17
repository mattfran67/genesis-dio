let order = [];
let clickedOrder = [];
let score = 0;
let playerTurn = false;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul

// elementos DOM
const modal = document.querySelector('#modal');
const modalMsg = modal.querySelector('#modalMsg');
const playBtn = modal.querySelector('#playBtn');
const roundNumber = document.querySelector('#roundNumber');
const playerTurnEl = document.querySelector('#player');
// cores
const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const green = document.querySelector(".green");
const yellow = document.querySelector(".yellow");

//cria ordem aletoria de cores
let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i));
  }
};

//acende a proxima cor
let lightColor = (element, number) => {
  const time = number * 1000 + 1000;
  const interval = 500;

  setTimeout(() => {
    element.classList.add("selected");
  }, time);

  setTimeout(() => {
    element.classList.remove("selected");
    if ((number + 1) === order.length) {
      playerTurn = true;
      playerTurnEl.textContent = 'YOU';
    }
  }, time + interval);
};

//checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      return;
    }
  }
  if (clickedOrder.length == order.length) {
    // alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
    nextLevel();
  }
};

//funcao para o clique do usuario
let click = (color) => {
  if (!playerTurn) return;

  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add("selected");

  setTimeout(() => {
    createColorElement(color).classList.remove("selected");
    checkOrder();
  }, 250);
};

//funcao que retorna a cor
let createColorElement = (color) => {
  switch (color) {
    case 0:
      return green;
    case 1:
      return red;
    case 2:
      return yellow;
    case 3:
      return blue;
  }
};

//funcao para proximo nivel do jogo
let nextLevel = () => {
  score++;
  roundNumber.textContent = score;
  playerTurnEl.textContent = 'CPU';
  playerTurn = false;
  shuffleOrder();
};

//funcao para game over
let gameOver = () => {
  modal.style.display = 'flex';
  modalMsg.textContent = "You've lost! Don't worry try again." ;
  order = [];
  clickedOrder = [];
};

//funcao de inicio do jogo
let playGame = () => {
  modal.style.display = 'none';

  score = 0;
  nextLevel();
};

//eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//inicio do jogo
playBtn.onclick = () => playGame();
