export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__close-btn');
    this._boundHandleButtonClosePopup = this._handleButtonClosePopup.bind(this);
    this._boundHandlePopupClick = this._handlePopupClick.bind(this);
    this._boundHandlePopupEscPress = this._handlePopupEscPress.bind(this);
  }

  _handleButtonClosePopup() {
    this.close();
  }

  _handlePopupClick(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  _handlePopupEscPress(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', this._boundHandleButtonClosePopup);
    this._popup.addEventListener('click', this._boundHandlePopupClick);
  }

  open() {
    document.addEventListener('keydown', this._boundHandlePopupEscPress);
    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener('keydown', this._boundHandlePopupEscPress);
    this._popup.classList.remove('popup_opened');
  }
}
