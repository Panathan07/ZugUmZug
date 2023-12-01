import { useState, useRef, useEffect } from "react";
import map from "../assets/images/map-usa.png";
import { Road } from "./Road";

export function Map() {
  const numberOfGridRows = 100;

  const [mapImageSize, setMapImageSize] = useState({ width: 100, height: 200 });
  const [gridSizes, setGridSizes] = useState({
    rows: numberOfGridRows,
    columns: numberOfGridRows,
  });
  const mapImageRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setMapImageSize({
        width: mapImageRef.current.clientWidth,
        height: mapImageRef.current.clientHeight,
      });
      setGridSizes({
        rows: numberOfGridRows,
        columns: Math.floor(
          mapImageSize.width / (mapImageSize.height / numberOfGridRows)
        ),
      });
      //console.log(gridSizes.columns);
    };
    handleResize();
    // console.log("update");
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
          gridTemplateRows: `repeat(${gridSizes.rows}, ${
            mapImageSize.height / numberOfGridRows
          }px)`,
          ...console.log(gridSizes.columns),
          ...console.log(
            mapImageSize.width / (mapImageSize.height / numberOfGridRows)
          ),
          gridTemplateColumns: `repeat(${gridSizes.columns}, ${
            mapImageSize.height / numberOfGridRows
          }px)`,
        }}
      >
        <Road roadName="Denver - Kansas" />
      </div>
    </div>
  );
}
