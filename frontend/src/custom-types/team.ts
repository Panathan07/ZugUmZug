import { User } from "./user";

export type Team = {
  name: string;
  color: string;
  points: number;
  members: User[];
  tasks: string[]; //TODO: needs to be specified when tasks are done in backend
  roads: {
    [key: string]: number;
  };
};

export type TeamPostUser = {
  teamName: string;
  teamID: number;
  user: User;
};
