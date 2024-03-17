import { RoadColor } from "#customTypes/RoadColor";
import { RoadState } from "#customTypes/RoadState";
import { task } from "#customTypes/gameTask";
import { shuffle } from "#utility-functions/shuffle";
import { isEqual } from "#utility-functions/isEqual";
import Road from "./Road";
import Task from "./Task";
import User from "./User";
import { street_dictionary } from "#utility-functions/createStreetDictionary";
import {
  streetDictionary,
  streetConnection,
} from "../custom-types/streetConnection";
import jsonConnection from "../assets/cityConnections.json";
import { areCitysConnected } from "../utility-functions/connectedCityCheck";

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
  acceptedTasks: task[];
  connectedStreets: streetDictionary;
  streetGoals: streetConnection[];
  currentStreetGoals: streetConnection[];
  currentStreetOptions: streetConnection[];
  winPoints: number;
  constructor(name: string, color: string, id: number) {
    this.winPoints = 0;
    this.timeoutGoals();

    this.currentStreetGoals = [];
    this.currentStreetOptions = [];
    this.connectedStreets = street_dictionary();
    this.streetGoals = jsonConnection["content"];
    this.streetGoals = shuffle(this.streetGoals) as streetConnection[];
    this.currentStreetOptions = [this.streetGoals[0], this.streetGoals[1]];

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
    this.acceptedTasks = [];
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
    return this.acceptedTasks;
  }
  accept_task(task: string): boolean {
    if (this.acceptedTasks.length > 4) {
      return false;
    }
    for (let i = 0; i < this.taskOptions.length; i++) {
      if (this.taskOptions[i].name == task) {
        this.acceptedTasks.push(this.taskOptions[i]);
        this.taskOptions.splice(i, 1);
        return true;
      }
    }
    return false;
  }
  solve_task(task: string, solution: string): boolean {
    if (this.acceptedTasks.length == 0) {
      return false;
    }
    for (let i = 0; i < this.acceptedTasks.length; i++) {
      console.log(this.acceptedTasks[i].name, task);
      if (!(this.acceptedTasks[i].name == task)) continue;
      console.log(this.acceptedTasks[i].solution, solution);
      if (!(this.acceptedTasks[i].solution == solution)) continue;
      this.points += this.acceptedTasks[i].reward;
      this.acceptedTasks.splice(i, 1);
      return true;
    }
    return false;
  }
  setTask(new_taskOptions: task[]) {
    this.taskOptions = new_taskOptions;
  }

  private timeoutGoals() {
    setInterval(() => {
      this.shuffleGoals();
    }, 600000);
  }
  shuffleGoals() {
    this.streetGoals = shuffle(this.streetGoals) as streetConnection[];
    this.currentStreetOptions = [this.streetGoals[0], this.streetGoals[1]];
  }
  citiesConnected(connection: string[]) {
    let roadsDictionary: streetDictionary = {};
    for (let value of this.boughtRoads) {
      if (!Object.keys(roadsDictionary).includes(value.endCity)) {
        roadsDictionary[value.endCity] = [value.startCity];
      } else {
        roadsDictionary[value.endCity].push(value.startCity);
      }
      if (!Object.keys(roadsDictionary).includes(value.startCity)) {
        roadsDictionary[value.startCity] = [value.endCity];
      } else {
        roadsDictionary[value.startCity].push(value.endCity);
      }
    }
    if (areCitysConnected(roadsDictionary, connection[0], connection[1], [])) {
      if (
        this.currentStreetGoals[0].connection.includes(connection[0]) &&
        this.currentStreetGoals[0].connection.includes(connection[1])
      ) {
        this.winPoints += this.currentStreetGoals[0].reward;
        this.currentStreetGoals.splice(0, 1);
      } else if (
        this.currentStreetGoals[1].connection.includes(connection[0]) &&
        this.currentStreetGoals[1].connection.includes(connection[1])
      ) {
        this.winPoints += this.currentStreetGoals[1].reward;
        this.currentStreetGoals.splice(1, 1);
      }
      return true;
    }
    false;
  }
  get goals(): streetConnection[][] {
    return [this.currentStreetOptions, this.currentStreetGoals];
  }
  setGoal(connection: string[]) {
    let i = 0;
    for (let value of this.goals[0]) {
      if (
        value.connection.includes(connection[0]) &&
        value.connection.includes(connection[1])
      ) {
        if (this.currentStreetGoals.length < 2) {
          this.currentStreetGoals.push(value);
          this.streetGoals.splice(i, 1);
          this.currentStreetOptions.splice(i, 1);
          console.log(this.streetGoals[0]);
        }
        return true;
      }
      i += 1;
    }
    return false;
  }
}
