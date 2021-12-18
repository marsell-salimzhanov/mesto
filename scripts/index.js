const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');

function togglePopup() {
  let name = document.querySelector('.profile__title').innerHTML;
  let job = document.querySelector('.profile__subtitle').innerHTML;
  let nameInput = popup.querySelector('.popup__name');
  let jobInput = popup.querySelector('.popup__job');
  popup.classList.toggle('popup_opened');
  nameInput.value = name;
  jobInput.value = job;
}

let formElement = popup.querySelector('.popup__container');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');


function formSubmitHandler(evt) {
  evt.preventDefault();
  let newName = nameInput.value;
  let newJob = jobInput.value;
  let name = document.querySelector('.profile__title');
  let job = document.querySelector('.profile__subtitle');
  name.textContent = newName;
  job.textContent = newJob;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', formSubmitHandler);
popupOpenButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);