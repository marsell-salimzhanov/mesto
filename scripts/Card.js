import { openPopup } from './index.js';

export default class Card {
  constructor(data, selector, popUpSelector) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._popUp = document.querySelector(popUpSelector);
    this._popUpImage = this._popUp.querySelector('.popup__image');
    this._popUpCaption = this._popUp.querySelector('.popup__image-caption');
    this._element = this._getElement();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementLike = this._element.querySelector('.element__like');
    this._elementDelete = this._element.querySelector('.element__delete');
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
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._toggleLike();
    });

    this._elementDelete.addEventListener('click', () => {
      this._deleteElement();
    });

    this._elementImage.addEventListener('click', () => {
      this._showImage();
    });
  }

  _toggleLike() {
    this._elementLike.classList.toggle('element__like_active');
  }

  _deleteElement() {
    this._elementDelete.closest('.element').remove();
  }

  _showImage() {
    this._popUpImage.src = this._link;
    this._popUpImage.alt = this._name;
    this._popUpCaption.textContent = this._name;
    openPopup(this._popUp);
  }
}

