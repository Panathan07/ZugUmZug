export function RoadTile({ onClick, color, posx, posy, rotation, activated }) {
  return (
    <div
      className="road-tile"
      style={
        activated
          ? {
              transform: "rotate(" + rotation + "deg)",
              background: color,
              top: posy + "%",
              left: posx + "%",
            }
          : {
              transform: "rotate(" + rotation + "deg)",
              background: "transparent",
              top: posy + "%",
              left: posx + "%",
            }
      }
      onClick={onClick}
    ></div>
  );
}
