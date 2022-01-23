function sbmitForm(evt) {
  evt.preventDefault();
}

function toggleButton(form, { submitButtonSelector, inactiveButtonClass }) {
  const button = form.querySelector(submitButtonSelector);
  const isFormValid = form.checkValidity();

  if (isFormValid) {
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute('disabled');
  } else {
    button.classList.add(inactiveButtonClass);
    button.setAttribute('disabled', '');
  }
}


function showError(input, errorSpan, { inputErrorClass, errorClass }) {
  input.classList.add(inputErrorClass);
  errorSpan.classList.add(errorClass);
  errorSpan.textContent = input.validationMessage;
}

function hideError(input, errorSpan, { inputErrorClass, errorClass }) {
  input.classList.remove(inputErrorClass);
  errorSpan.classList.remove(errorClass);
  errorSpan.textContent = 'Текст ошибки';
}

function validateInput(form, input, classes) {
  const spanId = input.getAttribute('name');
  const errorSpan = form.querySelector(`#${spanId}`);

  if (input.validity.valid) {
    hideError(input, errorSpan, classes);
  } else {
    showError(input, errorSpan, classes);
  }
  toggleButton(form, classes);
}

function enableValidation({ formSelector, inputSelector, ...rest }) {
  const forms = document.querySelectorAll(formSelector);

  forms.forEach(function (form) {
    form.addEventListener('submit', sbmitForm);

    const inputs = form.querySelectorAll(inputSelector);

    inputs.forEach(function (input) {
      input.addEventListener('input', function () {
        validateInput(form, input, rest);
      });
    });
    toggleButton(form, rest);
  });

}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});