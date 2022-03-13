export default class FormValidator {
  constructor(data, form) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._form = form;
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._inputs = this._form.querySelectorAll(this._inputSelector);
  }

  enableValidation() {
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._validateInput(input);
      }
      );

    });
    this.toggleButton();
  }

  toggleButton() {
    const isFormValid = this._form.checkValidity();

    if (isFormValid) {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    } else {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', '');
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
    this.toggleButton();
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

  resetError() {
    this._inputs.forEach((input) => {
      const spanId = input.getAttribute('name');
      const errorSpan = this._form.querySelector(`#${spanId}`);
      this._hideError(input, errorSpan);
    });
  }
}

