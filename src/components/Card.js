export default class Card {
  constructor(data, selector, handleCardClick, handleDeleteClick, userId, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._selector = selector;
    this._element = this._getElement();
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._elementLike = this._element.querySelector('.element__like');
    this._elementLikeCount = this._element.querySelector('.element__like-count');
    this._elementDelete = this._element.querySelector('.element__delete');
    this._likes = data.likes;
    this._id = data._id;
    this._owner = data.owner._id;
    this.handleCardClick = handleCardClick;
    this.handleDeleteClick = handleDeleteClick;
    this.handleLikeClick = handleLikeClick;
    this._userId = userId;
    this.userHasLike = this._likes.find(user => user._id === this._userId)
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
    this.setLikes(this._likes);
    if (this._userId != this._owner) this._elementDelete.style.display = 'none'
    if (this.userHasLike) this._toggleLike();
    return this._element;
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this.handleLikeClick(this._id);
      this._toggleLike();
    });

    this._elementDelete.addEventListener('click', () => this.handleDeleteClick(this._id));

    this._elementImage.addEventListener('click', () => {
      this.handleCardClick();
    });
  }

  _toggleLike() {
    this._elementLike.classList.toggle('element__like_active');
  }

  deleteElement() {
    this._element.remove();
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._elementLikeCount.textContent = this._likes.length;
  }
}