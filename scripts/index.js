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

/* templates */
const cardTemplate = document.querySelector('#card').content;

/* popups */
const popupProfile = document.querySelector('.popup_name_profile');
const popupCard = document.querySelector('.popup_name_card');

/* forms */
const formProfile = document.querySelector('.form[name="form-profile"]');
const formCard = document.querySelector('.form[name="form-card"]');

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
const cardContainer = document.querySelector('.photo-grid');

/* functions */
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function formProfileSubmit(e) {
  e.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileProf.textContent = inputProfileProf.value;
  closePopup(popupProfile);
}

function formCardSubmit(e) {
  e.preventDefault();
  let item = {};
  item.name = inputCardName.value;
  item.link = inputCardImageLink.value;
  addCard(item);
  inputCardName.value = '';
  inputCardImageLink.value = '';
  closePopup(popupCard);
}

function addCard(data) {
  let card = cardTemplate.cloneNode(true);
  let image = card.querySelector('.photo-grid__image');
  let name = card.querySelector('.photo-grid__item-name');

  image.src = data.link;
  name.textContent = data.name;

  cardContainer.prepend(card);
}

/* events */
btnEditProfile.addEventListener('click', () => {
  inputProfileName.value = profileName.textContent;
  inputProfileProf.value = profileProf.textContent;
  openPopup(popupProfile);
});

formProfile.addEventListener('submit', formProfileSubmit);
formCard.addEventListener('submit', formCardSubmit);

btnCardAdd.addEventListener('click', () => openPopup(popupCard));

document.addEventListener('click', function(e) {
  let classList = e.target.classList;
  if (classList.contains('popup__close-btn'))
    closePopup(e.target.closest('.popup'));
});


initialCards.forEach( item => addCard(item) );
