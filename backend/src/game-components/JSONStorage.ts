import { SchemaProps, StorageSchema } from "#customTypes/StorageSchema";
import { IStorage } from "#customTypes/Storage";
import { isEqual } from "#utility-functions/isEqual";

import fs from "fs";
import { renameKeys } from "#utility-functions/renameKeys";

export default class JSONStorage<Schema extends StorageSchema>
  implements IStorage<Schema>
{
  path: string;
  name: string;
  schemaProps: SchemaProps;
  storage: Schema[];
  table: { [key: string]: Schema[] } = {};
  constructor(filePath: string, storageName: string, schemaProps: SchemaProps) {
    this.path = filePath;
    this.name = storageName;
    this.schemaProps = schemaProps;
    this.storage = [];
    this.syncData();
  }

  insert(item: Schema) {
    this.storage.push(item);
    this.syncChanges();
  }
  update(item: Schema) {
    let itemIndex = this.find(item);
    this.storage[itemIndex] = item;
    this.syncChanges();
  }
  delete(item: Schema) {
    item = renameKeys(item, this.schemaProps);
    let itemIndex = this.find(item);
    this.storage.splice(itemIndex, 1);
    this.syncChanges();
  }
  save() {
    this.syncChanges();
  }
  get(item: Schema): Schema | null {
    let itemIndex = this.find(item);
    if (itemIndex === -1) {
      return null;
    }
    return this.storage[itemIndex];
  }
  getByKey(key: string, valueToMatch: any): Schema | null {
    let itemIndex = this.findByKey(key, valueToMatch);
    if (itemIndex === -1) {
      return null;
    }
    return this.storage[itemIndex];
  }
  itemExists(item: Schema): boolean {
    if (this.get(item) == null) return false;
    return true;
  }
  itemWithPropExists(key: string, valueToMatch: any): boolean {
    if (this.getByKey(key, valueToMatch) == null) return false;
    return true;
  }
  find(item: Schema): number {
    let itemIndex = -1;
    this.storage.forEach((storageItem, index) => {
      if (isEqual(item, storageItem)) {
        itemIndex = index;
        return;
      }
    });
    return itemIndex;
  }
  findByKey(key: string, valueToMatch: string): number {
    let resultingIndex = -1;
    this.storage.forEach((item, index) => {
      if ((item[key] as StorageSchema) == null) return;
      if (item[key] === valueToMatch) {
        resultingIndex = index;
      }
    });
    return resultingIndex;
  }
  private syncData() {
    fs.readFile(this.path, "utf8", (err, data) => {
      console.log("got data from storage");
      if (err) throw err;
      if (data == null) {
        this.table = {
          [this.name]: [],
        };
        return;
      }
      this.table = JSON.parse(data);
      this.storage = this.table[Object.keys(this.table)[0]] as Schema[];
    });
  }
  private syncChanges() {
    this.table = {
      [this.name]: this.storage,
    };
    fs.writeFile(this.path, JSON.stringify(this.table), "utf-8", () => {
      console.log("Saved changes");
    });
  }
}
