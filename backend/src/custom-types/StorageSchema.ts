import User from "#game-components/user";

export type StorageSchema = {
  [key: string]: any;
};

export type SchemaProps = {
  [key: string]: string;
};

export type UserSchema = {
  name: string;
  ID: string;
  inTeam: boolean;
};
