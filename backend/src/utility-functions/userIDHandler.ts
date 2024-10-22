import crypto from "crypto";
import User, { UserProps } from "#game-components/User";
import Team from "#game-components/Team";
import { IStorage, UserStorage } from "#customTypes/Storage";
import { UserSchema } from "#customTypes/StorageSchema";

function addUser(user: User, userStorage: UserStorage) {
  if (userStorage.itemExists(user)) return;
  userStorage.insert(user);
}

function createNewUserID(userStorage: UserStorage) {
  let id = "";
  while (true) {
    id = crypto.randomBytes(16).toString("hex");
    if (!userStorage.itemWithPropExists(UserProps.ID, id)) break;
  }
  return id;
}

export function handleUserID(
  incomingUserID: string,
  userStorage: UserStorage,
  teams: Team[]
): User {
  let userID = incomingUserID;
  if (!isValidID(userID)) {
    userID = createNewUserID(userStorage);
  }

  let user = userStorage.getByKey(UserProps.ID, userID);
  if (user == null) {
    user = new User("", userID);
  }
  userInTeam(user, teams);
  addUser(user, userStorage);

  return user;
}

function isValidID(id: string) {
  const regex = /[0-9A-Fa-f]{6}/g;
  if (id == null) return false;
  if (typeof id !== "string") return false;
  if (id.length <= 0) return false;
  if (!regex.test(id)) return false;
  return true;
}

export function userInTeam(user: User, teams: Team[]) {
  teams.forEach((team, index) => {
    if (team.hasMember(user)) {
      user.inTeam = true;
      user.teamId = index;
    }
  });
  return user.inTeam;
}
