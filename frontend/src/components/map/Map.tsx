import map from "@assets/images/map-usa.png";
import { Roads } from "./Roads";

export function Map() {
  return (
    <div className="map-wrapper">
      <img className="map-background-image" src={map} alt="Map" />
      <div className="map-container">
        <Roads />
      </div>
    </div>
  );
}
