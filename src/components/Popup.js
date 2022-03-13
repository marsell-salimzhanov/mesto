export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._poupCloseButton = this._popup.querySelector('.popup__close');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (event) => { this._handleEscclick(event) });
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (event) => { this._handleEscclick(event) });
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
