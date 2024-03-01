import { RoadColor } from "./roadColor";

export type RoadGroup = {
  startCity: string;
  endCity: string;
  activated: boolean;
  color: string;
  colorType: RoadColor;
  roads: { rotation: number; posx: number; posy: number }[];
};
