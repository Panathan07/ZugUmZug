/* eslint-disable react/prop-types */

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
              transitionProperty: "background",
              transitionDuration: "0.1s",
              transitionTimingFunction: "linear",
            }
          : {
              transform: "rotate(" + rotation + "deg)",
              background: "transparent",
              top: posy + "%",
              left: posx + "%",
              transitionProperty: "background",
              transitionDuration: "0.1s",
              transitionTimingFunction: "linear",
            }
      }
      onClick={onClick}
    ></div>
  );
}
