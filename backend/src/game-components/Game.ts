import { GameState } from "#customtypes/GameState";
import Team from "./Team";
import { IStorage, UserStorage } from "#customtypes/Storage";
import { UserSchema } from "#customtypes/StorageSchema";
import RoadManager from "./RoadManager";

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
  readonly roadManager: RoadManager;
  readonly storage: UserStorage;

  constructor(
    amountTeams: number,
    storage: UserStorage,
    roadManager: RoadManager
  ) {
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
    this.teams = this.createTeams();
    this.roadManager = roadManager;
    this.storage = storage;
  }
  start(): GameState {
    this.state = GameState.Started;
    return this.state;
  }
  end(): GameState {
    this.state = GameState.Ended;
    return this.state;
  }
  useStorage(): UserStorage {
    return this.storage;
  }
  useRoads(): RoadManager {
    return this.roadManager;
  }
  private createTeams(): Team[] {
    const teamsArray = [];
    for (let i = 0; i < this.amountTeams; i++) {
      teamsArray.push(new Team("Team " + this.colors[i], this.colors[i]));
    }
    return teamsArray;
  }
}
