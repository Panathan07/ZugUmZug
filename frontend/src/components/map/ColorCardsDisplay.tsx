import { colors } from "@customTypes/colorCards";
import { RoadColor } from "@customTypes/roadColor";
import SmallColorCard from "./SmallColorCard";
import { useTeamData } from "@hooks/useTeamData";
import { useUserContext } from "@hooks/useUserContext";
import { LoadingPage } from "@pages/state-pages/LoadingPage";
import "@assets/css/colorCardDisplay.css";

export default function ColorCardsDisplay({
  style,
  selectedColor,
  onClick,
}: {
  style?: React.CSSProperties;
  selectedColor?: RoadColor;
  onClick?: (color: RoadColor) => void;
}) {
  const [teams] = useTeamData();
  const user = useUserContext();

  if (teams == null || user.teamId == null) {
    return <LoadingPage />;
  }
  const colorCards = teams[user.teamId].colorCards;
  return (
    <ul className="card-list" style={style}>
      {colors.map((color, index) => (
        <li
          className={
            selectedColor != undefined && color === selectedColor
              ? "card-section selected"
              : "card-section"
          }
          key={index}
        >
          <SmallColorCard
            color={color}
            onClick={() => {
              if (onClick == undefined) return;
              onClick(color);
            }}
          />
          <div className="card-amount">{colorCards[color]}</div>
        </li>
      ))}
    </ul>
  );
}
