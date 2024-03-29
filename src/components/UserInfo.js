export default class UserInfo {
  constructor(nameSelector, profSelector, avatarSelector) {
    this._nameElem = document.querySelector(nameSelector);
    this._profElem = document.querySelector(profSelector);
    this._avatarElem = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElem.textContent,
      about: this._profElem.textContent
    }
  }

  setUserInfo({name, about, avatar}) {
    this._nameElem.textContent = name;
    this._profElem.textContent = about;
    if (avatar !== undefined) {
      this.setAvatar(avatar);
    }
  }

  setAvatar(url) {
    this._avatarElem.src = url;
  }

  setUserId(id) {
    this._id = id;
  }

  getUserId() {
    return this._id;
  }

}
