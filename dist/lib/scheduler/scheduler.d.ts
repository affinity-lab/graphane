export declare class Scheduler {
    private path?;
    static make(interval: string, job: () => void, random?: number): Descriptor;
    private jobs;
    constructor(path?: string | undefined);
    add(interval: string, job: () => void, random?: number): boolean;
    start(delay?: number): void;
    private load;
}
type Descriptor = {
    interval: string;
    job: () => void;
    random?: number;
};
export {};
