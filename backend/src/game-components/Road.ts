import { RoadColor } from "#customTypes/RoadColor";

export default class Road {
  bought: boolean;
  startCity: string;
  endCity: string;
  buyCost: number;
  color: RoadColor;
  constructor(
    bought: boolean,
    startCity: string,
    endCity: string,
    cost: number,
    color: RoadColor
  ) {
    this.bought = bought;
    this.startCity = startCity;
    this.endCity = endCity;
    this.buyCost = cost;
    this.color = color;
  }
  buy() {
    this.bought = true;
  }
  hasCities(city1: string, city2: string): boolean {
    if (city1 === this.startCity && city2 === this.endCity) return true;
    return false;
  }
}
