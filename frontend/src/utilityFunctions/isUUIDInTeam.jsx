import { UUIDExists } from "./UUIDExists";
import { fetchData } from "./fetchData";

const isUUIDInTeam = (UUID, setUUID) => {
  if (!UUIDExists(UUID, setUUID)) {
    return false;
  }
  let teams = fetchData("http://localhost:3000/teams").teams;
};
