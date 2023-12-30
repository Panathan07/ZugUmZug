export default class Road {
  color: string;
  bought: boolean;
  startCity: string;
  endCity: string;
  constructor(
    color: string,
    bought: boolean,
    startCity: string,
    endCity: string
  ) {
    this.color = color;
    this.bought = bought;
    this.startCity = startCity;
    this.endCity = endCity;
  }
}
