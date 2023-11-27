const Status = require("./status.js");

class Game {
    constructor(amountTeams) {
        this.colors = ["red", "blue", "green", "yellow", "orange", "black", "white"];
        this.amountTeams = amountTeams;
        this.state = Status.NotStarted;
    }
    start() {
        this.state = Status.Started;
    }
    end() {
        this.state = Status.Ended;
    }
    jsonResponse() {
        this.response = {
            state: this.state,
            amountTeams: this.amountTeams
        }

        return this.response;
    }
}

module.exports = Game;