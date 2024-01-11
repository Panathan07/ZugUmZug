import { createRoadConfig } from "#assets/roadsConf";
import Road from "#game-components/Road";

export function instantiateRoads(): Road[] {
  const roads = [] as Road[];
  const roadConfig = createRoadConfig();

  for (const road of roadConfig) {
    let [city1, city2] = Object.entries(road)[0];
    roads.push(new Road(false, city1, city2));
  }

  return roads;
}
