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
    this.points = 0;
    this.name = name;
    this.color = color;
    this.members = [];
    this.tasks = [];
    this.boughtRoads = [];
  }

  addPoints(amount_points: number) {
    this.points += amount_points;
  }

  buyRoad(road: Road): void {
    if (this.hasBoughtRoad(road)) return;
    this.boughtRoads.push(road);
    road.buy();
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
