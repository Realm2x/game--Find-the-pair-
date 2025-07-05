import { Card } from './card.js';

export class AmazingCard extends Card {
  constructor(container, cardNumber, flip) {
    super(container, cardNumber, flip);
  }

  set cardNumber(value) {
    this._cardNumber = value;
  }

  set open(value) {
    this._open = value;
    if (value) {
      this.cardElement.classList.add('open');
      this.setCardImage();
    } else {
      this.cardElement.classList.remove('open');
      this.setCardBack();
    }
  }

  setCardImage() {
    const cardsImgArray = [
      '../img/белка.jpg',
      '../img/бел2ка.jpg',
      '../img/змея.jpg',
      '../img/кошка.jpg',
      '../img/молния.jpg',
      '../img/сова.jpg',
      '../img/утка.jpg',
    ];
    const imageUrl = cardsImgArray[this._cardNumber - 1];

    setTimeout(() => {
      this.cardElement.innerHTML = '';
      const img = document.createElement('img');
      img.classList.add('card__img');
      img.src = imageUrl;

      img.onload = () => {
        this.cardElement.append(img);
        this.cardElement.style.color = '#e80a0a';
      };

      img.onerror = () => {
        img.src = '/img/error.png';
        this.cardElement.append(img);
        this.cardElement.style.color = 'white'
      };
    }, 100);
  }

  setCardBack() {
    setTimeout(() => {
      this.cardElement.innerHTML = '';
      const img = document.createElement('img');
      img.classList.add('card__img');
      img.src = '/img/ph.jpg';
      this.cardElement.append(img);
      this.cardElement.style.color = "transparent";
    }, 150)
}
}
