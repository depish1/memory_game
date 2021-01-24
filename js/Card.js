export class Card {
  constructor(x, y, signName) {
    this.x = x;
    this.row = document.querySelector(`[data-rowNumber="${y}"]`);
    this.sign = signName;
    this.awers = false;
    this.isHidden = false;
  }
  
  renderCard(index, game) {
    const cardElement = document.createElement("div");
    this.selector = cardElement;
    const side = this.awers ? "card--front" : "card--back";
    cardElement.classList.add(`card`, `${side}`);
    cardElement.dataset.index = `${index}`
    cardElement.innerHTML = `<svg class="card__img hidden">
    <use href="./assets/fruits.svg#${this.sign}"></use>
    </svg>`
    if (this.isHidden) {
      cardElement.classList.add("hidden");
    } else {
    const handler = game.cardClickHandler.bind(game, cardElement);
    game.handlers.push(handler)
    cardElement.addEventListener('click', handler)
    }
    this.row.insertAdjacentElement("beforeend", cardElement);
  }

  hideCard() {
    this.isHidden = true;
    this.selector.classList.toggle('hidden')
  }

  flipCard() {
    this.selector.classList.toggle('card--back')
    this.selector.classList.toggle('card--front')
    this.awers = !this.awers
    this.selector.firstChild.classList.toggle('hidden')
    this.isHidden = !this.isHidden
  }
}

