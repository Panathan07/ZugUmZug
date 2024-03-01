import { User } from "./user";

export type Team = {
  name: string;
  color: string;
  points: number;
  members: User[];
  tasks: string[];
  boughtRoads: {
    bought: boolean;
    startCity: string;
    endCity: string;
    buyCost: number;
  }[];
};

export type TeamPostUser = {
  teamName: string;
  teamID: number;
  user: User;
};
