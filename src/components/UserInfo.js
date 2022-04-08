export default class UserInfo {
  constructor(nameSelector, profSelector, avatarSelector) {
    this._nameElem = document.querySelector(nameSelector);
    this._profElem = document.querySelector(profSelector);
    this._avatarElem = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElem.textContent,
      profession: this._profElem.textContent
    }
  }

  setUserInfo({name, profession}) {
    this._nameElem.textContent = name;
    this._profElem.textContent = profession;
  }

  setAvatar(url) {
    this._avatarElem.src = url;
  }
}
