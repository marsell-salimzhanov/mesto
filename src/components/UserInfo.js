export default class UserInfo {
  constructor(selectorUserName, selectorUserJob, avatarSelector) {
    this._name = document.querySelector(selectorUserName);
    this._job = document.querySelector(selectorUserJob);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
      avatar: this._avatar.src
    };
  }

  setUserInfo(nameInput, jobInput) {
    this._name.textContent = nameInput;
    this._job.textContent = jobInput;

  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar
  }
}