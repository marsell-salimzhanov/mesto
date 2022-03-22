import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { dataValidator } from '../utils/constants.js'
import { api } from '../components/Api.js'
import './index.css';


let userId;

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarEditButton = document.querySelector('.profile__avatar-button');

const formElementEdit = document.forms.nameJob;
const formElementAdd = document.forms.addElement;
const formElementAvatar = document.forms.avatar;

const userInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__avatar');

const formProfileValidator = new FormValidator(dataValidator, formElementEdit);
const formAddValidator = new FormValidator(dataValidator, formElementAdd);
const formAvatarValidator = new FormValidator(dataValidator, formElementAvatar);

const cardList = new Section({
  items: [],
  renderer: (item) => {
    const cardElement = createCard(item);
    cardList.addItem(cardElement);
  }
}, '.elements');

const popupShowImage = new PopupWithImage('.popup_type_show-image');
const popupDeleteConfirm = new PopupWithForm('.popup_type_delete-confirm');
const popupEdit = new PopupWithForm('.popup_type_edit',
  (data) => {
    popupEdit.renameButtonSave(true);
    const newName = data.name;
    const newJob = data.job;
    api.editProfile(newName, newJob)
      .then(res => {
        userInfo.setUserInfo(res.name, res.about);
        popupEdit.close();
      })
      .catch(err => console.log(err))
      .finally(() => popupEdit.renameButtonSave(false));
  });

const popupAdd = new PopupWithForm('.popup_type_add-element', (data) => {
  popupAdd.renameButtonSave(true);
  api.addCard(data.elementName, data.elementUrl)
    .then(res => {
      const cardElement = createCard(res);
      cardList.addItem(cardElement);
      popupAdd.close();
      formAddValidator.toggleButton();
    })
    .catch(err => console.log(err))
    .finally(() => popupAdd.renameButtonSave(false));
});

const popupAvatar = new PopupWithForm('.popup_type_edit-avatar', (data) => {
  popupAvatar.renameButtonSave(true);
  api.editAvatar(data.avatarUrl)
    .then(res => {
      userInfo.setUserAvatar(res.avatar);
      formAvatarValidator.toggleButton();
      popupAvatar.close();
    })
    .catch(err => console.log(err))
    .finally(() => popupAvatar.renameButtonSave(false));
});

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData.name, userData.about);
    cards.forEach(data => {
      const card = createCard(data);
      cardList.addItem(card);
    })
  })
  .catch(err => {
    console.log(err);
  });

function createCard(data) {
  const card = new Card(
    data,
    '.element-template',
    () => popupShowImage.open(data),
    (id) => {
      popupDeleteConfirm.open();
      popupDeleteConfirm.changeSubmitHandler(() => {
        popupDeleteConfirm.renameButtonSave(true);
        api.deleteCard(id)
          .then(res => {
            card.deleteElement();
            popupDeleteConfirm.close();
          })
          .catch(err => console.log(err))
          .finally(() => popupDeleteConfirm.renameButtonSave(false));
      })
    },
    userId,
    (id) => {
      if (!card.userHasLike) {
        api.addLike(id)
          .then(res => {
            card.setLikes(res.likes);
            card.toggleLike();
            card.userHasLike = true;
          })
          .catch(err => console.log(err));

      }
      else {
        api.deleteLike(id)
          .then(res => {
            card.setLikes(res.likes);
            card.toggleLike();
            card.userHasLike = false;
          })
          .catch(err => console.log(err));
      }
    }
  );
  return card.generate();
}

editButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  formElementEdit.elements.name.value = name;
  formElementEdit.elements.job.value = job;
  formProfileValidator.toggleButton();
  formProfileValidator.resetError();
  popupEdit.open();
});

addButton.addEventListener('click', () => {
  formAddValidator.resetError();
  popupAdd.open();
});

avatarEditButton.addEventListener('click', () => {
  formAvatarValidator.resetError();
  formAvatarValidator.toggleButton();
  popupAvatar.open();
});

formProfileValidator.enableValidation();
formAddValidator.enableValidation();
formAvatarValidator.enableValidation();
popupShowImage.setEventListeners();
popupDeleteConfirm.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupAvatar.setEventListeners();
