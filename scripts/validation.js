function toggleButtonSubmitState(button, isEnabled) {
  if (isEnabled) {
    button.classList.remove('form__submit_disabled');
  } else {
    button.classList.add('form__submit_disabled');
  }
  button.disabled = !isEnabled;
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

function isValid(input) {
  return input.validity.valid;
}

function validateInput(input) {
  let result = isValid(input);
  if (result) {
    hideValidationError(input.id);
  } else {
    showValidationError(input.id, input.validationMessage);
  }
  return result;
}

function validateForm(form) {
  let isValidForm = true;
  const btnSubmit = form.querySelector('.form__submit');
  const inputList = form.querySelectorAll('.form__input');
  Array.from(inputList).forEach( (input) => {
    isValidForm &= isValid(input);
  });
  toggleButtonSubmitState(btnSubmit, isValidForm);
}

function validate(e) {
  validateInput(e.target);
  validateForm(e.currentTarget);
}

function setValidationListeners() {
  const forms = Array.from(document.querySelectorAll('.form'));
  forms.forEach( form => {
    form.addEventListener('input', validate);
  });
}

function enableValidation() {
  setValidationListeners();
}
