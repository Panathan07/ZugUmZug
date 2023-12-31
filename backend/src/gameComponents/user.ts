export default class User {
  private _username: string = "";
  get username(): string {
    return this._username;
  }
  set username(value: string) {
    this._username = value;
  }
  private _userID: string = "";
  get userID(): string {
    return this._userID;
  }
  set userID(value: string) {
    this._userID = value;
  }
  constructor(username: string, userID: string) {
    this.username = username;
    this.userID = userID;
  }
}
