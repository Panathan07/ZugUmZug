import { RoadTile } from "./RoadTile";
import jsondata from "./roads.json";
import { useState } from "react";

export function Roads() {
  const collectRoadData = () => {
    let roads = [];
    for (let value of Object.values(jsondata)) {
      roads.push(...value);
    }
    console.log(roads);

    return roads;
  };

  const [roads, setRoads] = useState(collectRoadData());
  return (
    <div className="roads-wrapper">
      {roads.map((roadTile) => (
        <RoadTile
          key={roads.indexOf(roadTile)}
          className="road-tile"
          color={roadTile.color}
          rotation={roadTile.rotation}
          posx={roadTile.posx}
          posy={roadTile.posy}
        />
      ))}
    </div>
  );
}
