import { RoadState } from "#customTypes/RoadState";
import { task } from "#customTypes/gameTask";
import { isEqual } from "#utility-functions/isEqual";
import { shuffle } from "#utility-functions/shuffle"
import Road from "./Road";
import Task from "./Task";
import User from "./User";
import { street_dictionary } from "#utility-functions/createStreetDictionary"
import { streetDictionary, streetConnection } from "../custom-types/streetConnection"
import jsonconnection from "../assets/cityConnections.json"
import { areCitysConnected } from "../utility-functions/connectedCityCeck";

export default class Team {
  points: number;
  name: string;
  color: string;
  members: User[];
  id: number;
  tasks: task[];
  boughtRoads: Road[];
  taskOptions: task[];
    accepetedTasks: task[];
    conncetedStreets: streetDictionary;
    streetGoals: streetConnection[];
    currentStreetGoals: streetConnection[];
    currentStreetOptions: streetConnection[]
    win_points: number
    constructor(name: string, color: string, id: number) {
        this.win_points = 0
        this.timeoutGoals()

        this.currentStreetGoals = []
        this.currentStreetOptions = []
        this.conncetedStreets = street_dictionary();
        this.streetGoals = jsonconnection["content"];
        this.streetGoals = shuffle(this.streetGoals) as streetConnection[]
        this.currentStreetOptions = [this.streetGoals[0], this.streetGoals[1]]
    this.points = 3;
    this.name = name;
    this.color = color;
    this.members = [];
    this.id = id;
    this.tasks = [];
    this.boughtRoads = [];
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
  // Roads
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

    //if (!this.hasEnoughPoints(road.buyCost)) return state;
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
    //
  // Member
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
  //
  // tasks
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
    //City Connections
    private timeoutGoals() {
        setInterval(
            () => {
                console.log("hey")
                this.streetGoals = shuffle(this.streetGoals) as streetConnection[]
                this.currentStreetOptions = [this.streetGoals[0], this.streetGoals[1]]
                console.log(this.currentStreetOptions)
            }, 60000)
    }
    citys_connected(connection: string[]) {
        let roadsDictionary : streetDictionary = {}
        for (let value of this.boughtRoads) {
            if (!Object.keys(roadsDictionary).includes(value.endCity)) {
                roadsDictionary[value.endCity] = [value.startCity]
            }
            else {
                roadsDictionary[value.endCity].push(value.startCity)
            }
            if (!Object.keys(roadsDictionary).includes(value.startCity)) {
                roadsDictionary[value.startCity] = [value.endCity]
            }
            else {
                roadsDictionary[value.startCity].push(value.endCity)
            }

        }
        if (areCitysConnected(roadsDictionary, connection[0], connection[1], [])) {
            if (this.currentStreetGoals[0].connection.includes(connection[0]) && this.currentStreetGoals[0].connection.includes(connection[1])) {
                this.win_points += this.currentStreetGoals[0].reward
                this.currentStreetGoals.splice(0, 1)
            } else if (this.currentStreetGoals[1].connection.includes(connection[0]) && this.currentStreetGoals[1].connection.includes(connection[1])) {
                this.win_points += this.currentStreetGoals[1].reward
                this.currentStreetGoals.splice(1, 1)
            }
            return true
        }
        false
        
    }
    get goals(): streetConnection[][] {
        return [this.currentStreetOptions, this.currentStreetGoals]
    }
    setGoal(connection: string[]) {
        let i = 0
        for (let value of this.goals[0]) {
            if (value.connection.includes(connection[0]) && value.connection.includes(connection[1])) {
                if (this.currentStreetGoals.length < 2) {
                    this.currentStreetGoals.push(value)
                    this.streetGoals.splice(i, 1)
                    this.currentStreetOptions.splice(i,1)
                    console.log(this.streetGoals[0])
                }
                return true
            }
            i += 1
        }
        return false
    }

    //

}
