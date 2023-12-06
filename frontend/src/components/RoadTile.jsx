/* eslint-disable react/prop-types */

export function RoadTile({ color, posx, posy, rotation }) {
  return (
    <div
      className="road-tile"
      style={{
        transform: "rotate(" + rotation + "deg)",
        background: color,
        top: posy + "px",
        left: posx + "px",
      }}
    ></div>
  );
}
