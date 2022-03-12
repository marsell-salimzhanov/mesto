import Popup from './Popup.js';

export default class PopupWithImage extends Popup {

  open({ name, link }) {
    super.open();
    this._popup.querySelector('.popup__image-caption').textContent = name;
    this._popup.querySelector('.popup__image').alt = name;
    this._popup.querySelector('.popup__image').src = link;
  }
}