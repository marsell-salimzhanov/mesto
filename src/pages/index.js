import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards, dataValidator } from '../utils/constants.js'
import './index.css';

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
  formProfileValidator.toggleButton();
  formProfileValidator.resetError();
  popupEdit.open();
});

addButton.addEventListener('click', () => {
  formAddValidator.resetError();
  popupAdd.open();
});

formProfileValidator.enableValidation();
formAddValidator.enableValidation();
popupShowImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
cardList.renderItems();
