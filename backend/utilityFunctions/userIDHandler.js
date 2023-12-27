const fs = require("fs");
const crypto = require("crypto");

const addUserID = (userID, userIDStorage) => {
    userIDStorage.addItem(userID)
}

const createNewUserID = (userIDStorage) => {
    let id = "";
    while (!userIDStorage.itemExists(id)) {
        id = crypto.randomBytes(16).toString("hex");
        if (!userIDStorage.itemExists(id)) break;
    }
    return id;
}

const handleUserID = (incomingUserID, userIDStorage, teams) => {
    let userID = incomingUserID;
    if (!isValidID(incomingUserID)) {
        userID = createNewUserID(userIDStorage);
    }

    let existed = userIDExists(userID, userIDStorage);
    let isInTeam = userIDInTeam(userID, teams);

    return { "userID": userID, "existed": existed, "inTeam": isInTeam }
}

const isValidID = (ID) => {
    const regex = /[0-9A-Fa-f]{6}/g;
    if (ID == null) return false;
    if (typeof ID !== 'string') return false;
    if (ID.length <= 0) return false;
    if (!regex.test(ID)) return false;
    return true;
}

const userIDExists = (userID, userIDStorage) => {
    let idExists = false;
    if (userIDStorage.itemExists(userID)) idExists = true;
    if (!idExists) addUserID(userID, userIDStorage);
    return idExists;
}

const userIDInTeam = (userID, teams) => {
    let exists = false;
    teams.map((team) => {
        if (team.hasMember(userID)) exists = true;
    })
    return exists;
}


module.exports = {
    addUserID,
    createNewUserID,
    handleUserID,
    isValidID,
    userIDExists,
    userIDInTeam
}