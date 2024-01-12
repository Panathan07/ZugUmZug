import { splitCities } from "#utility-functions/splitCities";
import fs from "fs";

export function createRoadConfig(): { [key: string]: string }[] {
  const roadConfig = [];
  const file = JSON.parse(
    fs.readFileSync("./src/assets/roadConfig.json", "utf8")
  );

  for (const cities of Object.keys(file)) {
    let [city1, city2] = splitCities(cities);
    roadConfig.push({ [city1]: city2 });
  }

  return roadConfig;
}
