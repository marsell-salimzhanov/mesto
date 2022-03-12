import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import './index.css';

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

const formElementEdit = document.forms.nameJob;
const formElementAdd = document.forms.addElement;

const userInfo = new UserInfo('.profile__title', '.profile__subtitle');

const formProfileValidator = new FormValidator(dataValidator, formElementEdit);
const formAddValidator = new FormValidator(dataValidator, formElementAdd);

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, '.elements');

const popupShowImage = new PopupWithImage('.popup_type_show-image');
const popupEdit = new PopupWithForm('.popup_type_edit',
  (data) => {
    const newName = data.name;
    const newJob = data.job;
    userInfo.setUserInfo(newName, newJob);
  });

const popupAdd = new PopupWithForm('.popup_type_add-element', (data) => {
  const cardObj = {
    name: data.elementName,
    link: data.elementUrl
  }
  const cardElement = createCard(cardObj);
  cardList.addItem(cardElement);
  formElementAdd.reset();
  formAddValidator.toggleButton();
});

function createCard(data) {
  const card = new Card(data, '.element-template', () => popupShowImage.open(data));
  return card.generate();
}

editButton.addEventListener('click', () => {
  formElementEdit.elements.name.value = userInfo.getUserInfo().name;
  formElementEdit.elements.job.value = userInfo.getUserInfo().job;
  popupEdit.open();
});

addButton.addEventListener('click', () => {
  popupAdd.open();
});

formProfileValidator.enableValidation();
formAddValidator.enableValidation();
popupShowImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
cardList.renderItems();
