import FailedToMaterializeError from "./failed-to-materialize-error";


interface CachePropertyDescriptor<T, R> extends PropertyDescriptor {
    get?: (this: T) => R;
}

export default function MaterializeIt() {
    return function <T, R>(
        target: any,
        name: PropertyKey,
        descriptor: CachePropertyDescriptor<T, R>
    ): void {
        const getter: ((this: T) => R) | undefined = descriptor.get;
        if (!getter) {
            throw new FailedToMaterializeError("Getter property descriptor expected");
        }
        descriptor.get = function () {
            const value: R = getter.call(this);
            Object.defineProperty(this, name, {
                configurable: descriptor.configurable,
                enumerable: descriptor.enumerable,
                writable: false,
                value
            });
            return value;
        };
    };
}
