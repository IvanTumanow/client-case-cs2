import {z} from "zod";

const emailField = z.email({error: 'Поле email некорректно'});
const idField = z.cuid2({error: 'Поле id не соответствует cuid'})

const userSchema = z.object({
    id: idField,
    email: emailField,
    balance: z.number({error: 'Баланс должен быть числовым типом'}),
    lastPayoutDate: z.date({error: 'Поле lastPayoutDate не соответствует полю типа дата'}),
})

const totalPaidSchema = z.object({
    totalPaid: z.number({error: 'Баланс должен быть числовым типом'}),
})

export {userSchema, totalPaidSchema}


type IUser = z.infer<typeof userSchema>
type ITotalPaid = z.infer<typeof totalPaidSchema>

export type {IUser, ITotalPaid}