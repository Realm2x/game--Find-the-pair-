const createGame = () => {
  let numberCard = [],
      firstCard = null,
      secondCard = null,
      clickable = true;

  const createMenuGame = () => {
    const gameMenu = document.querySelector('.game__table');
    const input = document.createElement('input');
    input.classList.add('input', 'input-reset');
    input.placeholder = 'Введите кол-во карточек'
    const buttonGameStart = document.createElement('button');
    buttonGameStart.classList.add('btn-reset', 'game__btn-menu');
    buttonGameStart.textContent = 'Начать игру';
    const buttonReset = document.createElement('button');
    buttonReset.classList.add('btn-reset', 'game__btn-reset', 'visible-hidden');
    buttonReset.textContent = 'Играть ещё раз';

    gameMenu.innerHTML = '';
    gameMenu.append(input, buttonGameStart, buttonReset);

    return {
          buttonGameStart,
          buttonReset,
          input,
        }
  }

  function startGame(object) {
    let input = object.input;
    input = input.value;
    if (input >= 4 && input <= 12 && input % 2 === 0) {
      return input;
    } else {
      input = 4;
      return input;
    }
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
  }

  function createElemCards(array) {
    for (const item of array) {
      const list = document.querySelector('.game__cards');
      const card = document.createElement('div');
      card.classList.add('card')
      card.textContent = item;
      list.append(card);
    }
  }

  function createTimer() {
    const timer = document.createElement('h1');
    timer.classList.add('game__timer');
    timer.textContent = 60;
    document.querySelector('.game__cards').append(timer);

    return timer;
  }

  document.addEventListener('DOMContentLoaded', function() {
    const menuGame = createMenuGame();

    menuGame.buttonGameStart.addEventListener('click', () => {
      menuGame.input.classList.add('visible-hidden');
      menuGame.buttonGameStart.classList.add('visible-hidden');
      document.querySelector('.game__cards').classList.remove('visible-hidden');
      const timer = createTimer();

      function startTimer() {
        if (timer.textContent > 0) {
          timer.textContent--;
        } else {
          document.querySelector('.game__cards').classList.add('visible-hidden');
          menuGame.buttonReset.classList.remove('visible-hidden');
          clearInterval(interval);
          menuGame.buttonReset.addEventListener('click', () => {
            document.querySelector('.game__cards').innerHTML = '';
            numberCard = [],
            firstCard = null,
            secondCard = null,
            clickable = true;
            menuGame.buttonReset.classList.add('visible-hidden');
            menuGame.input.classList.remove('visible-hidden');
            menuGame.buttonGameStart.classList.remove('visible-hidden');
          })
        }
      }

      const interval = setInterval(startTimer, 1000);

      const start = startGame(menuGame);

      const randomCard = shuffle(numberCard, start);

      createElemCards(randomCard);

      const cards = document.querySelectorAll('.card');
      cards.forEach((elem) => {
        elem.addEventListener('click', (e) => {
          let index = e.currentTarget;
          if (clickable === true  && !elem.classList.contains('success')) {
            if (firstCard === null) {
              elem.classList.add('open');
              firstCard = index;
          } else {
            if (firstCard !== index) {
                elem.classList.add('open');
                secondCard = index;
                clickable = false;
              }
            }
          }
          if (firstCard !== null && secondCard !== null && firstCard !== secondCard) {
            if (firstCard.textContent === secondCard.textContent) {
              setTimeout(() => {
                firstCard.classList.add('success');
                secondCard.classList.add('success');
                firstCard = null;
                secondCard = null;
                clickable = true;
                if (document.querySelectorAll(".card.success").length === randomCard.length) {
                  setTimeout(() => {
                  document.querySelector('.game__cards').classList.add('visible-hidden');
                  menuGame.buttonReset.classList.remove('visible-hidden');
                  clearInterval(interval);
                  menuGame.buttonReset.addEventListener('click', () => {
                    document.querySelector('.game__cards').innerHTML = '';
                    numberCard = [],
                    firstCard = null,
                    secondCard = null,
                    clickable = true;
                    menuGame.buttonReset.classList.add('visible-hidden');
                    menuGame.input.classList.remove('visible-hidden');
                    menuGame.buttonGameStart.classList.remove('visible-hidden');
                  })
                  }, 400);
                }
              }, 200);
            } else {
              setTimeout(() => {
                  firstCard.classList.remove('open');
                  secondCard.classList.remove('open');
                  firstCard = null;
                  secondCard = null;
                  clickable = true;
              }, 500);
            }
          }
        });
      });
    });



  })
}
createGame();
