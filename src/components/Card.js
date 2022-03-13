export default class Card {
  constructor(data, selector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selector = selector;
    this._element = this._getElement();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementLike = this._element.querySelector('.element__like');
    this._elementDelete = this._element.querySelector('.element__delete');
    this.handleCardClick = handleCardClick;
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
      this.handleCardClick();
    });
  }

  _toggleLike() {
    this._elementLike.classList.toggle('element__like_active');
  }

  _deleteElement() {
    this._element.remove();
  }
}