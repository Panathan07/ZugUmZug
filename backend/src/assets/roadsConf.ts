import { splitCities } from "#utility-functions/splitCities";
import RoadJson from "./roadConfig.json";

type RoadConfig = {
  city1: string;
  city2: string;
  buyCost: number;
};

export function createRoadConfig() {
  const roadConfig = [];

  for (const [cities, props] of Object.entries(RoadJson)) {
    let amountRoads = props.roads.length;
    let [city1, city2] = splitCities(cities);
    roadConfig.push({ city1: city1, city2: city2, buyCost: amountRoads });
  }

  return roadConfig;
}
