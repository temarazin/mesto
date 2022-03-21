export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  render() {
    this._items.forEach( item => {
      const elem = this._renderer(item);
      this.addItem(elem);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
