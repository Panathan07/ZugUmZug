import User from "#game-components/User";

export interface IStorage<Schema> {
  name: string;
  insert: (item: Schema) => void;
  update: (item: Schema) => void;
  delete: (item: Schema) => void;
  save: () => void;
  get: (item: Schema) => Schema | null;
  getByKey: (key: string, valueToMatch: any) => Schema | null;
  itemExists: (item: Schema) => boolean;
  itemWithPropExists: (key: string, valueToMatch: any) => boolean;
}

export type UserStorage = IStorage<User>;
