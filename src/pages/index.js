import './index.css';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import { initialCards } from '../scripts/initialСards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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
const popupProfile = new PopupWithForm('.popup_name_profile', handleProfileSubmit);
const popupCard = new PopupWithForm('.popup_name_card', handleCardSubmit);
const popupImage = new PopupWithImage('.popup_name_image');

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

/* others */
const userElem = new UserInfo('.profile__name', '.profile__profession');
const cardContainer = new Section({items: initialCards, renderer: addCard}, '.photo-grid');

/* functions */
function showImage(data) {
    popupImage.open(data);
  }

function addCard(card) {
  cardContainer.addItem(card);
}

function createCard(data) {
  const card = new Card(data, cardTemplate, showImage);
  return card.createCard();
}

function handleProfileSubmit(e, data) {
  e.preventDefault();
  userElem.setUserInfo(data);
  popupProfile.close();
}

function handleCardSubmit(e, data) {
  e.preventDefault();
  addCard( createCard(data) );
  popupCard.close();
}

function openProfilePopup() {
  const userInfo = userElem.getUserInfo();
  inputProfileName.value = userInfo.name;
  inputProfileProf.value = userInfo.profession;

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
btnCardAdd.addEventListener('click', () => {
  formCardValidator.validate();
  popupCard.open();
});

/* script */

initialize();

