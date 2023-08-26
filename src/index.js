import { existsSync, readFileSync, writeFileSync } from "fs";

/**
 * The JSONStore Database
 */
export default class Jsonstore {
    constructor(path = "database.json") {
        this.filename = path;

        if (!existsSync(this.filename)) writeFileSync(this.filename, "{}")

        this.changed = false;
        this.listeners = [];
    }

    /**
     * Sets an item to a value
     * @param {string} path Path to item
     * @param {any} value Value to be set
     */
    set(path, value) {
        this.changed = true;
        const keys = path.split('/');
        const db = this.#getDb();
        try {
            const currentObj = this.#getObj(keys, db);
            if (keys[keys.length - 1] == "[]" && Array.isArray(currentObj)) currentObj.push(value)
            else currentObj[keys[keys.length - 1]] = value;
            this.#setDb(db);
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * Gets an item from a path
     * @param {string} path Path to the object
     * @returns {any | undefined} Item (undefined if not found)
     */
    get(path) {
        const keys = path.split('/');
        try {
            const currentObj = this.#getObj(keys, this.#getDb());
            if (keys[keys.length - 1] == "[]" && Array.isArray(currentObj)) return currentObj[currentObj.length - 1]
            else return currentObj[keys[keys.length - 1]];
        } catch (err) {
            return undefined
        }
    }

    /**
     * Removes an item
     * @param {string} path Path to item
     */
    remove(path) {
        this.changed = true;
        const keys = path.split('/');
        const db = this.#getDb();
        try {
            const currentObj = this.#getObj(keys, db);
            if (keys[keys.length - 1] == "[]" && Array.isArray(currentObj)) currentObj.pop();
            else currentObj[keys[keys.length - 1]] = undefined;
            if (keys == "") this.#setDb({});
            else this.#setDb(db);
        } catch (err) {
            throw new Error(err);
        }
    }

    /**
     * Listens on a path and calls a callback when something changes
     * @param {string} path Path to listen on
     * @param {Function} callback Callback function to be called when something changes
     * @returns {number} Listener ID
     */
    listen(path, callback) {
        let old = this.get(path);
        const pid = setInterval(() => {
            if (!this.changed) return;
            const newObj = this.get(path);
            this.changed = false;
            if (newObj !== old) callback();
            old = newObj;

        })

        this.listeners.push(pid);
        return pid;
    }

    /**
     * Stops a listener
     * @param {number} pid Listener ID
     */
    clearListener(pid) {
        clearInterval(pid);
    }

    /**
     * Clears all listeners
     */
    clearListeners() {
        this.listeners.forEach(l => clearInterval(l));
    }

    #getObj(keys, obj) {
        let currentObj = obj;

        for (let i = 0; i < keys.length - 1; i++) {
            if (!currentObj[keys[i]]) {
                currentObj[keys[i]] = {};
            }
            currentObj = currentObj[keys[i]];
        }

        return currentObj;
    }

    #getDb() {
        return JSON.parse(readFileSync(this.filename));
    }

    #setDb(db) {
        writeFileSync(this.filename, JSON.stringify(db))
    }
}