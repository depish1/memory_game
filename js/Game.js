import { Card } from "./Card.js";
import { Panel } from "./Panel.js";

export class Game {
  constructor(modal, modalButton) {
    this.modal = modal;
    this.modalButton = modalButton;
    this.board = document.querySelector(".board");
    this.panel = new Panel();
    this.rows = document.querySelectorAll('.board__row')
    this.stopCardsEvents = false;
    this.cards = [];
    this.chosenCards = [];
    this.signsNames = [
      "pear",
      "lemon",
      "cherry",
      "pineapple",
      "paprica",
      "strawberry",
      "banana",
      "orange",
      "tomato",
      "carrot",
      "apple",
      "onion",
    ];
    this.hiddenCardsCount = 0;

    this.handlers = []
    this.modal.classList.toggle('modal--hidden');
    this.startGame()
  }

  startGame() {
    this.createCards();
    this.renderCards();
    this.panel.runTimer();
  }

  createCards() {
    const cardsCount = 24;
    let xPosition = 0;
    let signs = [...this.signsNames];
    for (let i = 0; i < cardsCount; i++) {
      if (i == 12) signs = [...this.signsNames];
      const y = Math.floor(i / 6);
      const x = xPosition;
      const signIndex = Math.floor(Math.random() * signs.length);
      const sign = signs.splice(signIndex, 1)[0];
      const card = new Card(x, y, sign);
      xPosition++;
      xPosition = (i + 1) % 6 == 0 ? 0 : xPosition;

      this.cards.push(card);
    }
  }

  cardClickHandler(cardElement) {
    if(this.stopCardsEvents) return;
    const index = cardElement.dataset.index;
    const card = this.cards[index];
    card.flipCard();
    cardElement.removeEventListener('click', this.handlers[index])
    this.chosenCards.push(card)
    this.checkCards(this);
  }

  checkCards() {
    if(this.chosenCards.length < 2) return
    this.panel.incraseMoves();
    this.stopCardsEvents = !this.stopCardsEvents
    const result = this.chosenCards[0].sign == this.chosenCards[1].sign;
    if(result) this.hiddenCardsCount += 2;
    setTimeout(function(){ 
      this.chosenCards.forEach(c => {
        c.flipCard()
        if(result) c.hideCard()     
      });
      this.stopCardsEvents = !this.stopCardsEvents
      this.chosenCards = [];
      this.renderCards();
      if(this.hiddenCardsCount == this.cards.length) this.endGame();
    }.bind(this), 700);
  }

  renderCards() {
    this.rows.forEach(row => row.innerHTML = '')
    this.cards.forEach((card, index) => {
      card.renderCard(index, this)
    });
  }

  resetGame() {
    this.panel = new Panel();
    this.stopCardsEvents = false;
    this.cards = [];
    this.chosenCards = [];
    this.hiddenCardsCount = 22;
    this.handlers = []
    console.log(this.modal)
    this.modal.classList.toggle('modal--hidden');
    this.startGame()
  }

  endGame() {
    clearInterval(this.panel.timerIndex);
    document.querySelector('.modal__result').textContent = 'Gratulacje, wygrałeś!';
    document.querySelector('.modal_time').textContent = `Czas: ${this.panel.concatTime()}`
    document.querySelector('.modal_moves').textContent = `Ilość Ruchów: ${this.panel.moves}`
    this.modalButton.textContent = "Zagraj jeszcze raz!";
    this.modal.classList.toggle('modal--hidden')
    this.modalButton.addEventListener('click', () => this.resetGame.bind(this))
  }
}
