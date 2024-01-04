import crypto from "crypto";
import User, { UserProps } from "#game-components/user";
import Team from "#game-components/team";
import JSONStorage from "#game-components/JSONStorage";
import { IStorage, UserStorage } from "#customtypes/Storage";
import { UserSchema } from "#customtypes/StorageSchema";

const addUser = (user: User, userStorage: UserStorage) => {
  userStorage.insert(user);
};

const createNewUserID = (userStorage: UserStorage) => {
  let id = "";
  while (true) {
    id = crypto.randomBytes(16).toString("hex");
    if (!userStorage.itemWithPropExists("ID", id)) break;
  }
  return id;
};

export const handleUserID = (
  incomingUserID: string,
  userStorage: UserStorage,
  teams: Team[]
): User => {
  let userID = incomingUserID;
  if (!isValidID(userID)) {
    userID = createNewUserID(userStorage);
  }

  let user = userStorage.getByKey(UserProps.ID, userID);
  if (user == null) {
    user = new User("", userID);
  }
  userInTeam(user, teams);
  userExists(user, userStorage);

  return user;
};

const isValidID = (id: string) => {
  const regex = /[0-9A-Fa-f]{6}/g;
  if (id == null) return false;
  if (typeof id !== "string") return false;
  if (id.length <= 0) return false;
  if (!regex.test(id)) return false;
  return true;
};

const userExists = (user: User, userStorage: UserStorage) => {
  if (userStorage.itemExists(user)) return;
  addUser(user, userStorage);
};

export const userInTeam = (user: User, teams: Team[]) => {
  teams.map((team) => {
    if (team.hasMember(user)) user.inTeam = true;
  });
  return user.inTeam;
};
