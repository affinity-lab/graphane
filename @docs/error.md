
## error

A function that creates an error object with optional information, message, status and silent properties.

### Parameters

- **info** (optional): An object with additional information about the error.
- **message** (optional): A string with the error message.
- **status** (optional): A number with the HTTP status code of the error. Defaults to `500`.
- **silent** (optional): A boolean indicating whether the error should be logged or not. Defaults to `false`.

### Return

- An error object with the given properties.

### Example

```js
// Create an error object with a message and a status
const err = error({name: "John"}, "User not found", 404);
console.log(err); // {info: {name: "John"}, message: "User not found", status: 404, silent: false}
```

## error.preprocess

A static method of the error function that modifies an object of errors by adding a code and a GraphQLError instance for each function property.

### Parameters

- **errors**: An object of errors with function properties that return an object with optional info, code, message and extensions properties.
- **prefix** (optional): A string to prepend to the code of each error. Defaults to `""`.

### Return

- None. The function modifies the errors object in place.

### Example

```js
// Define an object of errors
const errors = {
	user: {
		notFound: () => ({message: "User not found"}),
		invalidPassword: () => ({message: "Invalid password"})
	},
	post: {
		notFound: () => ({message: "Post not found"})
	}
};

// Preprocess the errors with a prefix
error.preprocess(errors, "app");

// Use the errors as GraphQLErrors
throw errors.user.notFound();
/*
Output:

GraphQLError: APP_USER_NOT_FOUND: User not found
extensions: {
	graphane: {
		info: null,
		code: "APP_USER_NOT_FOUND",
		message: "User not found"
	}
}
*/
```