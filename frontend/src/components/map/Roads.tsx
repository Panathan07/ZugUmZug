import { RoadTile } from "./RoadTile";
import jsondata from "./roads.json";
import { useState } from "react";

type RoadGroup = {
  activated: boolean;
  color: string;
  roads: { rotation: number; posx: number; posy: number }[];
};

export function Roads() {
  const collectRoadData = () => {
    const roads = [];
    for (const value of Object.values(jsondata)) {
      const roadGroup: RoadGroup = {
        activated: value.activated === 1 ? true : false,
        color: value.color,
        roads: value.roads,
      };
      roads.push(roadGroup);
    }

    return roads;
  };

  const [roads, setRoads] = useState(collectRoadData());

  const roadOnClick = (oldState: boolean, roadGroupIndex: number): void => {
    changeActivityState(!oldState, roadGroupIndex);
  };

  const changeActivityState = (newState: boolean, roadGroupIndex: number) => {
    const newRoads = [...roads];
    newRoads[roadGroupIndex].activated = newState;
    setRoads(newRoads);
  };

  return (
    <div className="roads-wrapper">
      {roads.map((roadGroup) =>
        roadGroup.roads.map((roadTile) => (
          <RoadTile
            key={
              roadGroup.roads.indexOf(roadTile) + 100 * roads.indexOf(roadGroup)
            }
            color={roadGroup.color}
            rotation={roadTile.rotation}
            posx={roadTile.posx}
            posy={roadTile.posy}
            activated={roadGroup.activated}
            onClick={() =>
              roadOnClick(roadGroup.activated, roads.indexOf(roadGroup))
            }
          />
        )),
      )}
    </div>
  );
}
