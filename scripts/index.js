/* templates */
const cardTemplate = document.querySelector('#card').content;

/* popups */
const popupProfile = document.querySelector('.popup_name_profile');
const popupCard = document.querySelector('.popup_name_card');
const popupImage = document.querySelector('.popup_name_image');
// следующие 2 строки вообще адекватные?
popupImage.elImage = popupImage.querySelector('.image__img');
popupImage.elLabel = popupImage.querySelector('.image__label');

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
function setPopupListeners(popup) {
  const buttonClosePopup = popup.querySelector('.popup__close-btn');

  buttonClosePopup.addEventListener('click', handleButtonClosePopup);
  popup.addEventListener('click', handlePopupClick);
  document.addEventListener('keydown', handlePopupEscPress);
}

function removePopupListeners(popup) {
  const buttonClosePopup = popup.querySelector('.popup__close-btn');

  buttonClosePopup.removeEventListener('click', handleButtonClosePopup);
  popup.removeEventListener('click', handlePopupClick);
  document.removeEventListener('keydown', handlePopupEscPress);
}

function openPopup(popup) {
  setPopupListeners(popup);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  removePopupListeners(popup);
  popup.classList.remove('popup_opened');
}

const handleButtonClosePopup = (e) => {
  const popup = e.currentTarget.closest('.popup');
  closePopup(popup);
}

const handlePopupClick = (e) => {
  if (e.target === e.currentTarget)
    closePopup(e.target);
}

const handlePopupEscPress = (e) => {
  if (e.key === 'Escape') {
    const popup = document.querySelector('.popup.popup_opened');
    closePopup(popup);
  }
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
  popupImage.elImage.src = cardImage.src;
  popupImage.elImage.alt = cardImage.alt;
  popupImage.elLabel.textContent = card.querySelector('.photo-grid__item-name').textContent;
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

  validate(inputProfileName);
  validate(inputProfileProf);

  openPopup(popupProfile);
}

function initialize() {
  enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error-msg_active'
  });
  initialCards.forEach(item => addCard(item));
}

/* events */
btnEditProfile.addEventListener('click', openProfilePopup);
formProfile.addEventListener('submit', handleProfileSubmit);
formCard.addEventListener('submit', handleCardSubmit);
btnCardAdd.addEventListener('click', () => {
  validateForm(popupCard);
  openPopup(popupCard);
});

/* script */

initialize();

