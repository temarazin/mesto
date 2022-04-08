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

/* controls */
export const btnEditProfile = document.querySelector('.profile__edit-button');
export const btnCardAdd = document.querySelector('.profile__add-button');
export const inputProfileName = formProfile.querySelector('.form__input[name="name"]');
export const inputProfileProf = formProfile.querySelector('.form__input[name="about"]');

/* initial cards */
export const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];
