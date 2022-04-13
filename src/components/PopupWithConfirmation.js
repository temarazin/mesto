import Popup from './Popup.js'

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._submitHandler = submitHandler;
    this._submitElem = this._form.querySelector('.form__submit');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitHandler(this._data, this._submitElem);
    } );
  }

  open(data) {
    super.open();
    this._data = data;
  }
}
