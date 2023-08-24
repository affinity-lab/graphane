# Cache

A generic cache class that can store any type of data and fetch it from a given function if not present in the cache.

## Constructor

```typescript
constructor(
    private fetch: (args: any) => any,
    keygen?: (args: any) => string,
    private ttl: number = 60,
    private gc: number = 10
)
```

- `fetch`: A function that takes any arguments and returns the data to be cached. This function is called when the cache does not have the requested data.
- `keygen`: An optional function that takes any arguments and returns a string key to identify the data in the cache. If not provided, a default key generator based on MD5 hashing is used.
- `ttl`: An optional number that specifies the time to live of the cached data in seconds. The default value is 60 seconds.
- `gc`: An optional number that specifies the interval of garbage collection in seconds. The default value is 10 seconds.

## Methods

### get

```typescript
async get(args: Args): Promise<Type | undefined>
```

Returns the cached data for the given arguments, or fetches it from the `fetch` function if not present in the cache. Returns `undefined` if the `fetch` function returns `undefined`.

- `args`: Any arguments to identify the data to be cached or fetched.
- Returns: A promise that resolves to the cached or fetched data, or `undefined`.

### has

```typescript
has(args: Args): boolean
```

Checks if the cache has the data for the given arguments.

- `args`: Any arguments to identify the data to be checked.
- Returns: A boolean value indicating whether the cache has the data or not.

### invalidate

```typescript
invalidate(args: Args): void
```

Removes the cached data for the given arguments from the cache.

- `args`: Any arguments to identify the data to be removed.

### clear

```typescript
clear(): void
```

Clears all the cached data from the cache.