export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._poupCloseButton = this._popup.querySelector('.popup__close');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscclick.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscclick.bind(this));
  }

  setEventListeners() {
    this._poupCloseButton.addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) this.close();
    });
  }

  _handleEscclick(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }
}
