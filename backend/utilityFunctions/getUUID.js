const crypto = require("crypto");

const getUUID = (usedIDs) => {
    let id = "";
    while (!usedIDs.includes(id)) {
        id = crypto.randomBytes(16).toString("hex");
        if (!usedIDs.includes(id)) {
            usedIDs.push(id);
        }
    }
    return id;
}

module.exports = getUUID;