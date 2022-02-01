/* templates */
const cardTemplate = document.querySelector('#card').content;

/* popups */
const popupProfile = document.querySelector('.popup_name_profile');
const popupCard = document.querySelector('.popup_name_card');
const popupImage = document.querySelector('.popup_name_image');

/* forms */
const formProfile = document.forms['form-profile'];
const formCard = document.forms['form-card'];

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

function setPopupListeners() {
  const buttonsClosePopup = document.querySelectorAll('.popup__close-btn');
  buttonsClosePopup.forEach(function (item) {
    item.addEventListener('click', e => closePopup(e.target.closest('.popup')))
  });

  const popups = document.querySelectorAll('.popup');
  popups.forEach( item => {
    item.addEventListener('click', e => {
      if (e.target === e.currentTarget)
        closePopup(e.target);
    });
  });
}

function createCard(data) {
  const card = cardTemplate.querySelector('.photo-grid__item').cloneNode(true);
  const image = card.querySelector('.photo-grid__image');
  const name = card.querySelector('.photo-grid__item-name');

  const btnLike = card.querySelector('.photo-grid__like-button');
  const btnRemove = card.querySelector('.photo-grid__remove-button');
  const imageContainer = card.querySelector('.photo__image-link');

  image.src = data.link;
  image.alt = data.name;
  name.textContent = data.name;

  btnLike.addEventListener('click', likeCard);
  btnRemove.addEventListener('click', removeCard);
  imageContainer.addEventListener('click', showImage);

  return card;
}

function addCard(data) {
  const card = createCard(data);
  cardContainer.prepend(card);
}

function removeCard(e) {
  e.stopPropagation();
  e.target.closest('.photo-grid__item').remove();
}

function likeCard(e) {
  e.target.classList.toggle('photo-grid__like-button_active');
}

function showImage(e) {
  const cardImage = e.currentTarget.querySelector('.photo-grid__image');
  const card = e.target.closest('.photo-grid__item');
  const image = popupImage.querySelector('.image__img');
  image.src = cardImage.src;
  image.alt = cardImage.alt;
  const label = popupImage.querySelector('.image__label');
  label.textContent = card.querySelector('.photo-grid__item-name').textContent;
  openPopup(popupImage);
}

function handleProfileSubmit(e) {
  e.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileProf.textContent = inputProfileProf.value;
  closePopup(popupProfile);
}

function handleCardSubmit(e) {
  e.preventDefault();
  const item = {
    name: inputCardName.value,
    link: inputCardImageLink.value
  };
  addCard(item);
  e.target.reset();
  closePopup(popupCard);
}

function openProfilePopup() {
  inputProfileName.value = profileName.textContent;
  inputProfileProf.value = profileProf.textContent;
  openPopup(popupProfile);
}

function initialize() {
  setPopupListeners();
  enableValidation();
  initialCards.forEach(item => addCard(item));
}

/* events */
btnEditProfile.addEventListener('click', openProfilePopup);
formProfile.addEventListener('submit', handleProfileSubmit);
formCard.addEventListener('submit', handleCardSubmit);
btnCardAdd.addEventListener('click', () => openPopup(popupCard));

/* script */

initialize();

