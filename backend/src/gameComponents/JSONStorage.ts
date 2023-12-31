const fs = require("fs");

declare global {
  type JSONStorageLayout = {
    [key: string]:
      | [any]
      | {
          [key: string]: any;
        };
  };
  type JSONStorageItem = string | number | boolean | object | any[];
}

export default class JSONStorage {
  path: string;
  storage: JSONStorageLayout;
  entryPoint: string;
  constructor(
    filePath: string,
    storageLayout: JSONStorageLayout,
    entryPoint: string
  ) {
    this.path = filePath;
    this.storage = storageLayout;
    this.entryPoint = entryPoint;
    this.syncChanges();
  }
  itemExists(item: JSONStorageItem, key: null | string = null) {
    key = key == null ? this.entryPoint : key;
    if (this.storage[key].includes(item)) return true;
    return false;
  }
  addItem(item: JSONStorageItem, key: null | string = null) {
    key = key == null ? this.entryPoint : key;
    if (this.itemExists(item, key)) return false;
    this.storage[key].push(item);
    this.updateChanges();
  }
  updateChanges() {
    fs.writeFileSync(this.path, JSON.stringify(this.storage));
  }
  syncChanges() {
    this.storage = JSON.parse(fs.readFileSync(this.path));
  }
}

module.exports = JSONStorage;
