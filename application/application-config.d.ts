import Env from "../env/env";
export default function applicationConfig(env: Env, code?: string): {
    app: {
        id: string;
        code: string;
        secret: string;
        name: string;
    };
};
