/* eslint-disable react/prop-types */
import { useState } from "react";
import "../assets/css/road.css";
import jsondata from "./roads.json";

export function Road({ roadName }) {
  const collectRoadData = (roadName) => {
    let roads = jsondata;
    let output = roads[roadName];
    // console.log(output);
    return output;
  };

  const [road, setRoad] = useState(collectRoadData(roadName));

  return (
    <div className="road-wrapper">
      {road.map((roadTile) => (
        <div
          key={road.indexOf(roadTile)}
          className="road-tile"
          style={{
            transform: "rotate(" + roadTile.rotation + "deg)",
            background: roadTile.color,
            gridRow: roadTile.posy,
            gridColumn: roadTile.posx,
          }}
        ></div>
      ))}
    </div>
  );
}
