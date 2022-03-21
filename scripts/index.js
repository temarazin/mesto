import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { initialCards } from './initialСards.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';

/* validator settings */
const validatorSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error-msg_active'
}

/* template selector */
const cardTemplate = '#card';

/* popups */
// const popupProfile = document.querySelector('.popup_name_profile');
// const popupCard = document.querySelector('.popup_name_card');
const popupProfile = new PopupWithForm('.popup_name_profile', handleProfileSubmit);
const popupCard = new PopupWithForm('.popup_name_card', handleCardSubmit);

// const popupImage = document.querySelector('.popup_name_image');
const popupImage = new PopupWithImage('.popup_name_image');
// popupImage.elImage = popupImage.querySelector('.image__img');
// popupImage.elLabel = popupImage.querySelector('.image__label');

/* forms */
const formProfile = document.forms['form-profile'];
const formCard = document.forms['form-card'];

/* validators */
const formProfileValidator = new FormValidator(validatorSettings, formProfile);
const formCardValidator = new FormValidator(validatorSettings, formCard);

/* controls */
const btnEditProfile = document.querySelector('.profile__edit-button');
const btnCardAdd = document.querySelector('.profile__add-button');
const inputProfileName = formProfile.querySelector('.form__input[name="name"]');
const inputProfileProf = formProfile.querySelector('.form__input[name="profession"]');
const inputCardName = formCard.querySelector('.form__input[name="name"]');
const inputCardImageLink = formCard.querySelector('.form__input[name="image-link"]');

/* elements */
const profileName = document.querySelector('.profile__name');
const profileProf = document.querySelector('.profile__profession');
// const cardContainer = document.querySelector('.photo-grid');
const cardContainer = new Section({items: initialCards, renderer: addCard}, '.photo-grid');


/* functions */
// function setPopupListeners(popup) {
//   const buttonClosePopup = popup.querySelector('.popup__close-btn');

//   buttonClosePopup.addEventListener('click', handleButtonClosePopup);
//   popup.addEventListener('click', handlePopupClick);
//   document.addEventListener('keydown', handlePopupEscPress);
// }

// function removePopupListeners(popup) {
//   const buttonClosePopup = popup.querySelector('.popup__close-btn');

//   buttonClosePopup.removeEventListener('click', handleButtonClosePopup);
//   popup.removeEventListener('click', handlePopupClick);
//   document.removeEventListener('keydown', handlePopupEscPress);
// }

// function openPopup(popup) {
//   setPopupListeners(popup);
//   popup.classList.add('popup_opened');
// }

// function closePopup(popup) {
//   removePopupListeners(popup);
//   popup.classList.remove('popup_opened');
// }

function showImage(data) {
    popupImage.open(data);
  }

// const handleButtonClosePopup = (e) => {
//   const popup = e.currentTarget.closest('.popup');
//   closePopup(popup);
// }

// const handlePopupClick = (e) => {
//   if (e.target === e.currentTarget)
//     closePopup(e.target);
// }

// const handlePopupEscPress = (e) => {
//   if (e.key === 'Escape') {
//     const popup = document.querySelector('.popup.popup_opened');
//     closePopup(popup);
//   }
// }

function addCard(card) {
  cardContainer.addItem(card);
}

function createCard(data) {
  const card = new Card(data, cardTemplate, showImage);
  return card.createCard();

}

function handleProfileSubmit(e) {
  e.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileProf.textContent = inputProfileProf.value;
  popupProfile.close();
}

function handleCardSubmit(e) {
  e.preventDefault();
  const item = {
    name: inputCardName.value,
    link: inputCardImageLink.value
  };
  addCard( createCard(item) );
  e.target.reset();
  popupCard.close();
}

function openProfilePopup() {
  inputProfileName.value = profileName.textContent;
  inputProfileProf.value = profileProf.textContent;

  formProfileValidator.validate();

  popupProfile.open();
}

function initialize() {
  formProfileValidator.enableValidation();
  formCardValidator.enableValidation();
  initialCards.forEach(item => addCard( createCard(item) ));
}

/* events */
btnEditProfile.addEventListener('click', openProfilePopup);
// formProfile.addEventListener('submit', handleProfileSubmit);
// formCard.addEventListener('submit', handleCardSubmit);
btnCardAdd.addEventListener('click', () => {
  formCardValidator.validate();
  popupCard.open();
});

/* script */

initialize();

