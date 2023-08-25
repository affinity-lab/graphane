
# Storage

A class that represents a storage of key-value pairs. The class is generic and can store any type of values.

## Constructor

- `defaultKey`: An optional default key to use when getting values without specifying a key.

## Methods

- `set(key, value)`: Sets a value for a given key in the storage.

  - `key`: The key to set the value for.
  - `value`: The value to set for the key.
  - Returns: `void`.

- `get(key)`: Gets a value for a given key or the default key from the storage.

  - `key`: An optional key to get the value for. If not specified, the default key is used.
  - Returns: The value for the key or undefined if the key does not exist in the storage.
  - Throws: `GraphaneError` if no key is specified and the storage does not have a default key.

- `getOrFail(key)`: Gets a value for a given key or the default key from the storage or throws an error if the key does not exist.

  - `key`: An optional key to get the value for. If not specified, the default key is used.
  - Returns: The value for the key.
  - Throws: `GraphaneError` if no key is specified and the storage does not have a default key or if the key does not exist in the storage.

```ts
// Import the class
import Storage from "./storage";

// Create a storage instance with a default key
const storage = new Storage<number>("default");

// Set some values for different keys
storage.set("default", 0);
storage.set("one", 1);
storage.set("two", 2);
storage.set("three", 3);

// Get the value for the default key
console.log(storage.get()); // 0

// Get the value for a specific key
console.log(storage.get("two")); // 2

// Get the value for a non-existing key
console.log(storage.get("four")); // undefined

// Get the value for a non-existing key or throw an error
console.log(storage.getOrFail("four")); // GraphaneError: Storage key (four) not found
```