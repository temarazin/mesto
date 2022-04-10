export default class Card {
  constructor(data, templateSelector, {...handlers}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardTemplate = document.querySelector(templateSelector).content;
    this._clickImage = handlers.handleCardClick;
    this._clickTrash = handlers.handleTrashClick;
    this._id = data._id;
    this._isOwner = data.isOwner;
  }

  removeCard() {
    this._card.remove();
  }

  _likeCard = () => {
    this._btnLike.classList.toggle('photo-grid__like-button_active');
  }

  _setEventListeners() {
    this._btnLike.addEventListener('click', this._likeCard);
    this._imageElement.addEventListener('click', () => {
      this._clickImage({link: this._imageElement.src, label: this._nameElement.textContent});
    });

    if (this._isOwner) {
      this._btnRemove.addEventListener('click', () => {this._clickTrash(this)});
    }
  }

  createCard() {
    this._card = this._cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
    this._imageElement = this._card.querySelector('.photo-grid__image');
    this._nameElement = this._card.querySelector('.photo-grid__item-name');

    this._likeCounterElement = this._card.querySelector('.photo-grid__like-count');
    this._btnLike = this._card.querySelector('.photo-grid__like-button');
    this._btnRemove = this._card.querySelector('.photo-grid__remove-button');

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._nameElement.textContent = this._name;
    this._likeCounterElement.textContent = this._likes.length;

    if (!this._isOwner) this._btnRemove.remove();

    this._setEventListeners();

    return this._card;
  }
}
