export type Address = {
    name: string;
    email: string;
};
export type MailData = {
    subject: string;
    text: string;
    html: string;
};
export type Email = {
    to: Address;
    from: Address;
    data: MailData;
};
export interface MailService {
    send(emails: Array<Email>): void;
}
export declare class Mailer {
    private service;
    constructor(service: MailService);
    create<T extends Record<string, string | number>>(from: Address, subject: string, text: string, html: string): {
        (data: (Address & T) | Array<Address & T>): void;
        bulk(users: Array<Address>, data: T): void;
    };
}
