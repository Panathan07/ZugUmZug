import { createContext, useContext } from "react";

export type User = {
  username: string;
  userID: string;
  existed: boolean;
  inTeam: boolean;
};

export const UserContext = createContext<User | null>(null);

export const useUserContext = (): User | null =>
  useContext<User | null>(UserContext);
