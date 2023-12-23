import { useState, useRef, useEffect } from "react";
import map from "../../assets/images/map-usa.png";
import { Roads } from "./Roads";

export function Map() {
  const [mapImageSize, setMapImageSize] = useState({ width: 100, height: 200 });
  const mapImageRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setMapImageSize({
        width: mapImageRef.current.clientWidth,
        height: mapImageRef.current.clientHeight,
      });
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, [mapImageSize.height, mapImageSize.width]);
  //   useEffect(() => console.log(mapImageWidth), [mapImageWidth]);

  return (
    <div className="map-wrapper">
      <img
        className="map-background-image"
        src={map}
        ref={mapImageRef}
        alt="Map"
      />
      <div
        className="map-container"
        style={{
          width: mapImageSize.width,
          height: mapImageSize.height,
        }}
      >
        <Roads />
      </div>
    </div>
  );
}
