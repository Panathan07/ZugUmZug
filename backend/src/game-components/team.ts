import { isEqual } from "#utility-functions/isEqual";
import Road from "./road";
import Task from "./task";
import User from "./user";

export default class Team {
  points: number;
  name: string;
  color: string;
  members: User[];
  tasks: Task[];
  roads: Road[];

  constructor(name: string, color: string) {
    this.points = 0;
    this.name = name;
    this.color = color;
    this.members = [];
    this.tasks = [];
    this.roads = [
      // TODO: add proper roads later, when they are defined.
      new Road("yellow", false, "City1", "City2"),
      new Road("blue", false, "City1", "City2"),
      new Road("red", false, "City1", "City2"),
      new Road("black", false, "City1", "City2"),
      new Road("orange", false, "City1", "City2"),
      new Road("white", false, "City1", "City2"),
      new Road("green", false, "City1", "City2"),
    ];
  }
  addpoints(amount_points: number) {
    this.points += amount_points;
  }
  addroads(road: Road) {
    this.roads.push(road);
  }
  addtask(task: Task) {
    this.tasks.push(task);
  }
  removetask(task: Task) {
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
