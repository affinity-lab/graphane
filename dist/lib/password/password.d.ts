/// <reference types="node" />
export declare class Password {
    private readonly pepper;
    constructor(pepper: Buffer);
    hash(password: string): Promise<string>;
    verify(hashedPassword: string, enteredPassword: string): Promise<boolean>;
}
