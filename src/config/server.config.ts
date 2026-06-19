import {envSchema} from "@/shared/zod-schemas/server.schemas.ts";

class serverConfig {
    readonly URL: string = '';

    constructor() {
        const validation = envSchema.safeParse(import.meta.env)

        if (!validation.success) {
            console.error('Invalid environment variables:', validation.error);
            return;
        }

        console.log('Environment validation is success')

        this.URL = validation.data.VITE_SERVER_URL
    }
}

export const SERVER_CONFIG = new serverConfig();