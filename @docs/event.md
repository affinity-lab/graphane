## EventManager

A class that manages the registration and firing of events.

### Properties

- **registered**: An array of event registrations, each with an event class and a handler function.

### Methods

- **register**: A method that registers a handler function for one or more event classes.
- **fire**: A method that fires an event and invokes all the registered handler functions for that event class.

### Parameters

- **event**: A derived class of BaseEvent or an array of such classes to register the handler for.
- **handler**: A function that takes an event instance as a parameter and returns void or a promise.
- **event**: An instance of BaseEvent to fire.

### Return

- None for the register method.
- An array of promises returned by the handler functions for the fire method.

### Example

```js
// Import the EventManager class and some event classes
import EventManager from "./event-manager";
import UserCreatedEvent from "./user-created-event";
import UserUpdatedEvent from "./user-updated-event";

// Create an instance of EventManager
const eventManager = new EventManager();

// Register a handler function for UserCreatedEvent
eventManager.register(UserCreatedEvent, (event) => {
	console.log("User created:", event.user);
});

// Register a handler function for both UserCreatedEvent and UserUpdatedEvent
eventManager.register([UserCreatedEvent, UserUpdatedEvent], async (event) => {
	await sendEmail(event.user.email, "Welcome to Graphane!");
});

// Fire a UserCreatedEvent
const user = new User("John", "john@example.com");
const userCreatedEvent = new UserCreatedEvent(user);
eventManager.fire(userCreatedEvent);
/*
Output:

User created: John
Email sent to john@example.com
*/
```

---

## EventQueue

A class that creates a queue of events and handles them one by one with a given handler function.

### Properties

- **handling**: A promise that resolves when the current event is handled.
- **handler**: A function that takes an event as a parameter and returns void.

### Methods

- **push**: A method that pushes an event to the queue and handles it after the previous event is handled.

### Parameters

- **handler**: A function that takes an event as a parameter and returns void.
- **event**: An instance of BaseEvent to push to the queue.

### Return

- None.

### Example

```js
// Import the EventQueue class and some event classes
import EventQueue from "./event-queue";
import UserCreatedEvent from "./user-created-event";
import UserUpdatedEvent from "./user-updated-event";

// Define a handler function that logs the event
const handler = (event) => {
	console.log("Handling:", event);
};

// Create an instance of EventQueue with the handler function
const eventQueue = new EventQueue(handler);

// Push some events to the queue
const user1 = new User("Alice", "alice@example.com");
const user2 = new User("Bob", "bob@example.com");
const userCreatedEvent1 = new UserCreatedEvent(user1);
const userCreatedEvent2 = new UserCreatedEvent(user2);
const userUpdatedEvent1 = new UserUpdatedEvent(user1, {name: "Alice Smith"});
eventQueue.push(userCreatedEvent1);
eventQueue.push(userCreatedEvent2);
eventQueue.push(userUpdatedEvent1);
/*
Output:

Handling: UserCreatedEvent {user: User {name: "Alice", email: "alice@example.com"}}
Handling: UserCreatedEvent {user: User {name: "Bob", email: "bob@example.com"}}
Handling: UserUpdatedEvent {user: User {name: "Alice Smith", email: "alice@example.com"}, changes: {name: "Alice Smith"}}
*/
```