const initialCards = [
  {
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

/* Templates */
const cardTemplate = document.querySelector('#card').content;

/* popups */
let popupProfile = document.querySelector('.popup');

/* forms */
let formProfile = document.querySelector('.form-profile');

/* controls */
let btnEditProfile = document.querySelector('.profile__edit-button');
let btnCloseProfile = document.querySelector('.popup__close-btn');
let inputProfileName = document.querySelector('.form-profile__input[name="name"]');
let inputProfileProf = document.querySelector('.form-profile__input[name="profession"]');

/* elements */
let profileName = document.querySelector('.profile__name');
let profileProf = document.querySelector('.profile__profession');
const cardContainer = document.querySelector('.photo-grid');

/* functions */
function openPopupProfile() {
  inputProfileName.value = profileName.textContent;
  inputProfileProf.value = profileProf.textContent;
  popupProfile.classList.add('popup_opened');
}

function closePopupProfile() {
  popupProfile.classList.remove('popup_opened');
}

function formProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileProf.textContent = inputProfileProf.value;
  closePopupProfile();
}

function addCard(data) {
  let card = cardTemplate.cloneNode(true);
  let image = card.querySelector('.photo-grid__image');
  let name = card.querySelector('.photo-grid__item-name');

  image.src = data.link;
  name.textContent = data.name;

  cardContainer.append(card);
}

/* events */
btnEditProfile.addEventListener('click', openPopupProfile);
btnCloseProfile.addEventListener('click', closePopupProfile);
formProfile.addEventListener('submit', formProfileSubmit);


initialCards.forEach( item => addCard(item) );
