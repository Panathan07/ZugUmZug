import { GameState } from "#customtypes/GameState";
import Team from "./Team";
import { IStorage, UserStorage } from "#customtypes/Storage";
import { UserSchema } from "#customtypes/StorageSchema";
import jsontask from "./tasks.json";
import { task } from "../custom-types/gameTask";
import RoadManager from "./RoadManager";
import { RoadColor } from "#customtypes/RoadColor";
import ColorCardsManager from "./ColorCardManager";

export default class Game {
  readonly colors: string[];
  readonly amountTeams: number;
  private _state: GameState = GameState.NotStarted;
  private taskRotation: string[];
  private tasks: { [key: string]: task } = {};

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
  get_rotation(color: string) {
    return this.teams[this.colors.indexOf(color)].rotation;
  }
  set teams(value: Team[]) {
    this._teams = value;
  }
  readonly roadManager: RoadManager;
  readonly storage: UserStorage;
  readonly colorCardsManager: ColorCardsManager;

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
    for (const value of Object.values(jsontask)) {
      this.tasks[value["name"]] = value as task;
    }
    this.taskRotation = [];
    for (const value of Object.values(this.tasks)) {
      this.taskRotation.push(value.name);
    }
    const price = 15;
    this.colorCardsManager = new ColorCardsManager(price);
  }
  start(): GameState {
    this.state = GameState.Started;
    this.timeoutTask();
    return this.state;
  }
  end(): GameState {
    this.state = GameState.Ended;
    return this.state;
  }
  useStorage(): UserStorage {
    return this.storage;
  }
  timeoutTask() {
    setInterval(
      () =>
        this.changeTasksRotation(
          this._teams,
          this.currentTasks,
          this.shuffle,
          this.taskRotation,
          this.tasks
        ),
      10000
    );
  }
  private changeTasksRotation(
    teams: Team[],
    currentTasks: Function,
    shuffle: Function,
    taskRotation: string[],
    tasks: { [key: string]: task }
  ) {
    taskRotation = shuffle(taskRotation);
    for (const team of teams) {
      console.log(currentTasks(team.color, taskRotation, tasks));
      team.setTask(currentTasks(team.color, taskRotation, tasks));
    }
  }
  shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  currentTasks(
    color: string,
    taskRotation: string[],
    tasks: { [key: string]: task }
  ) {
    let task_ret: { [key: string]: task } = {};
    console.log(taskRotation);
    for (const value of taskRotation) {
      if (!tasks[value]["completed"].includes(color)) {
        task_ret[value] = tasks[value];
      }
    }
    return task_ret;
  }

  useColorCards(): ColorCardsManager {
    return this.colorCardsManager;
  }

  useRoads(): RoadManager {
    return this.roadManager;
  }
  private createTeams(): Team[] {
    const teamsArray = [];
    for (let id = 0; id < this.amountTeams; id++) {
      teamsArray.push(new Team("Team " + this.colors[id], this.colors[id], id));
    }
    return teamsArray;
  }
}
