import { createRoadConfig } from "#assets/roadsConf";
import Road from "#game-components/Road";

export function instantiateRoads(): Road[] {
  const roads = [] as Road[];
  const roadConfig = createRoadConfig();

  for (const road of roadConfig) {
    let city1 = road.city1;
    let city2 = road.city2;
    let buyCost = road.buyCost;
    roads.push(new Road(false, city1, city2, buyCost));
  }

  return roads;
}
