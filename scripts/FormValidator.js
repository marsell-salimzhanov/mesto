export default class FormValidator {
  constructor(data, form) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._form = form;
  }

  enableValidation() {

    this._form.addEventListener('submit', function (event) {
      event.preventDefault();
    });

    this._inputs = this._form.querySelectorAll(this._inputSelector);

    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._validateInput(input);

      }
      );

    });
    this._toggleButton();
  }

  _toggleButton() {
    const button = this._form.querySelector(this._submitButtonSelector);
    const isFormValid = this._form.checkValidity();

    if (isFormValid) {
      button.classList.remove(this._inactiveButtonClass);
      button.removeAttribute('disabled');
    } else {
      button.classList.add(this._inactiveButtonClass);
      button.setAttribute('disabled', '');
    }
  }

  _validateInput(input) {
    const spanId = input.getAttribute('name');
    const errorSpan = this._form.querySelector(`#${spanId}`);

    if (input.validity.valid) {
      this._hideError(input, errorSpan);
    } else {
      this._showError(input, errorSpan);
    }
    this._toggleButton();
  }

  _showError(input, errorSpan) {
    input.classList.add(this._inputErrorClass);
    errorSpan.classList.add(this._errorClass);
    errorSpan.textContent = input.validationMessage;
  }

  _hideError(input, errorSpan) {
    input.classList.remove(this._inputErrorClass);
    errorSpan.classList.remove(this._errorClass);
    errorSpan.textContent = 'Текст ошибки';
  }
}

