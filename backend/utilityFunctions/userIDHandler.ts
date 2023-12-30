import JSONStorage from "../gameComponents/JSONStorage";

import crypto from "crypto";
import User from "../gameComponents/user";
import Team from "../gameComponents/team";

const addUserID = (userID: string, userIDStorage: JSONStorage) => {
  userIDStorage.addItem(userID);
};

const createNewUserID = (userIDStorage: JSONStorage) => {
  let id = "";
  while (!userIDStorage.itemExists(id)) {
    id = crypto.randomBytes(16).toString("hex");
    if (!userIDStorage.itemExists(id)) break;
  }
  return id;
};

export const handleUserID = (
  incomingUserID: string,
  userIDStorage: JSONStorage,
  teams: Team[]
): { userID: string; existed: boolean; inTeam: boolean } => {
  let userID = incomingUserID;
  if (!isValidID(incomingUserID)) {
    userID = createNewUserID(userIDStorage);
  }

  let existed = userIDExists(userID, userIDStorage);
  let isInTeam = userIDInTeam(userID, teams);

  return { userID: userID, existed: existed, inTeam: isInTeam };
};

const isValidID = (id: string) => {
  const regex = /[0-9A-Fa-f]{6}/g;
  if (id == null) return false;
  if (typeof id !== "string") return false;
  if (id.length <= 0) return false;
  if (!regex.test(id)) return false;
  return true;
};

const userIDExists = (userID: string, userIDStorage: JSONStorage) => {
  let idExists = false;
  if (userIDStorage.itemExists(userID)) idExists = true;
  if (!idExists) addUserID(userID, userIDStorage);
  return idExists;
};

export const userIDInTeam = (userID: string, teams: Team[]) => {
  let exists = false;
  teams.map((team) => {
    if (team.hasMember(new User("", userID))) exists = true;
  });
  return exists;
};

module.exports = {
  addUserID,
  createNewUserID,
  handleUserID,
  isValidID,
  userIDExists,
  userIDInTeam,
};
