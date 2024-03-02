import { RoadColor } from "@customTypes/roadColor";
import "@assets/css/smallCard.css";

export default function SmallColorCard({
  color,
  onClick,
}: {
  color: RoadColor;
  onClick?: () => void;
}) {
  return (
    <div
      className="small-card"
      style={{ "--_color": color } as React.CSSProperties}
      onClick={onClick}
    >
      <div className="top"></div>
    </div>
  );
}
