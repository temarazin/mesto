export class FormValidator {
  constructor(settings, form) {
    this._settings = settings;
    this._form = form;
    this._currentInput = undefined;
    this._btnSubmit = form.querySelector(settings.submitButtonSelector);
  }

  _toggleButtonSubmitState(isEnabled) {
    const {inactiveButtonClass} = this._settings;

    if (isEnabled) {
      this._btnSubmit.classList.remove(inactiveButtonClass);
    } else {
      this._btnSubmit.classList.add(inactiveButtonClass);
    }
    this._btnSubmit.disabled = !isEnabled;
  }

  _showValidationError() {
    const {inputErrorClass, errorClass} = this._settings;

    this._currentInput.classList.add(inputErrorClass);

    const messageBox = document.querySelector(`.${this._currentInput.id}-error`);
    messageBox.textContent = this._currentInput.validationMessage;
    messageBox.classList.add(errorClass);
  }

  _hideValidationError() {
    const {inputErrorClass, errorClass} = this._settings;

    this._currentInput.classList.remove(inputErrorClass);

    const messageBox = document.querySelector(`.${this._currentInput.id}-error`);
    messageBox.textContent = '';
    messageBox.classList.remove(errorClass);
  }

  _isValidInput(input = this._currentInput) {
    return input.validity.valid;
  }

  _validateInput() {
    let result = this._isValidInput();
    if (result) {
      this._hideValidationError();
    } else {
      this._showValidationError();
    }
    return result;
  }

  _validateForm() {
    const {inputSelector} = this._settings;

    let isValidForm = true;
    const inputList = this._form.querySelectorAll(inputSelector);
    Array.from(inputList).forEach( (input) => {
      isValidForm &= this._isValidInput(input);
    });
    this._toggleButtonSubmitState(isValidForm);
  }

  _validate() {
    this._validateInput();
    this._validateForm();
  }

  validate(input = false) {
    if (input) {
      this._currentInput = input;
      this._validate();
    } else {
      this._validateForm();
    }

  }

  enableValidation() {
    this._form.addEventListener('input', (e) => {
      this._currentInput = e.target;
      this._validate();
    });
  }
}
