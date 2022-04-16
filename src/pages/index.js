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
  formAvatar,
  btnEditProfile,
  btnCardAdd,
  inputProfileName,
  inputProfileProf,
  avatarImage,
  avatarBtn
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
const formAvatarValidator = new FormValidator(validatorSettings, formAvatar);

/* popups */
const popupProfile = new PopupWithForm('.popup_name_profile', handleProfileSubmit);
popupProfile.setEventListeners();
const popupCard = new PopupWithForm('.popup_name_card', handleCardSubmit);
popupCard.setEventListeners();
const popupImage = new PopupWithImage('.popup_name_image');
popupImage.setEventListeners();
const popupConfirm = new PopupWithConfirmation('.popup_name_confirm', handleRemoveCardSubmit);
popupConfirm.setEventListeners();
const popupAvatar = new PopupWithForm('.popup_name_avatar', handleAvatarSubmit);
popupAvatar.setEventListeners();

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
    handleTrashClick: confirmRemove,
    handleLikeClick: handleLikeBtn
  } );
  return card.createCard();
}

function handleProfileSubmit(data, btnSubmit) {
  const btnText = btnSubmit.textContent;
  btnSubmit.textContent = `${btnText}...`;
  api.setPersonalData(data)
    .then( resData => {
      userElem.setUserInfo(resData);
      popupProfile.close();
    })
    .catch( (error) => {
      console.log(error);
    })
    .finally( () => {
      btnSubmit.textContent = `${btnText}`;
    });

}

function handleAvatarSubmit(data, btnSubmit) {
  const btnText = btnSubmit.textContent;
  btnSubmit.textContent = `${btnText}...`;
  api.updateAvatar(data.avatar)
    .then( res => {
      avatarImage.src = res.avatar;
      popupAvatar.close();
    })
    .catch( (error) => {
      console.log(error);
    })
    .finally( () => {
      btnSubmit.textContent = `${btnText}`;
    });
}

function handleCardSubmit(data, btnSubmit) {
  const btnText = btnSubmit.textContent;
  btnSubmit.textContent = `${btnText}...`;
  api.addNewCard(data)
    .then( cardData => {
      cardData.isOwner = true;
      addCard( createCard(cardData) );
      popupCard.close();
    })
    .catch( (error) => {
      console.log(error);
    })
    .finally( () => {
      btnSubmit.textContent = `${btnText}`;
    });
}

function confirmRemove(card) {
  popupConfirm.open(card);
}

function handleRemoveCardSubmit(card, btnSubmit) {
  const btnText = btnSubmit.textContent;
  btnSubmit.textContent = `${btnText}...`;
  api.removeCard(card._id)
    .then( () => {
      card.removeCard();
      popupConfirm.close();
    })
    .catch( (error) => {
      console.log(error);
    })
    .finally( () => {
      btnSubmit.textContent = `${btnText}`;
    });
}

function handleLikeBtn(card, isNewLike) {
  api.likeCard(card, isNewLike)
  .then( (result) => {
    card._likeCounterElement.textContent = result.likes.length;
    card._btnLike.classList.toggle('photo-grid__like-button_active');
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

function openAvatarPopup() {
  formAvatarValidator.validate();
  popupAvatar.open();
}

function initialize() {

  Promise.all([api.getPersonalData(), api.getCards()])
    .then( ([userData, cards]) => {
      userElem.setUserInfo(userData);
      userElem.setUserId(userData._id);

      cards.forEach(item => {
        item.isOwner = userElem.getUserId() === item.owner._id;
        const isLiked = item.likes.some(likeOwner => {
          return likeOwner._id === userElem.getUserId();
        });
        item.isLiked = isLiked;
      });

      cardContainer.rewriteItems(cards);
      cardContainer.render();
    })
    .catch( (error) => {
      console.log(error);
    });

  formProfileValidator.enableValidation();
  formCardValidator.enableValidation();
  formAvatarValidator.enableValidation();

}


/* events */
btnEditProfile.addEventListener('click', openProfilePopup);
btnCardAdd.addEventListener('click', () => {
  formCardValidator.validate();
  popupCard.open();
});
avatarBtn.addEventListener('click', openAvatarPopup);


/* script */

initialize();

