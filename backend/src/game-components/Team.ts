import { RoadColor } from "#customTypes/RoadColor";
import { RoadState } from "#customTypes/RoadState";
import { task } from "#customTypes/gameTask";
import { isEqual } from "#utility-functions/isEqual";
import Road from "./Road";
import Task from "./Task";
import User from "./User";

export default class Team {
  points: number;
  name: string;
  color: string;
  members: User[];
  colorCards: {
    blue: number;
    green: number;
    yellow: number;
    red: number;
    orange: number;
    black: number;
    white: number;
    pink: number;
  };
  id: number;
  tasks: task[];
  boughtRoads: Road[];
  taskOptions: task[];
  accepetedTasks: task[];
  constructor(name: string, color: string, id: number) {
    this.points = 60;
    this.name = name;
    this.color = color;
    this.members = [];
    this.id = id;
    this.tasks = [];
    this.boughtRoads = [];
    this.colorCards = {
      blue: 0,
      green: 0,
      yellow: 0,
      red: 0,
      orange: 0,
      black: 0,
      white: 0,
      pink: 0,
    };
    this.taskOptions = [];
    this.accepetedTasks = [];
  }

  addPoints(amount_points: number) {
    this.points += amount_points;
  }
  hasEnoughPoints(costs: number) {
    if (costs > this.points) return false;
    return true;
  }
  removePoints(amount_points: number) {
    this.points -= amount_points;
  }

  addColorCards(color: RoadColor, amount: number) {
    if (color === "none") return;
    this.colorCards[color] += amount;
  }
  removeColorCards(color: RoadColor, amount: number) {
    if (color === "none") return;
    this.colorCards[color] -= amount;
    if (this.colorCards[color] < 0) {
      this.colorCards[color] = 0;
    }
  }
  buyColorCard(color: RoadColor, price: number): boolean {
    if (!this.hasEnoughPoints(price)) return false;
    this.removePoints(price);
    this.addColorCards(color, 1);
    return true;
  }
  hasEnoughColorCards(color: RoadColor, costs: number) {
    if (color === "none") return;
    if (costs > this.colorCards[color]) return false;
    return true;
  }

  buyRoad(road: Road, colorCard: RoadColor): RoadState {
    let state: RoadState = {
      exists: true,
      boughtRoad: false,
      alreadyBought: false,
      enoughCards: false,
    };

    if (this.hasBoughtRoad(road)) {
      state.alreadyBought = true;
      return state;
    }

    let color = null;

    if (road.color === "none") {
      color = colorCard;
    } else {
      color = road.color;
    }

    if (!this.hasEnoughColorCards(color, road.buyCost)) return state;
    this.removeColorCards(color, road.buyCost);

    this.boughtRoads.push(road);
    road.buy();

    state.enoughCards = true;
    state.boughtRoad = true;
    return state;
  }
  hasBoughtRoad(road: Road): boolean {
    if (road.bought) return true;
    for (const boughtRoad of this.boughtRoads) {
      if (isEqual(road, boughtRoad)) return true;
    }
    return false;
  }

  addMember(user: User): void {
    if (this.hasMember(user)) return;
    user.teamId = this.id;
    this.members.push(user);
  }
  removeMember(user: User): void {
    if (!this.hasMember(user)) return;
    this.members.splice(this.members.indexOf(user), 1);
  }
  hasMember(user: User): boolean {
    for (const member of this.members) {
      if (member.ID === user.ID) return true;
    }
    return false;
  }
  get rotation(): task[] {
    return this.taskOptions;
  }
  get accepted_tasks(): task[] {
    return this.accepetedTasks;
  }
  accept_task(task: string): boolean {
    if (this.accepetedTasks.length > 4) {
      return false;
    }
    for (let i = 0; i < this.taskOptions.length; i++) {
      if (this.taskOptions[i].name == task) {
        this.accepetedTasks.push(this.taskOptions[i]);
        this.taskOptions.splice(i, 1);
        return true;
      }
    }
    return false;
  }
  solve_task(task: string, solution: string): boolean {
    if (this.accepetedTasks.length == 0) {
      return false;
    }
    for (let i = 0; i < this.accepetedTasks.length; i++) {
      console.log(this.accepetedTasks[i].name);
      if (this.accepetedTasks[i].name == task) {
        if (this.accepetedTasks[i].solution == solution) {
          this.accepetedTasks.splice(i, 1);
          return true;
        }
      }
    }
    return false;
  }
  setTask(new_taskOptions: task[]) {
    this.taskOptions = new_taskOptions;
  }
}
