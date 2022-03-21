import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._boundSubmitForm = submitForm.bind(this);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._boundSubmitForm);
  }

  close() {
    super.close();
    this._form.reset;
  }
}
