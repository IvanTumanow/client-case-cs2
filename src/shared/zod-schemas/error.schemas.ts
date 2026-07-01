import {z} from "zod";

const errorResponseSchema = z.object({
    success: z.boolean({error: 'Поле success должно быть булевым значением'}),
    error: z.object({
        details: z.unknown().optional(),
    }).loose()
})

type IErrorResponse = z.infer<typeof errorResponseSchema>

export {errorResponseSchema}

export type {IErrorResponse}