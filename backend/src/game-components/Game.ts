import { GameState } from "#customTypes/GameState";
import Team from "./Team";
import { IStorage, UserStorage } from "#customTypes/Storage";
import { UserSchema } from "#customTypes/StorageSchema";
import jsontask from "./tasks.json";
import { cardTask, task } from "../custom-types/gameTask";
import RoadManager from "./RoadManager";
import { RoadColor } from "#customtypes/RoadColor";
import ColorCardsManager from "./ColorCardManager";

export default class Game {
  readonly colors: string[];
  readonly amountTeams: number;
  private _state: GameState = GameState.NotStarted;
  private taskRotation: task[] = [];

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
      this.taskRotation.push(value as task);
    }
    const price = 15;
    this.colorCardsManager = new ColorCardsManager(price);
    this.start();
  }
  start(): GameState {
    this.state = GameState.Started;
    this.changeTasksRotation(
      this._teams,
      this.currentTasks,
      this.shuffle,
      this.taskRotation
    );
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
          this.taskRotation
        ),
      10000
    );
  }
  private changeTasksRotation(
    teams: Team[],
    currentTasks: Function,
    shuffle: Function,
    taskRotation: task[]
  ) {
    taskRotation = shuffle(taskRotation);
    for (const team of teams) {
      team.setTask(currentTasks(team.color, taskRotation));
    }
  }
  shuffle(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  currentTasks(color: string, taskRotation: task[]) {
    const task_ret: task[] = [];
    let p = 0;
    for (let i = 0; i < taskRotation.length; i++) {
      if (!taskRotation[i]["completed"].includes(color) && p != 4) {
        p += 1;
        task_ret.push(taskRotation[i]);
      }
    }
    return task_ret;
  }

  useColorCards(): ColorCardsManager {
    return this.colorCardsManager;
  }

  get_rotation(color: string) {
    const ret_array: cardTask[] = [];
    for (const value of this.teams[this.colors.indexOf(color)].rotation) {
      ret_array.push({
        name: value.name,
        description: value.description,
        data: value.data,
      });
    }
    return ret_array;
  }
  get_accepted_tasks(color: string) {
    const ret_array: cardTask[] = [];
    for (const value of this.teams[this.colors.indexOf(color)].accepted_tasks) {
      ret_array.push({
        name: value.name,
        description: value.description,
        data: value.data,
      });
    }
    return ret_array;
  }
  accept_task(color: string, taskName: string): boolean {
    const teamResponse =
      this.teams[this.colors.indexOf(color)].accept_task(taskName);
    if (teamResponse) {
      for (const value of this.taskRotation) {
        if (value.name == taskName) {
          value.completed.push(color);
          return true;
        }
      }
    }
    return false;
  }
  solve_task(color: string, taskName: string, solution: string): boolean {
    return this.teams[this.colors.indexOf(color)].solve_task(
      taskName,
      solution
    );
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
