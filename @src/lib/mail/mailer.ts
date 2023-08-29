type Address = {
	name: string,
	email: string
}
type MailData = {
	subject: string,
	text: string,
	html: string
}
type Email = {
	to: Address,
	from: Address,
	data: MailData
}

interface MailService {
	send(emails: Array<Email>): void;
}

export default class Mailer {
	constructor(private service: MailService) {}
	create<T extends Record<string, string | number>>(from: Address, subject: string, text: string, html: string) {

		const mailer = (data: (Address & T) | Array<Address & T>) => {
			const emails: Array<Email> = [];

			if (!Array.isArray(data)) data = [data];

			for (const row of data) {
				const keys = Object.keys(row) as Array<keyof (Address & T)>;
				const email: MailData = {subject, text, html};
				for (const key of keys) {
					email.subject = email.subject.replaceAll(`{{${key.toString()}}}`, row[key].toString());
					email.text = email.text.replaceAll(`{{${key.toString()}}}`, row[key].toString());
					email.html = email.html.replaceAll(`{{${key.toString()}}}`, row[key].toString());
				}
				emails.push({from, to: {name: row.name, email: row.email}, data: email});
			}

			this.service.send(emails);
		};

		mailer.bulk = (users: Array<Address>, data: T) => mailer(users.map(user => { return {...user, ...data};}));
		return mailer;
	}
}
