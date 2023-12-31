import Team from "./team";

export enum GameState {
  Started,
  NotStarted,
  Ended,
}

export default class Game {
  readonly colors: string[];
  readonly amountTeams: number;
  private _state: GameState = GameState.NotStarted;
  get state(): GameState {
    return this._state;
  }
  private set state(state: GameState) {
    this._state = state;
  }
  private _teams: Team[] = [];
  get teams(): Team[] {
    return this._teams;
  }
  set teams(value: Team[]) {
    this._teams = value;
  }

  constructor(amountTeams: number) {
    this.colors = [
      "blue",
      "green",
      "yellow",
      "red",
      "orange",
      "black",
      "white",
    ];
    this.amountTeams = amountTeams;
    this.state = GameState.NotStarted;
    this.teams = [];
    for (let i = 0; i < this.amountTeams; i++) {
      this.teams.push(new Team("Team " + this.colors[i], this.colors[i]));
    }
  }
  start() {
    this.state = GameState.Started;
  }
  end() {
    this.state = GameState.Ended;
  }
}

module.exports = Game;
