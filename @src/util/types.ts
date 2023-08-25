/**  A type that represents an array that has at least one element. The array can be mutable or immutable. */
export type NonEmptyArray<TItem> = readonly [TItem, ...TItem[]] | [TItem, ...TItem[]];

/** A type that represents a class that extends another class. */
export type DerivedClass<T> = new (...a: any[]) => T;
