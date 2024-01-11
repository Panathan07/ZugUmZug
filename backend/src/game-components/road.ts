import Team from "./Team";

export default class Road {
  bought: boolean;
  startCity: string;
  endCity: string;
  constructor(bought: boolean, startCity: string, endCity: string) {
    this.bought = bought;
    this.startCity = startCity;
    this.endCity = endCity;
  }
  buy() {
    this.bought = true;
  }
  hasCities(city1: string, city2: string): boolean {
    if (city1 === this.startCity && city2 === this.endCity) return true;
    return false;
  }
}
