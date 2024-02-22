import { RoadColor } from "#customtypes/RoadColor";
import { RoadState } from "#customtypes/RoadState";
import { task } from "#customtypes/gameTask";
import { isEqual } from "#utility-functions/isEqual";
import Road from "./Road";
import Task from "./Task";
import User from "./User";

export default class Team {
  points: number;
  name: string;
  id: number;
  color: string;
  members: User[];
  tasks: Task[];
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
  boughtRoads: Road[];
  taskOptions: { [key: string]: task };

  constructor(name: string, color: string, id: number) {
    this.points = 15;
    this.name = name;
    this.id = id;
    this.color = color;
    this.members = [];
    this.tasks = [];
    this.boughtRoads = [];
    this.taskOptions = {};
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

  buyRoad(road: Road): RoadState {
    let state: RoadState = {
      exists: true,
      boughtRoad: false,
      alreadyBought: false,
      enoughPoints: false,
    };

    if (this.hasBoughtRoad(road)) {
      state.alreadyBought = true;
      return state;
    }

    if (!this.hasEnoughPoints(road.buyCost)) return state;
    this.removePoints(road.buyCost);

    this.boughtRoads.push(road);
    road.buy();

    state.enoughPoints = true;
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

  addTask(task: Task) {
    this.tasks.push(task);
  }
  removeTask(task: Task) {
    const index = this.tasks.indexOf(task);
    this.tasks.splice(index, 1);
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
  get rotation(): { [key: string]: task } {
    return this.taskOptions;
  }
  setTask(new_taskOptions: { [key: string]: task }) {
    console.log(new_taskOptions);
    this.taskOptions = new_taskOptions;
  }

  buyColorCard(color: RoadColor, price: number): boolean {
    if (this.points - price < 0) return false;
    this.points -= price;
    this.colorCards[color] += 1;
    console.log("bought Card", this.points, color);
    return true;
  }
}
