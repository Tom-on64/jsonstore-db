# JSONStore

---

JSONStore is a simple JSON Database.

It provides the following features:

- Custom File Names
- Array Handling
- Listeners for Real-Time Updates
- Simple API for CRUD Operations

## Getting Started

### Installation

Install JSONStore using npm:

```sh
npm install jsonstore-db
```

### Usage

To get started with JSONStore, follow these steps:

1. **Import JSONStore**

Import the Database class and create an instance of the database with a specified file path.

```js
import Database from "jsonstore-db";

// Create an instance of Database saved in 'file/path.json'
const db = new Database("file/path.json");
```

2. **Read and Write**

You can perform basic read and write operations using the provided methods.

```js
// Write an entry into the database
db.set("foo", "bar");

// Get the 'foo' entry from the database and log it
console.log(db.get("foo")); // Output: 'bar'
```

3. **Array Handling**

JSONStore supports array handling operations like push and pop.

```js
// Push a value to an array
db.set("myArray[]", "new value");

// Pop the last value from the array
db.remove("myArray[]");
```

4. **Listeners**

You can set up listeners to react to changes in the database. Listeners provide real-time updates when data changes.

```js
// Listen to changes in a specific path
const listenerId = db.listen("path/to/listen", () => {
  console.log("Data changed!");
});

// Stop the listener when it's no longer needed
db.clearListener(listenerId);
```

5. **Removing Data**

You can remove data from the database using the remove() method.

```js
// Remove data from a specific path
db.remove("path/to/remove");
```

### Contributing

If you find issues or have suggestions for improvements, feel free to contribute by opening an issue or creating a pull request in the [GitHub repository](https://github.com/Tom-on64/jsonstore-db/issues).

### License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Tom-on64/jsonstore-db/blob/main/LICENSE) file for details.
