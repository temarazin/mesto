export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = document.querySelector(templateSelector).content;
    this._clickImage = handleCardClick;
  }

  _removeCard = (e) => {
    e.stopPropagation();
    this._card.remove();
  }

  _likeCard = () => {
    this._btnLike.classList.toggle('photo-grid__like-button_active');
  }

  _setEventListeners() {
    this._btnLike.addEventListener('click', this._likeCard);
    this._btnRemove.addEventListener('click', this._removeCard);
    this._imageElement.addEventListener('click', () => {
      this._clickImage({link: this._imageElement.src, label: this._nameElement.textContent});
    });
  }

  createCard() {
    this._card = this._cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
    this._imageElement = this._card.querySelector('.photo-grid__image');
    this._nameElement = this._card.querySelector('.photo-grid__item-name');

    this._btnLike = this._card.querySelector('.photo-grid__like-button');
    this._btnRemove = this._card.querySelector('.photo-grid__remove-button');

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._nameElement.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }
}
