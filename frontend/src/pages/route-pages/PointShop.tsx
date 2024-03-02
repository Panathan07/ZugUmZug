import RoadCard from "@components/shop/RoadCard";
import { useColorCards } from "@hooks/useColorCards";
import { LoadingPage } from "@pages/state-pages/LoadingPage";
import "@assets/css/pointshop.css";
import { useUserContext } from "@hooks/useUserContext";

export function PointShop() {
  const [cards, price, buyColorCard] = useColorCards();
  const user = useUserContext();
  const teamId = user.teamId;
  if (cards == null || price == null || teamId == null) return <LoadingPage />;
  return (
    <>
      <section className="road-cards">
        <div className="header">
          <div className="heading">Kartenshop</div>
        </div>
        <div className="content">
          {cards.map((color) => (
            <RoadCard
              key={cards.indexOf(color)}
              price={price}
              color={color}
              buyColorCard={buyColorCard}
              teamId={teamId}
            />
          ))}
        </div>
      </section>
    </>
  );
}
