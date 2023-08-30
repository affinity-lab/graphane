"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mailer {
    constructor(service) {
        this.service = service;
    }
    create(from, subject, text, html) {
        const mailer = (data) => {
            const emails = [];
            if (!Array.isArray(data))
                data = [data];
            for (const row of data) {
                const keys = Object.keys(row);
                const email = { subject, text, html };
                for (const key of keys) {
                    email.subject = email.subject.replaceAll(`{{${key.toString()}}}`, row[key].toString());
                    email.text = email.text.replaceAll(`{{${key.toString()}}}`, row[key].toString());
                    email.html = email.html.replaceAll(`{{${key.toString()}}}`, row[key].toString());
                }
                emails.push({ from, to: { name: row.name, email: row.email }, data: email });
            }
            this.service.send(emails);
        };
        mailer.bulk = (users, data) => mailer(users.map(user => { return { ...user, ...data }; }));
        return mailer;
    }
}
exports.default = Mailer;
