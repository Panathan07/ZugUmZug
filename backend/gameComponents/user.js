class User {
    constructor(username, userID) {
        this.username = username;
        this.userID = userID;
    }

    getUsername() {
        return this.username;
    }

    setUsername(newUsername) {
        this.username = newUsername;
    }

    getUserID() {
        return this.userID;
    }

    setUserID(newUserID) {
        this.userID = newUserID;
    }
}