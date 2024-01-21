import { RoadState } from "#customtypes/RoadState";
import { isEqual } from "#utility-functions/isEqual";
import Road from "./Road";
import Task from "./Task";
import User from "./User";

export default class Team {
  points: number;
  name: string;
  color: string;
  members: User[];
  tasks: Task[];
  boughtRoads: Road[];

  constructor(name: string, color: string) {
    this.points = 3;
    this.name = name;
    this.color = color;
    this.members = [];
    this.tasks = [];
    this.boughtRoads = [];
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
    this.members.push(user);
  }
  removeMember(user: User): void {
    if (!this.hasMember(user)) return;
    this.members.splice(this.members.indexOf(user), 1);
  }
  hasMember(user: User): boolean {
    for (const member of this.members) {
      if (isEqual(member, user)) return true;
    }
    return false;
  }
}
