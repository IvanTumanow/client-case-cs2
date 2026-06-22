import {envSchema, type IEnv} from "@/shared/zod-schemas/server.schemas.ts";

class serverConfig {
    readonly SERVER: IEnv = {
        VITE_SERVER_URL: ''
    };

    constructor() {
        const validation = envSchema.safeParse(import.meta.env)

        if (!validation.success) {
            console.error('Invalid environment variables:', validation.error);
            return;
        }

        console.log('Environment validation is success')

        this.SERVER.VITE_SERVER_URL = validation.data.VITE_SERVER_URL
    }
}

export const SERVER_CONFIG = new serverConfig();