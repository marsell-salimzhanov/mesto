import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageCaption = this._popup.querySelector('.popup__image-caption');
    this._image = this._popup.querySelector('.popup__image');
  }
  open({ name, link }) {
    super.open();
    this._imageCaption.textContent = name;
    this._image.alt = name;
    this._image.src = link;
  }
}