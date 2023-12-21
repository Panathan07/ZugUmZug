import { RoadTile } from "./RoadTile";
import jsondata from "./roads.json";
import { useState } from "react";

export function Roads() {
  const collectRoadData = () => {
    let roads = [];
    for (let value of Object.values(jsondata)) {
      let roadGroup = [];
      if (value.activated == 1) {
        roadGroup.push(true);
      } else {
        roadGroup.push(false);
      }
      let roadGroupRoads = [];
      for (let road of value.roads) {
        road["color"] = value.color;
        roadGroupRoads.push(road);
      }
      roadGroup.push(roadGroupRoads);
      roads.push(roadGroup);
    }
    // console.log(roads);

    return roads;
  };

  const [roads, setRoads] = useState(collectRoadData());

  const roadOnClick = (oldState, roadGroupIndex) => {
    changeActivityState((oldState + 1) % 2, roadGroupIndex);
  };

  const changeActivityState = (newState, roadGroupIndex) => {
    let newRoads = [...roads];
    newRoads[roadGroupIndex][0] = newState;
    setRoads(newRoads);
  };

  return (
    <div className="roads-wrapper">
      {roads.map((roadGroup) =>
        roadGroup[1].map((roadTile) => (
          <RoadTile
            key={
              roadGroup[1].indexOf(roadTile) + 100 * roads.indexOf(roadGroup)
            }
            className="road-tile"
            color={roadTile.color}
            rotation={roadTile.rotation}
            posx={roadTile.posx}
            posy={roadTile.posy}
            activated={roadGroup[0]}
            onClick={() => roadOnClick(roadGroup[0], roads.indexOf(roadGroup))}
          />
        ))
      )}
    </div>
  );
}
