import { AmazingCard } from './AmazingCard.js';

let numberCard = [];
let firstCard = null;
let secondCard = null;

const flip = (card) => {
  if (!card.clickable) return;

  if (firstCard === null) {
    firstCard = card;
    firstCard.open = true;
  } else if (card !== firstCard && secondCard === null) {
    secondCard = card;
    secondCard.open = true;
    card.clickable = false;
    checkCards(card)
  }
};

const checkCards = (card) => {
  if (firstCard !== null && secondCard !== null) {
    card.flipCard(firstCard, secondCard, clearGame, 200, 500, numberCard);
    firstCard = null;
    secondCard = null;
  }
}

const createMenuGame = () => {
  const gameMenu = document.querySelector('.game__table');
  const input = document.createElement('input');
  input.classList.add('input', 'input-reset');
  input.placeholder = 'Введите кол-во карточек';
  const buttonGameStart = document.createElement('button');
  buttonGameStart.classList.add('btn-reset', 'game__btn-menu');
  buttonGameStart.textContent = 'Начать игру';

  gameMenu.innerHTML = '';
  gameMenu.append(input, buttonGameStart);

  return {
    buttonGameStart,
    input,
  };
};

function startGame(object) {
  let input = object.input.value;
  let numCards;
  if (input >= 4 && input <= 12 && input % 2 === 0) {
    numCards = parseInt(input, 10);
  } else {
    alert('Количество карточек должно быть четным числом от 4 до 12.');
    numCards = 4;
  }
  return numCards;
}

const shuffle = (array, number) => {
  for (let i = 1; i <= number / 2; i++) {
    array.push(i);
    array.push(i);
  }

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

function createTimer() {
  const timer = document.createElement('h1');
  timer.classList.add('game__timer');
  timer.textContent = 60;
  document.querySelector('.game__cards').append(timer);

  return timer;
}

function createElemCards(array, flip) {
  const list = document.querySelector('.game__cards');
  const cards = [];
  for (const item of array) {
    const card = new AmazingCard(list, item, flip);
    cards.push(card);
  }
  return cards;
}

const clearGame = (timer, interval) => {
  const cardsContainer = document.querySelector('.game__cards');
  cardsContainer.innerHTML = '';
  numberCard = [];
  firstCard = null;
  secondCard = null;
  clearInterval(interval);
  document.querySelector('.game__menu').classList.toggle('visible-hidden');
  cardsContainer.classList.toggle('visible-hidden');
};

document.addEventListener('DOMContentLoaded', () => {
  const menuGame = createMenuGame();
  const gameMenu = document.querySelector('.game__table');
  const cardsContainer = document.querySelector('.game__cards');
  const gameMenuContainer = document.querySelector('.game__menu');

  menuGame.buttonGameStart.addEventListener('click', () => {
    gameMenuContainer.classList.toggle('visible-hidden');
    cardsContainer.classList.toggle('visible-hidden');
    const timer = createTimer();
    let interval;


    function startTimer() {
      if (timer.textContent > 0) {
        timer.textContent--;
      } else {
        alert('Вы проиграли');
        clearGame(timer, interval);
      }
    }

    interval = setInterval(startTimer, 1000);

    const start = startGame(menuGame);
    numberCard = shuffle([], start);
    const cards = createElemCards(numberCard, flip);
  });
});
