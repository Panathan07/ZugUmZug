import { GameState } from "#customTypes/GameState";
import Team from "./Team";
import { IStorage, UserStorage } from "#customTypes/Storage";
import { UserSchema } from "#customTypes/StorageSchema";
import jsontask from "../assets/tasks.json";
import jsonconnection from "../assets/cityConnections.json"
import { cardTask, task } from "../custom-types/gameTask";
import RoadManager from "./RoadManager";
import { shuffle } from "#utility-functions/shuffle"
export default class Game {
     goalTimer: number
     taskTimer: number
  //readonly street_connections: streetConnections;
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
    get time() {
        return { task: this.taskTimer, goal: this.goalTimer }
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
        this.taskTimer = 300
        this.goalTimer = 600
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
    this.start();
  }
  start(): GameState {
      this.state = GameState.Started
      this.resetTimer()
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
  // Task Functions
  timeoutTask() {
    setInterval(
      () =>
        this.changeTasksRotation(
          this._teams,
          this.currentTasks,
          shuffle,
          this.taskRotation
        ),
      300000
    );
    }
    resetTimer() {
        setInterval(
            () => {
                this.taskTimer -= 1
                this.goalTimer -= 1
                if (this.taskTimer == 0) {
                    this.taskTimer = 300
                }
                if (this.goalTimer == 0) {
                    this.goalTimer = 600
                }
            },100
        )
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
    //
    //connecting goals
    setGoal(color: string, connection: string[]) {
        return this.teams[this.colors.indexOf(color)].setGoal(connection)
    }
    get_goals(color: string) {
        return this.teams[this.colors.indexOf(color)].goals
    }
    check_connection(teamColor: string, connection: string[]) {
        if (this.teams[this.colors.indexOf(teamColor)].citys_connected(connection)) {
            return true
        }
        return false
    }
    //

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
