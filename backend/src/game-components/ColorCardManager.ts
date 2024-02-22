import { RoadColor } from "#customtypes/RoadColor";
import Team from "./Team";

export default class ColorCardsManager {
  readonly cards: RoadColor[];
  readonly price: number;
  constructor(price: number) {
    this.cards = [
      "red",
      "orange",
      "yellow",
      "pink",
      "green",
      "white",
      "blue",
      "black",
    ];
    this.price = price;
  }

  getCards(): { cards: RoadColor[]; price: number } {
    return { cards: this.cards, price: this.price };
  }

  buyCard(teams: Team[], teamId: number, color: RoadColor): boolean {
    return teams[teamId].buyColorCard(color, this.price);
  }
}
