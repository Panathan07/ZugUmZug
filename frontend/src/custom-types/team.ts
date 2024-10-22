import { RoadColor } from "./roadColor";
import { User } from "./user";

export type Team = {
  name: string;
  color: string;
  points: number;
  winPoints: number;
  members: User[];
  tasks: string[];
  boughtRoads: {
    bought: boolean;
    startCity: string;
    endCity: string;
    buyCost: number;
  }[];
  colorCards: Record<RoadColor, number>;
};

export type TeamPostUser = {
  teamName: string;
  teamID: number;
  user: User;
};
