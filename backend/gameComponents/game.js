const Status = require("./status.js");
const Team = require("./teams.js")
class Game {
    constructor(amountTeams) {
        this.colors = ["blue", "green", "yellow", "red", "orange", "black", "white"];
        this.amountTeams = amountTeams;
        this.state = Status.NotStarted;
        this.teams = []
        for (let i = 0; i < this.amountTeams; i++) {
            this.teams.push(new Team(this.colors[i]))
        };
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
    getTeams() {
        return this.teams;
    }
    jsonTeamResponse() {
        this.response = {
            teams: this.teams
        }

        return this.response
    }
}

module.exports = Game;