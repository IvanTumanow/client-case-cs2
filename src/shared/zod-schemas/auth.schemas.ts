import {z} from "zod";

const emailField = z.email({ error: 'Введите корректный email' });
const passwordField = z.string().min(8, { error: 'Пароль должен содержать минимум 8 символов' });

const loginSchema = z.object({
    email: emailField,
    password: passwordField
})

const signupSchema = z.object({
    email: emailField,
    password: passwordField,
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    error: 'Пароли должны совпадать',
    path: ['confirmPassword'],
})

type ILogin = z.infer<typeof loginSchema>;
type ISignup = z.infer<typeof signupSchema>;

export {type ILogin, type ISignup, loginSchema, signupSchema};