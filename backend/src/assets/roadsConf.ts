import { splitCities } from "#utility-functions/splitCities";
import fs from "fs";

type RoadJSON = {
  [key: string]: {
    color: string;
    activated: boolean;
    roads: {
      rotation: number;
      posx: number;
      posy: number;
    }[];
  };
};

type RoadConfig = {
  city1: string;
  city2: string;
  buyCost: number;
};

export function createRoadConfig(): RoadConfig[] {
  const roadConfig = [];
  const roadsJSON: RoadJSON = JSON.parse(
    fs.readFileSync("./src/assets/roadConfig.json", "utf8")
  );

  for (const cities of Object.keys(roadsJSON)) {
    let amountRoads = roadsJSON[cities].roads.length;
    let [city1, city2] = splitCities(cities);
    roadConfig.push({ city1: city1, city2: city2, buyCost: amountRoads });
  }

  return roadConfig;
}
