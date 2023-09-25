"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResolverDataFormatter = void 0;
const formatter_1 = require("./formatter");
class ResolverDataFormatter extends formatter_1.Formatter {
    format(message) {
        const data = message.resolverData;
        if (data === undefined) {
            return undefined;
        }
        const obj = {
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
    }
    ;
}
exports.ResolverDataFormatter = ResolverDataFormatter;
