export type NonEmptyArray<TItem> = readonly [TItem, ...TItem[]] | [TItem, ...TItem[]];
export type DerivedClass<T> = new (...a: any[]) => T;
