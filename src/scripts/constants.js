/* validator settings */
export const validatorSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error-msg_active'
}

/* template selector */
export const cardTemplate = '#card';

/* forms */
export const formProfile = document.forms['form-profile'];
export const formCard = document.forms['form-card'];
export const formConfirm = document.forms['form-confirm'];
export const formAvatar = document.forms['form-avatar'];

/* controls */
export const btnEditProfile = document.querySelector('.profile__edit-button');
export const btnCardAdd = document.querySelector('.profile__add-button');
export const inputProfileName = formProfile.querySelector('.form__input[name="name"]');
export const inputProfileProf = formProfile.querySelector('.form__input[name="about"]');
export const inputConfirmCardId = formConfirm.querySelector('[name="card-id"]');
export const avatarImage = document.querySelector('.profile__avatar');
export const avatarBtn = document.querySelector('.profile__avatar-btn');
