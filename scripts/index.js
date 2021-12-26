const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_content_name');
let jobInput = formElement.querySelector('.popup__input_content_job');
let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');

function closePopup() {
  popup.classList.remove('popup_opened');
}

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  let newName = nameInput.value;
  let newJob = jobInput.value;
  nameProfile.textContent = newName;
  jobProfile.textContent = newJob;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
