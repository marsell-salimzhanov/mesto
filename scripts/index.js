import Card from './Card.js';
import FormValidator from './FormValidator.js'

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const dataValidator = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add-element');
const popupShowImage = document.querySelector('.popup_type_show-image');

const popupCloseEditButton = popupEdit.querySelector('.popup__close');
const popupCloseAddButton = popupAdd.querySelector('.popup__close');
const popupCloseImageShowButton = popupShowImage.querySelector('.popup__close');

const formElementEdit = document.forms.nameJob;
const formElementAdd = document.forms.addElement;

const nameInput = formElementEdit.elements.name;
const jobInput = formElementEdit.elements.job;

const elementNameInput = formElementAdd.elements.elementName;
const elementUrlInput = formElementAdd.elements.elementUrl;

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');



function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscape);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscape);
}

function closePopupEscape(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) closePopup(openedPopup);
  }
}

function openPopupEdit() {
  openPopup(popupEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function hanldeProfileFormSubmit(event) {
  event.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;
  nameProfile.textContent = newName;
  jobProfile.textContent = newJob;
  closePopup(popupEdit);
}


function hanldeCardFormSubmit(event) {
  event.preventDefault();
  const cardObj = {
    name: elementNameInput.value,
    link: elementUrlInput.value
  }
  const card = new Card(cardObj, '.element-template');
  const cardElement = card.generate();
  elements.prepend(cardElement);
  closePopup(popupAdd);
  formElementAdd.reset();
  formElementAdd.querySelector('.popup__save').classList.add(dataValidator.inactiveButtonClass);
  formElementAdd.querySelector('.popup__save').setAttribute('disabled', '');
}

function closePopupOverlayClick(event) {
  if (event.target === event.currentTarget) closePopup(event.target);
}

formElementEdit.addEventListener('submit', hanldeProfileFormSubmit);
formElementAdd.addEventListener('submit', hanldeCardFormSubmit);
editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', function () {
  openPopup(popupAdd);
});
popupCloseEditButton.addEventListener('click', function () {
  closePopup(popupEdit);
});
popupCloseAddButton.addEventListener('click', function () {
  closePopup(popupAdd);
});
popupCloseImageShowButton.addEventListener('click', function () {
  closePopup(popupShowImage);
});
popupEdit.addEventListener('click', closePopupOverlayClick);
popupAdd.addEventListener('click', closePopupOverlayClick);
popupShowImage.addEventListener('click', closePopupOverlayClick);
initialCards.forEach((item) => {
  const card = new Card(item, '.element-template');
  const cardElement = card.generate();
  elements.prepend(cardElement);
});

const formElementEditValidte = new FormValidator(dataValidator, formElementEdit);
formElementEditValidte.enableValidation();
const formElementAddValidte = new FormValidator(dataValidator, formElementAdd);
formElementAddValidte.enableValidation();
export { popupShowImage, openPopup }; 