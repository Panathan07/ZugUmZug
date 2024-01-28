import { User } from "@customtypes/user";
import { createContext, useContext } from "react";

export const UserContext = createContext<User>({
  name: "",
  ID: "",
  inTeam: false,
  teamId: null,
});

export const useUserContext = (): User => useContext<User>(UserContext);
