import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callBackFormSubmit) {
    super(popupSelector);
    this._callBackFormSubmit = callBackFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._popupInputs = this._form.querySelectorAll('[type="text"]');
  }

  _getInputValues() {
    this._popupInputValues = {};
    this._popupInputs.forEach(item => this._popupInputValues[item.name] = item.value);
    return this._popupInputValues;

  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log(this._popupInputValues);
      this._callBackFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}