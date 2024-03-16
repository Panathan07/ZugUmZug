import { GameState } from "#customTypes/GameState";
import Team from "./Team";
import { IStorage, UserStorage } from "#customTypes/Storage";
import { UserSchema } from "#customTypes/StorageSchema";
import jsontask from "../assets/tasks.json";
import jsonconnection from "../assets/cityConnections.json";
import { cardTask, task } from "../custom-types/gameTask";
import RoadManager from "./RoadManager";
import { RoadColor } from "#customTypes/RoadColor";
import ColorCardsManager from "./ColorCardManager";
import { shuffle } from "#utility-functions/shuffle";

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

  goalTimer: number;
  taskTimer: number;

  get time() {
    return { task: this.taskTimer, goal: this.goalTimer };
  }
  readonly roadManager: RoadManager;
  readonly storage: UserStorage;
  readonly colorCardsManager: ColorCardsManager;

  constructor(
    amountTeams: number,
    storage: UserStorage,
    roadManager: RoadManager
  ) {
    this.taskTimer = 300;
    this.goalTimer = 600;
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
    this.resetTimer();
    this.changeTasksRotation(
      this._teams,
      this.currentTasks,
      shuffle,
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
          shuffle,
          this.taskRotation
        ),
      600 * 1000
    );
  }
  resetTimer() {
    setInterval(() => {
      this.taskTimer -= 1;
      this.goalTimer -= 1;
      if (this.taskTimer <= 0) {
        this.taskTimer = 300;
      }
      if (this.goalTimer <= 0) {
        this.goalTimer = 600;
      }
    }, 1000);
  }
  private changeTasksRotation(
    teams: Team[],
    currentTasks: (teamId: number, taskRotation: task[]) => task[],
    shuffle: Function,
    taskRotation: task[]
  ) {
    taskRotation = shuffle(taskRotation);
    for (const team of teams) {
      team.setTask(currentTasks(team.id, taskRotation));
    }
  }
  currentTasks(teamId: number, taskRotation: task[]) {
    const task_ret: task[] = [];
    let p = 0;
    for (let i = 0; i < taskRotation.length; i++) {
      if (!taskRotation[i]["completed"].includes(teamId) && p != 4) {
        p += 1;
        task_ret.push(taskRotation[i]);
      }
    }
    return task_ret;
  }

  useColorCards(): ColorCardsManager {
    return this.colorCardsManager;
  }

  get_rotation(teamId: number) {
    const ret_array: cardTask[] = [];
    for (const value of this.teams[teamId].rotation) {
      ret_array.push({
        name: value.name,
        description: value.description,
          data: value.data,
          reward: value.reward
      });
    }
    return ret_array;
  }
  get_accepted_tasks(teamId: number) {
    const ret_array: cardTask[] = [];
    for (const value of this.teams[teamId].accepted_tasks) {
      ret_array.push({
        name: value.name,
        description: value.description,
          data: value.data,
          reward: value.reward
      });
    }
    return ret_array;
  }
  accept_task(teamId: number, taskName: string): boolean {
    const teamResponse = this.teams[teamId].accept_task(taskName);
    if (teamResponse) {
      for (const value of this.taskRotation) {
        if (value.name == taskName) {
          value.completed.push(teamId);
          return true;
        }
      }
    }
    return false;
  }
  solve_task(teamId: number, taskName: string, solution: string): boolean {
    return this.teams[teamId].solve_task(taskName, solution);
  }

  //connecting goals
  setGoal(teamId: number, connection: string[]) {
    return this.teams[teamId].setGoal(connection);
  }
  get_goals(teamId: number) {
    return this.teams[teamId].goals;
  }
  check_connection(teamId: number, connection: string[]) {
    if (this.teams[teamId].citiesConnected(connection)) {
      return true;
    }
    return false;
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
