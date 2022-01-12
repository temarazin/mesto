/* popups */
let popupProfile = document.querySelector('.popup_el_profile');

/* forms */
let formProfile = document.querySelector('.form-profile');

/* controls */
let btnEditProfile = document.querySelector('.profile__edit-button');
let btnCloseProfile = document.querySelector('.popup__close-btn');
let inputProfileName = document.querySelector('.form-profile__input_el_name');
let inputProfileProf = document.querySelector('.form-profile__input_el_profession');

/* elements */
let profileName = document.querySelector('.profile__name');
let profileProf = document.querySelector('.profile__profession');

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

/* events */
btnEditProfile.addEventListener('click', openPopupProfile);
btnCloseProfile.addEventListener('click', closePopupProfile);
formProfile.addEventListener('submit', formProfileSubmit);
