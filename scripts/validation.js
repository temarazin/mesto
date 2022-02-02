let settings = {};

function toggleButtonSubmitState(button, isEnabled) {
  if (isEnabled) {
    button.classList.remove(settings.inactiveButtonClass);
  } else {
    button.classList.add(settings.inactiveButtonClass);
  }
  button.disabled = !isEnabled;
}

function showValidationError(input, message) {
  input.classList.add(settings.inputErrorClass);

  const messageBox = document.querySelector(`.${input.id}-error`);
  messageBox.textContent = message;
  messageBox.classList.add(settings.errorClass);
}

function hideValidationError(input) {
  input.classList.remove(settings.inputErrorClass);

  const messageBox = document.querySelector(`.${input.id}-error`);
  messageBox.textContent = '';
  messageBox.classList.remove(settings.errorClass);
}

function isValid(input) {
  return input.validity.valid;
}

function validateInput(input) {
  let result = isValid(input);
  if (result) {
    hideValidationError(input);
  } else {
    showValidationError(input, input.validationMessage);
  }
  return result;
}

function validateForm(form) {
  let isValidForm = true;
  const btnSubmit = form.querySelector(settings.submitButtonSelector);
  const inputList = form.querySelectorAll(settings.inputSelector);
  Array.from(inputList).forEach( (input) => {
    isValidForm &= isValid(input);
  });
  toggleButtonSubmitState(btnSubmit, isValidForm);
}

function validate(input) {
  validateInput(input);
  const form = input.closest(settings.formSelector);
  validateForm(form);
}

function handleInput(e) {
  validate(e.target);
}

function setValidationListeners() {
  const forms = Array.from(document.querySelectorAll(settings.formSelector));
  forms.forEach( form => {
    form.addEventListener('input', handleInput);
  });
}

function enableValidation(settingsData) {
  settings = settingsData;
  setValidationListeners();
}
