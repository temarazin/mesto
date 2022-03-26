import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
    this._handleSubmitForm = submitForm;
    this._inputList = this._form.querySelectorAll('.form__input');
  }

  _getInputValues() {
    const result = {};
    this._inputList.forEach( input => {
      result[input.name] = input.value;
    });

    return result;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmitForm( this._getInputValues() );
    } );
  }

  close() {
    super.close();
    this._form.reset();
  }
}
