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

let formElementEdit = popupEdit.querySelector('.popup__form');
let formElementAdd = popupAdd.querySelector('.popup__form');

let nameInput = formElementEdit.querySelector('.popup__input_content_name');
let jobInput = formElementEdit.querySelector('.popup__input_content_job');

let elementNameInput = formElementAdd.querySelector('.popup__input_content_element-name');
let elementUrlInput = formElementAdd.querySelector('.popup__input_content_element-url');

let nameProfile = document.querySelector('.profile__title');
let jobProfile = document.querySelector('.profile__subtitle');

const elementTemplate = document.querySelector('.element-template').content;
const elements = document.querySelector('.elements');

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

function formSubmitHandlerEdit(evt) {
  evt.preventDefault();
  let newName = nameInput.value;
  let newJob = jobInput.value;
  nameProfile.textContent = newName;
  jobProfile.textContent = newJob;
  closePopup(popupEdit);
}

function formSubmitHandlerAdd(evt) {
  evt.preventDefault();
  let card = {
    name: elementNameInput.value,
    link: elementUrlInput.value
  }
  createCard(card);
  closePopup(popupAdd);
  formElementAdd.reset();
}

function createCard(el) {
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementTitle = element.querySelector('.element__title');
  const elementLike = element.querySelector('.element__like');
  const elementDelete = element.querySelector('.element__delete');
  elementTitle.textContent = el.name;
  elementImage.setAttribute('src', el.link);
  elementImage.setAttribute('alt', el.name);
  elementLike.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  elementDelete.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove();
  });
  elementImage.addEventListener('click', showImage);
  elements.prepend(element);
}

function showImage(img) {
  popupShowImage.classList.add('popup_opened');
  let image = popupShowImage.querySelector('.popup__image');
  let caption = popupShowImage.querySelector('.popup__image-caption');
  image.setAttribute('src', img.target.getAttribute('src'));
  image.setAttribute('alt', img.target.getAttribute('alt'));
  caption.textContent = img.target.getAttribute('alt');
}

formElementEdit.addEventListener('submit', formSubmitHandlerEdit);
formElementAdd.addEventListener('submit', formSubmitHandlerAdd);
editButton.addEventListener('click', openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
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