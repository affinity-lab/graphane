import {Formatter} from "./formatter";


export class ResolverDataFormatter extends Formatter {
    format(message: any): string | undefined {
        const data = message.resolverData;
        if (data === undefined) {
            return undefined;
        }
        const obj: Record<string, any> = {
            args: data.args,
            info: data.info,
            context: {
                headers: data.context.request.rawHeaders,
                url: data.context.request.url,
                contextMap: {
                    app: data.context.request.context.get("APPLICATION")?.name,
                    authUser: data.context.request.context.get("AUTHORIZED")?.id
                }
            }
        };
        if (data.root !== undefined) {
            obj.root = {
                type: data.root?.constructor.name,
                id: data.root.id
            };
        }
        if (message.error !== undefined) {
            obj.error = message.error;
        }
        return JSON.stringify(obj);
    };
}
