const fs = require("fs");

class JSONStorage {
    constructor(filePath, storageLayout, entryPoint) {
        this.path = filePath;
        this.storage = storageLayout;
        this.entryPoint = entryPoint;
        this.syncChanges();
    }
    itemExists(item, key = null) {
        key = key == null ? this.entryPoint : key;
        if (this.storage[key].includes(item)) return true;
        return false;
    }
    addItem(item, key = null) {
        key = key == null ? this.entryPoint : key;
        if (this.itemExists(item, key)) return false;
        this.storage[key].push(item);
        this.updateChanges();

    }
    updateChanges() {
        fs.writeFileSync(this.path, JSON.stringify(this.storage))
    }
    syncChanges() {
        this.storage = JSON.parse(fs.readFileSync(this.path))
    }
}

module.exports = JSONStorage;