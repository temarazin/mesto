import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._submitForm = submitForm;
    this._boundHandleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    this._submitForm(e, this._getInputValues());
  }

  _getInputValues() {
    const result = {};
    this._form.querySelectorAll('.form__input').forEach( input => {
      result[input.name] = input.value;
    });

    return result;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._boundHandleSubmit);
  }

  removePopupListeners() {
    super.removePopupListeners();
    this._form.removeEventListener('submit', this._boundHandleSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
