import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.image__img');
    this._label = this._popup.querySelector('.image__label');
  }

  open({link, label}) {
    this._image.src = link;
    this._image.alt = label;
    this._label.textContent = label;
    super.open();
  }
}
