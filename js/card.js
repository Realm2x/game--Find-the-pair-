export class Card {
  constructor(container, cardNumber, flip) {
    this.container = container;
    this._cardNumber = cardNumber;
    this._open = false;
    this._success = false;
    this.cardElement = this.createElement();
    this.flip = flip;
    this.clickable = true;
  }

  createElement() {
    const card = document.createElement('div');
    card.classList.add('card');
    this.container.append(card);

    card.addEventListener('click', () => {
      this.flip(this);
    })
    return card;
  }

  set cardNumber(value) {
    this._cardNumber = value;
    this.cardElement.textContent = value;
  }

  get cardNumber() {
    return this._cardNumber;
  }

  set open(value) {
    this._open = value;
    if (value) {
      this.cardElement.classList.add('open');
    } else {
      this.cardElement.classList.remove('open');
    }
  }

  get open() {
    return this._open;
  }

  set success(value) {
    this._success = value;
    if (value) {
      this.cardElement.classList.add('success');
      this.cardElement.style.pointerEvents = 'none';
    } else {
      this.cardElement.classList.remove('success');
      this.cardElement.style.pointerEvents = 'auto';
    }
  }

  get success() {
    return this._success;
  }

  flipCard(firstCard, secondCard, clearGame, TIME_OPEN, TIME_COMPARE, numberCard) {
    if (firstCard._cardNumber === secondCard._cardNumber) {
      setTimeout(() => {
        firstCard.success = true;
        secondCard.success = true;
        this.clickable = true;
        if (document.querySelectorAll(".card.success").length === numberCard.length) {
          setTimeout(() => {
            alert('Победа')
            clearGame();
            return;
          }, TIME_COMPARE);
        }
      }, TIME_OPEN);
    } else {
      setTimeout(() => {
        firstCard.open = false;
        secondCard.open = false;
        this.clickable = true;
      }, TIME_COMPARE);
    }
  }
}
