import "../assets/css/gameMap.css";
import { Map } from "../components/map/Map";

// import { useEffect, useRef, useState } from "react";

export function Home() {
  // TODO: place one road on game field
  return (
    <div className="page-content">
      <Map />
    </div>
  );
}
