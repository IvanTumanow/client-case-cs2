import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {Input} from "@/components/ui/input"

import type {ComponentProps} from 'react'
import {useForm} from "react-hook-form";
import {type IAuth, type ILogin, loginSchema} from "@/shared/zod-schemas/auth.schemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoaderCircle} from "lucide-react";

interface Props extends ComponentProps<"div"> {
    onSignup?: () => void
    setData: (data: IAuth) => void
    isLoading: boolean
}

export function LoginForm({className, onSignup, setData, isLoading, ...props}: Props) {
    const {register, handleSubmit, formState} = useForm<ILogin>({
        resolver: zodResolver(loginSchema)
    })

    const onHandleSubmit = (data: ILogin) => {
        setData({data, type: "login"})
    };

    return (
        <div className={cn("gap-6 w-sm", className)} {...props}>
            <Card className="overflow-hidden p-0 shadow-[none]">
                <CardContent className="p-0 flex flex-col">
                    <form className="p-6 md:p-8" onSubmit={handleSubmit(onHandleSubmit)}>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">С возвращением</h1>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    {...register('email')}
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    className={cn(formState?.errors?.email ? 'border-(--color-destructive)' : '')}
                                />
                                {
                                    formState?.errors?.email &&
                                    <FieldDescription className={'text-(--color-destructive) text-xs'}>
                                        {formState.errors.email.message}
                                    </FieldDescription>
                                }
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Пароль</FieldLabel>
                                    {/*<a*/}
                                    {/*    href="#"*/}
                                    {/*    className="ml-auto text-sm underline-offset-2 hover:underline"*/}
                                    {/*>*/}
                                    {/*    Forgot your password?*/}
                                    {/*</a>*/}
                                </div>
                                <Input
                                    {...register('password')}
                                    id="password"
                                    type="password"
                                    className={cn(formState?.errors?.email ? 'border-(--color-destructive)' : '')}
                                />
                                {
                                    formState?.errors?.password &&
                                    <FieldDescription className={'text-(--color-destructive) text-xs'}>
                                        {formState.errors.password.message}
                                    </FieldDescription>
                                }
                            </Field>
                            <Field>
                                <Button type="submit">{isLoading ? <LoaderCircle className={'animate-spin'}/> : 'Войти'}</Button>
                            </Field>
                            <Field className="grid grid-cols-3 gap-4">
                            </Field>
                            <FieldDescription className="text-center">
                                Еще нет аккаунта?
                                <Button
                                    type={'button'}
                                    variant={'ghost'}
                                    className={'px-1 hover:bg-transparent'}
                                    onClick={() => {
                                        onSignup?.()
                                    }}
                                >
                                    Зарегистрироваться
                                </Button>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
