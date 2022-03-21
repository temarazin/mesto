export default class UserInfo {
  constructor(nameSelector, profSelector) {
    this._nameElem = document.querySelector(nameSelector);
    this._profElem = document.querySelector(profSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElem.textContent,
      prof: this._profElem.textContent
    }
  }

  setUserInfo({name, prof}) {
    this._nameElem.textContent = name;
    this._profElem.textContent = prof;
  }
}
