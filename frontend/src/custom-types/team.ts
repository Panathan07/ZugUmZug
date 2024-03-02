import { RoadColor } from "./roadColor";
import { User } from "./user";

export type Team = {
  name: string;
  color: string;
  points: number;
  members: User[];
  tasks: string[]; //TODO: needs to be specified when tasks are done in backend
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
