import { ColorCard } from "@customTypes/colorCards";
import { UseMutationResult } from "@tanstack/react-query";

export default function RoadCard({
  color,
  price,
  buyColorCard,
  teamId,
}: {
  color: ColorCard;
  price: number;
  buyColorCard: UseMutationResult<
    Response,
    Error,
    {
      colorCard: ColorCard;
      teamId: number;
    },
    unknown
  >;
  teamId: number;
}) {
  const onClick = () =>
    buyColorCard.mutate({ colorCard: color, teamId: teamId });
  return (
    <div
      className="card"
      style={{ "--_color": color } as React.CSSProperties}
      onClick={onClick}
    >
      <div
        className="color-field"
        style={{ "--_color": color } as React.CSSProperties}
      ></div>
      <div className="price">{price}</div>
    </div>
  );
}
