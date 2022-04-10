import './index.css';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';

import {
  validatorSettings,
  cardTemplate,
  formProfile,
  formCard,
  btnEditProfile,
  btnCardAdd,
  inputProfileName,
  inputProfileProf,
  formConfirm,
  inputConfirmCardId
} from '../scripts/constants.js';


/* api */
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'e79dac4b-6678-4815-b1a3-a3fbe1b15df7',
    'Content-Type': 'application/json'
  }
});

/* validators */
const formProfileValidator = new FormValidator(validatorSettings, formProfile);
const formCardValidator = new FormValidator(validatorSettings, formCard);

/* popups */
const popupProfile = new PopupWithForm('.popup_name_profile', handleProfileSubmit);
popupProfile.setEventListeners();
const popupCard = new PopupWithForm('.popup_name_card', handleCardSubmit);
popupCard.setEventListeners();
const popupImage = new PopupWithImage('.popup_name_image');
popupImage.setEventListeners();
const popupConfirm = new PopupWithConfirmation('.popup_name_confirm', handleRemoveCardSubmit);
popupConfirm.setEventListeners();

/* others */
const userElem = new UserInfo('.profile__name', '.profile__profession', '.profile__avatar');
const cardContainer = new Section(
  {
    items: [],
    renderer: (data) => {
      return createCard(data);
    }
  },
  '.photo-grid'
);

/* functions */
function showImage(data) {
  popupImage.open(data);
}

function addCard(card) {
  cardContainer.addItem(card);
}

function createCard(data) {
  const card = new Card(data, cardTemplate, {
    handleCardClick: showImage,
    handleTrashClick: confirmRemove
  } );
  return card.createCard();
}

function handleProfileSubmit(data) {
  console.log(data);
  api.setPersonalData(data)
    .then( resData => {
      userElem.setUserInfo(resData);
      popupProfile.close();
    })
    .catch( (error) => {
      console.log(error);
    });

}

function handleCardSubmit(data) {
  console.log(data);
  api.addNewCard(data)
    .then( cardData => {
      addCard( createCard(cardData) );
      popupCard.close();
    })
    .catch( (error) => {
      console.log(error);
    });
}

function confirmRemove(card) {
  popupConfirm.open(card);
}

function handleRemoveCardSubmit(card) {
  api.removeCard(card._id)
    .then( () => {
      card.removeCard();
    })
    .catch( (error) => {
      console.log(error);
    });

}

function openProfilePopup() {
  const userInfo = userElem.getUserInfo();
  inputProfileName.value = userInfo.name;
  inputProfileProf.value = userInfo.about;

  formProfileValidator.validate();

  popupProfile.open();
}

function initialize() {
  api.getPersonalData()
    .then( userData => {
      console.log(userData);
      userElem.setUserInfo({name: userData.name, about: userData.about});
      userElem.setAvatar(userData.avatar);
      userElem.setUserId(userData._id);
    })
    .catch( (error) => {
      console.log(error);
    });

  api.getCards()
    .then( cards => {
      console.log(cards);
      cards.forEach(item => {
        item.isOwner = userElem.getUserId() === item.owner._id;
      });
      console.log(cards);
      cardContainer.rewriteItems(cards);
      cardContainer.render();
    })
    .catch( (error) => {
      console.log(error);
    });

  formProfileValidator.enableValidation();
  formCardValidator.enableValidation();

}


/* events */
btnEditProfile.addEventListener('click', openProfilePopup);
btnCardAdd.addEventListener('click', () => {
  formCardValidator.validate();
  popupCard.open();
});

/* script */

initialize();

