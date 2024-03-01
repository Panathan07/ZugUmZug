import { splitCities } from "#utility-functions/splitCities";
import fs from "fs";
import RoadJson from "./roadConfig.json";
import { RoadColor } from "#customtypes/RoadColor";

type RoadConfig = {
  city1: string;
  city2: string;
  buyCost: number;
  color: RoadColor;
};

export function createRoadConfig(): RoadConfig[] {
  const roadConfig = [];

  for (const [cities, props] of Object.entries(RoadJson)) {
    let amountRoads = props.roads.length;
    let [city1, city2] = splitCities(cities);
    let color = props.color as RoadColor;
    roadConfig.push({
      city1: city1,
      city2: city2,
      buyCost: amountRoads,
      color: color,
    });
  }

  return roadConfig;
}
