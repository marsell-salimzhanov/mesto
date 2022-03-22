import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callBackFormSubmit) {
    super(popupSelector);
    this._callBackFormSubmit = callBackFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._popupInputs = this._form.querySelectorAll('.popup__input');
    this._saveButton = this._form.querySelector('.popup__save');
    this._saveButtonValue = this._saveButton.textContent;
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
      this._callBackFormSubmit(this._getInputValues());

    });
  }

  changeSubmitHandler(newSubmitHandler) {
    this._callBackFormSubmit = newSubmitHandler;
  }

  close() {
    super.close();
    this._form.reset();
  }

  renameButtonSave(flag) {
    if (flag) this._saveButton.textContent = "Сохранение..."
    else this._saveButton.textContent = this._saveButtonValue
  }
}