function setValidationListeners() {
  const forms = Array.from(document.querySelectorAll('.form'));
  forms.forEach( form => {
    form.addEventListener('input', validate);
  });
}

function validate(e) {
  validateInput(e.target);
  validateForm(e.currentTarget);
}

function validateInput(input) {
  let result = input.validity.valid;
  if (result) {
    hideValidationError(input.id);
  } else {
    showValidationError(input.id, input.validationMessage);
  }
  return result;
}

function validateForm(form) {
  let result = true;
  const btnSubmit = form.querySelector('.form__submit');
  const inputList = form.querySelectorAll('.form__input');
  Array.from(inputList).forEach( (input) => {
    result &= isValid(input);
  });
  toggleButtonSubmitState(btnSubmit, !result);
}

function isValid(input) {
  return input.validity.valid;
}

function showValidationError(fieldId, message) {
  const messageBox = document.querySelector(`.${fieldId}-error`);
  messageBox.textContent = message;
  messageBox.classList.add('form__error-msg_active');
}

function hideValidationError(fieldId) {
  const messageBox = document.querySelector(`.${fieldId}-error`);
  messageBox.textContent = '';
  messageBox.classList.remove('form__error-msg_active');
}

function toggleButtonSubmitState(button, isDisabled) {
  if (isDisabled) {
    button.classList.add('form__submit_disabled');
  } else {
    button.classList.remove('form__submit_disabled');
  }
  button.disabled = isDisabled;
}

function enableValidation() {
  setValidationListeners();
}
