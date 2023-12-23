import { fetchData } from "./fetchData";

export const UUIDExists = (UUID, setUUID) => {
  if (UUID) {
    return true;
  }
  setUUID(fetchData("http://localhost:3000/game/unique-random-user-ID"));
  return false;
};
