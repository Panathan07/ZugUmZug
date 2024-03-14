import jsondata from "../assets/roadConfig.json";
import { streetDictionary } from "#customTypes/streetConnection";
export function street_dictionary() {
  let connections: streetDictionary = {};
  for (let value of Object.keys(jsondata)) {
    let [city1, city2] = value.split(" - ");
    if (!Object.keys(connections).includes(city1)) {
      connections[city1] = [city2];
    } else if (!connections[city1].includes(city2)) {
      connections[city1].push(city2);
    }
    if (!Object.keys(connections).includes(city2)) {
      connections[city2] = [city1];
    } else if (!connections[city2].includes(city1)) {
      connections[city2].push(city1);
    }
  }
  return connections;
}
