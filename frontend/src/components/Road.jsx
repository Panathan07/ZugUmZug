import "../assets/css/road.css";
import jsondata from "./roads.json"
export function Road({ color, rotation }) {
    let road = Collect_Road_data("Denver - Kansas");
  return <div className="road-box"></div>;
}

function Collect_Road_data(roadName) {
    let roads = jsondata;
    let output = roads[roadName];
    console.log(output);
    return output;
}
