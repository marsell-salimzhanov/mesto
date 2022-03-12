export default class UserInfo {
  constructor(selectorUserName, selectorUserJob) {
    this._name = document.querySelector(selectorUserName);
    this._job = document.querySelector(selectorUserJob);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    };
  }

  setUserInfo(nameInput, jobInput) {
    this._name.textContent = nameInput;
    this._job.textContent = jobInput;
  }
}