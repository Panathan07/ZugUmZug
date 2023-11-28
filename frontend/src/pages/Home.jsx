import "../assets/css/gameMap.css";
import { Road } from "../components/Road";

export function Home() {
  // TODO: place one road on game field
  return (
    <div className="page-content">
      <div className="map-container">
        <Road roadName="Denver - Kansas" />
      </div>
    </div>
  );
}
