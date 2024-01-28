import { renameKeys } from "#utility-functions/renameKeys";
import { json } from "body-parser";

export default class User {
  name: string = "";
  ID: string = "";
  inTeam: boolean = false;
  teamId: number | null = null;

  constructor(name: string, ID: string) {
    this.name = name;
    this.ID = ID;
    this.inTeam = false;
  }
}

export const UserReplaceKeyMap = {
  _name: "name",
  _ID: "ID",
  _inTeam: "inTeam",
};

export const UserProps = {
  name: "name",
  ID: "ID",
  inTeam: "inTeam",
};
