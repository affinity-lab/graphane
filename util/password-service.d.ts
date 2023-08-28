/// <reference types="node" />
export declare class PasswordService {
    private readonly pepper;
    constructor(pepper: Buffer);
    hashPassword(password: string): Promise<string>;
    verifyPassword(hashedPassword: string, enteredPassword: string): Promise<boolean>;
}
