interface CachePropertyDescriptor<T, R> extends PropertyDescriptor {
    get?: (this: T) => R;
}
export default function MaterializeIt(): <T, R>(target: any, name: PropertyKey, descriptor: CachePropertyDescriptor<T, R>) => void;
export {};
