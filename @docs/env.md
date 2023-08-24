## Env

A class that represents an environment object with various methods to access and validate environment variables.

### Constructor

```js
constructor(
	readonly env: Record<string, any>,
	environment: string | { key: string, default: string } = "PROD",
	public readonly envPostfixMap: Record<string, string | undefined>
)
```

Creates a new Env instance with the given parameters.

- **env**: The environment object to use.
- **environment** (optional): The environment name or an object with a key and a default value to get the environment name from the environment object. Defaults to `"PROD"`.
- **envPostfixMap**: A map of environment names to postfixes that can be used to access optional environment variables with different names for different environments.

### Methods

#### sub

```js
sub(key: string): Env | undefined
```

Returns a sub-environment object with the given key or undefined if the key does not exist or is not an object.

- **key**: The key to access the sub-environment object.
- **return**: The sub-environment object or undefined.

#### string

```js
string(key: string, defaultValue?: string): string
```

Returns a string value for the given key or the default value if the key does not exist. Throws an error if both the key and the default value are undefined.

- **key**: The key to access the string value.
- **defaultValue** (optional): The default value to use if the key does not exist.
- **return**: The string value for the key or the default value.
- **throw**: `GraphaneError` - If both the key and the default value are undefined.

#### path

```js
path(key: string, defaultValue?: string): string
```

Returns a path value for the given key or the default value if the key does not exist. Throws an error if both the key and the default value are undefined. The path value is resolved relative to the current working directory.

- **key**: The key to access the path value.
- **defaultValue** (optional): The default value to use if the key does not exist.
- **return**: The path value for the key or the default value.
- **throw**: `GraphaneError` - If both the key and the default value are undefined.

#### int

```js
int(key: string, defaultValue?: number): number
```

Returns an integer value for the given key or the default value if the key does not exist. Throws an error if both the key and the default value are undefined or if the value is not a valid integer.

- **key**: The key to access the integer value.
- **defaultValue** (optional): The default value to use if the key does not exist.
- **return**: The integer value for the key or the default value.
- **throw**: `GraphaneError` - If both the key and the default value are undefined or if the value is not a valid integer.

#### float

```js
float(key: string, defaultValue?: number): number
```

Returns a floating-point value for the given key or the default value if the key does not exist. Throws an error if both the key and the default value are undefined or if the value is not a valid floating-point number.

- **key**: The key to access the floating-point value.
- **defaultValue** (optional): The default value to use if the key does not exist.
- **return**: The floating-point value for the key or the default value.
- **throw**: `GraphaneError` - If both the key and the default value are undefined or if the value is not a valid floating-point number.

#### boolean

```js
boolean(key: string, defaultValue?: boolean): boolean
```

Returns a boolean value for the given key or the default value if the key does not exist. Throws an error if both the key and the default value are undefined. The boolean value is determined by checking if the lowercased and trimmed string value is one of `"1"`, `"yes"`, or `"true"`.

- **key**: The key to access the boolean value.
- **defaultValue** (optional): The default value to use if the key does not exist.
- **return**: The boolean value for the key or the default value.
- **throw**: `GraphaneError` - If both the key and the default value are undefined.

---

## loadEnvVars

A function that loads environment variables from a file and returns them as an object.

### Parameters

- **file** (optional): The name of the file to load the environment variables from. Defaults to `".env"`. The file can be either a `.env` file or a `.ini` file.

### Return

- An object with the environment variables as key-value pairs.

### Example

```js
// Load environment variables from a .env file
const env = loadEnvVars();
console.log(env.PORT); // 3000

// Load environment variables from a .ini file
const env2 = loadEnvVars("config.ini");
console.log(env2.database.host); // localhost
```

---

## logEnvInfo

A function that logs the environment information to the console using different colors and formats.

### Parameters

- **env**: The Env object to log the information from.

### Return

- None. The function only logs to the console.

### Example

```js
// Create an Env object with some environment variables
const env = new Env({
	PORT: "3000",
	DATABASE_URL: "postgres://user:pass@localhost:5432/db",
	SECRET_KEY: "abc123",
	SECRET_KEY__DEV: "xyz789"
}, "DEV", {
	PROD: "",
	DEV: "__DEV"
});

// Log the environment information
logEnvInfo(env);
/*
Output:

string   DATABASE_URL .. postgres://user:pass@localhost:5432/db
string   PORT ........ 3000
string   SECRET_KEY .. xyz789 (abc123)
*/
```