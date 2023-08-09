export declare class EventQueue {
    private registered;
    register(event: typeof BaseEvent | [typeof BaseEvent], callback: (event: any) => void | Promise<void>): void;
    fire(event: BaseEvent): Promise<any[]>;
}
export declare abstract class BaseEvent {
}
