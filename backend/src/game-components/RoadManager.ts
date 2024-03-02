import { RoadColor } from "#customtypes/RoadColor";
import { RoadState } from "#customtypes/RoadState";
import { instantiateRoads } from "#utility-functions/instantiateRoads";
import { splitCities } from "#utility-functions/splitCities";
import Road from "./Road";
import Team from "./Team";

export default class RoadManager {
  roads: Road[];
  constructor() {
    this.roads = instantiateRoads();
  }

  buyRoad(
    teams: Team[],
    teamId: number,
    roadName: string,
    colorCard: RoadColor
  ): RoadState | null {
    const [city1, city2] = splitCities(roadName);
    let road: Road | null = this.getRoad(city1, city2);

    if (road == null) return null;

    return teams[teamId].buyRoad(road, colorCard);
  }
  getRoad(city1: string, city2: string): Road | null {
    for (const road of this.roads) {
      if (road.hasCities(city1, city2)) return road;
    }
    return null;
  }
}
