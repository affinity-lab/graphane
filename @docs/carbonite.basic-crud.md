
## BasicCrud

A class that provides basic CRUD (create, read, update, delete) operations for a given entity type that extends Atom. It uses the TypeORM library to perform database operations and the GraphaneError class to handle errors.

### Constructor

```ts
constructor(
    private readonly entity: {new(): Entity} & typeof Atom,
    private readonly dataSourceStorage: Storage<DataSource>,
    private readonly storageKey?: string
);
```

- **entity**: A class that represents the entity type to perform CRUD operations on. It must extend the Atom class and have a primary column named "id".
- **dataSourceStorage**: A storage object that contains the data source for the entity type. It must be an instance of DataSource class that has a connection to the database.
- **storageKey**: An optional string that represents the key to access the data source from the storage object. If not provided, it defaults to "default".

### Methods

```ts
async readAll(options?: FindManyOptions<Entity>): Promise<Entity[]>;
```

A method that returns an array of entities that match the given options. It uses the TypeORM find method to query the database.

- **options**: An object that contains the options for finding entities, such as where, order, skip, take, etc. See [TypeORM documentation](https://typeorm.io/#/find-options) for more details.
- **return**: A promise that resolves to an array of entities, or rejects with an error.

```ts
async readOne(options: FindOneOptions<Entity>): Promise<Entity | undefined>;
```

A method that returns a single entity that matches the given options, or undefined if not found. It uses the TypeORM findOne method to query the database.

- **options**: An object that contains the options for finding a single entity, such as where, order, relations, etc. See [TypeORM documentation](https://typeorm.io/#/find-options) for more details.
- **return**: A promise that resolves to a single entity or undefined, or rejects with an error.

```ts
async readOneOrFail(options: FindOneOptions<Entity>): Promise<Entity>;
```

A method that returns a single entity that matches the given options, or throws an error if not found. It uses the TypeORM findOneOrFail method to query the database and throws a GraphaneError.guard.notFound error if not found.

- **options**: An object that contains the options for finding a single entity, such as where, order, relations, etc. See [TypeORM documentation](https://typeorm.io/#/find-options) for more details.
- **return**: A promise that resolves to a single entity, or rejects with an error.

```ts
async readOneBy(options: FindOptionsWhere<Entity>): Promise<Entity | undefined>;
```

A method that returns a single entity that matches the given where condition, or undefined if not found. It uses the TypeORM findOneBy method to query the database with a simple where condition.

- **options**: An object that contains a simple where condition for finding a single entity, such as id, name, etc.
- **return**: A promise that resolves to a single entity or undefined, or rejects with an error.

```ts
async readOneByOrFail(options: FindOptionsWhere<Entity>): Promise<Entity | undefined>;
```

A method that returns a single entity that matches the given where condition, or throws an error if not found. It uses the TypeORM findOneByOrFail method to query the database with a simple where condition and throws a GraphaneError.guard.notFound error if not found.

- **options**: An object that contains a simple where condition for finding a single entity, such as id, name, etc.
- **return**: A promise that resolves to a single entity or undefined, or rejects with an error.

```ts
async readOneById(id: number): Promise<Entity | undefined>;
```

A method that returns a single entity that has the given id, or undefined if not found. It uses the readOneBy method with an id condition.

- **id**: A number that represents the id of the entity to find. It must be a valid primary key value for the entity type.
- **return**: A promise that resolves to a single entity or undefined, or rejects with an error.

```ts
async readOneByIdOrFail(id: number): Promise<Entity>;
```

A method that returns a single entity that has the given id, or throws an error if not found. It uses the readOneByOrFail method with an id condition.

- **id**: A number that represents the id of the entity to find. It must be a valid primary key value for the entity type.
- **return**: