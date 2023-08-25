export declare type NonEmptyArray<TItem> = readonly [TItem, ...TItem[]] | [TItem, ...TItem[]];
export declare type DerivedClass<T> = new (...a: any[]) => T;
