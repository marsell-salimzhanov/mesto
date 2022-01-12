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

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add-element');
const popupShowImage = document.querySelector('.popup_type_show-image');

const popupCloseEditButton = popupEdit.querySelector('.popup__close');
const popupCloseAddButton = popupAdd.querySelector('.popup__close');
const popupCloseImageShowButton = popupShowImage.querySelector('.popup__close');

const formElementEdit = popupEdit.querySelector('.popup__form');
const formElementAdd = popupAdd.querySelector('.popup__form');

const nameInput = formElementEdit.querySelector('.popup__input_content_name');
const jobInput = formElementEdit.querySelector('.popup__input_content_job');

const elementNameInput = formElementAdd.querySelector('.popup__input_content_element-name');
const elementUrlInput = formElementAdd.querySelector('.popup__input_content_element-url');

const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__subtitle');

const elementTemplate = document.querySelector('.element-template').content;
const elements = document.querySelector('.elements');

const image = popupShowImage.querySelector('.popup__image');
const caption = popupShowImage.querySelector('.popup__image-caption');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function openPopupEdit() {
  openPopup(popupEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function hanldeProfileFormSubmit(evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;
  nameProfile.textContent = newName;
  jobProfile.textContent = newJob;
  closePopup(popupEdit);
}

function hanldeCardFormSubmit(evt) {
  evt.preventDefault();
  let card = {
    name: elementNameInput.value,
    link: elementUrlInput.value
  }
  createCard(card);
  closePopup(popupAdd);
  formElementAdd.reset();
}

function createCard(item) {
  const element = getCard(item);
  elements.prepend(element);
}

function getCard(el) {
  let element = elementTemplate.cloneNode(true);
  let elementImage = element.querySelector('.element__image');
  let elementTitle = element.querySelector('.element__title');
  let elementLike = element.querySelector('.element__like');
  let elementDelete = element.querySelector('.element__delete');
  elementTitle.textContent = el.name;
  elementImage.setAttribute('src', el.link);
  elementImage.setAttribute('alt', el.name);
  elementLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  elementDelete.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  elementImage.addEventListener('click', function (evt) {
    let el = {
      name: evt.target.getAttribute('alt'),
      link: evt.target.getAttribute('src')
    };
    showImage(el);
  });
  return element;
}

function showImage(img) {
  openPopup(popupShowImage);
  image.setAttribute('src', img.link);
  image.setAttribute('alt', img.name);
  caption.textContent = img.name;
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
initialCards.forEach(createCard);