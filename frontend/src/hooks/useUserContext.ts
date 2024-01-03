import { User } from "@customtypes/user";
import { createContext, useContext } from "react";

export const UserContext = createContext<User>({
  username: "",
  userID: "",
  existed: false,
  inTeam: false,
});

export const useUserContext = (): User => useContext<User>(UserContext);
