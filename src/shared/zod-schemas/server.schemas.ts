import {z} from "zod";

const envSchema = z.object({
    VITE_SERVER_URL: z.coerce.string()
})

type IEnv = z.infer<typeof envSchema>

export {envSchema}
export type {IEnv}