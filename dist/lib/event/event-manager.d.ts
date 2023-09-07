import { DerivedClass } from "../../util/types";
import { BaseEvent } from "./base-event";
export declare class EventManager {
    private registered;
    register(event: DerivedClass<BaseEvent> | [DerivedClass<BaseEvent>], handler: (event: BaseEvent) => void | Promise<void>): void;
    fire(event: BaseEvent): Promise<any[]>;
}
