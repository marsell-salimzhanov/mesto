import { popupShowImage, openPopup } from './index.js';

export default class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  _getElement() {
    const element = document
      .querySelector(this._selector)
      .content
      .querySelector('.element')
      .cloneNode(true);
    return element;
  }


  generate() {
    this._element = this._getElement();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._toggleLike();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteElement();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._showImage();
    });
  }

  _toggleLike() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }

  _deleteElement() {
    this._element.querySelector('.element__delete').closest('.element').remove();
  }

  _showImage() {
    popupShowImage.querySelector('.popup__image').src = this._link;
    popupShowImage.querySelector('.popup__image').alt = this._name;
    popupShowImage.querySelector('.popup__image-caption').textContent = this._name;
    openPopup(popupShowImage);
  }
}

