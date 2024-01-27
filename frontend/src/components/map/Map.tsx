import { useRef } from "react";
import map from "@assets/images/map-usa.png";
import { Roads } from "./Roads";
import { useImageSize } from "@hooks/useImageSize";

export function Map() {
  const mapRef = useRef<HTMLImageElement>(null);
  const mapSize = useImageSize(mapRef);

  return (
    <div className="map-wrapper">
      <img className="map-background-image" src={map} ref={mapRef} alt="Map" />
      <div
        className="map-container"
        style={{
          width: mapSize.width,
          height: mapSize.height,
        }}
      >
        <Roads />
      </div>
    </div>
  );
}
