/* templates */
const cardTemplate = document.querySelector('#card').content;

/* popups */
const popupProfile = document.querySelector('.popup_name_profile');
const popupCard = document.querySelector('.popup_name_card');
const popupImage = document.querySelector('.popup_name_image');

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

function addCard(data) {
  const card = cardTemplate.cloneNode(true);
  const image = card.querySelector('.photo-grid__image');
  const name = card.querySelector('.photo-grid__item-name');

  image.src = data.link;
  name.textContent = data.name;

  cardContainer.prepend(card);
}

function removeCard(card) {
  card.remove();
}

function formProfileSubmit(e) {
  e.preventDefault();
  profileName.textContent = inputProfileName.value;
  profileProf.textContent = inputProfileProf.value;
  closePopup(popupProfile);
}

function formCardSubmit(e) {
  e.preventDefault();
  const item = {};
  item.name = inputCardName.value;
  item.link = inputCardImageLink.value;
  addCard(item);
  inputCardName.value = '';
  inputCardImageLink.value = '';
  closePopup(popupCard);
}

function openProfilePopup() {
  inputProfileName.value = profileName.textContent;
  inputProfileProf.value = profileProf.textContent;
  openPopup(popupProfile);
}

/* events */
btnEditProfile.addEventListener('click', openProfilePopup);
formProfile.addEventListener('submit', formProfileSubmit);
formCard.addEventListener('submit', formCardSubmit);
btnCardAdd.addEventListener('click', () => openPopup(popupCard));


document.addEventListener('click', function (e) {
  const classList = e.target.classList;
  if (classList.contains('popup__close-btn'))
    closePopup(e.target.closest('.popup'));
});

cardContainer.addEventListener('click', function (e) {
  const classList = e.target.classList;
  const target = e.target;

  if (classList.contains('photo-grid__remove-button')) {
    e.stopPropagation();
    removeCard(target.closest('.photo-grid__item'));
    return;
  }

  if (classList.contains('photo-grid__like-button')) {
    target.classList.toggle('photo-grid__like-button_active');
    return;
  }

  if (classList.contains('photo-grid__image')) {
    e.stopPropagation();
    const card = target.closest('.photo-grid__item');
    const image = popupImage.querySelector('.image__img');
    image.src = target.src;
    const label = popupImage.querySelector('.image__label');
    label.textContent = card.querySelector('.photo-grid__item-name').textContent;
    openPopup(popupImage);
    return;
  }
});

initialCards.forEach(item => addCard(item));
