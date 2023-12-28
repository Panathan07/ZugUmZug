import PropTypes, { InferProps } from "prop-types";
export function RoadTile({
  onClick,
  color,
  posx,
  posy,
  rotation,
  activated,
}: InferProps<typeof RoadTile.propTypes>) {
  return (
    <div
      className="road-tile"
      style={
        activated
          ? {
              transform: "rotate(" + rotation + "deg)",
              background: color ? color : "black",
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
      onClick={onClick ? onClick : undefined}
    ></div>
  );
}

RoadTile.propTypes = {
  activated: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.func,
  posx: PropTypes.number,
  posy: PropTypes.number,
  rotation: PropTypes.number,
};
