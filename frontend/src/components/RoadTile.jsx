/* eslint-disable react/prop-types */

export function RoadTile({ color, posx, posy, rotation, activated }) {
  return (
    <div
      className="road-tile"
      style={{
        transform: "rotate(" + rotation + "deg)",
        background: color,
        top: posy + "%",
        left: posx + "%",
      }}
    ></div>
  );
}
