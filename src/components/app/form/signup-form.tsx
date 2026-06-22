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
import {type ComponentProps, useEffect} from "react";
import {type IAuth, type ISignup, signupSchema} from "@/shared/zod-schemas/auth.schemas.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoaderCircle} from "lucide-react";

interface Props extends ComponentProps<"div"> {
    onLogin?: () => void
    setData: (data: IAuth) => void
    isLoading: boolean
    isSuccess: boolean
}

export function SignupForm({className, onLogin, setData, isLoading, isSuccess, ...props}: Props) {
    const {register, handleSubmit, formState, reset} = useForm<ISignup>({
        resolver: zodResolver(signupSchema)
    })

    const onHandleSubmit = (data: ISignup) => {
        setData({data, type: "register"})
    };

    useEffect(() => {
        if (isSuccess) {
            reset();
        }
    }, [isSuccess, reset]);

    return (
        <div className={cn("gap-6 w-sm", className)} {...props}>
            <Card className="overflow-hidden p-0 shadow-[none]">
                <CardContent className="p-0 flex flex-col">
                    <form className="p-6 md:p-8" onSubmit={handleSubmit(onHandleSubmit)}>
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Добро пожаловать</h1>

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
                            <Field className={'gap-4'}>
                                <Field className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="password">Пароль</FieldLabel>
                                        <Input
                                            {...register('password')}
                                            id="password"
                                            type="password"
                                            className={cn(formState?.errors?.password ? 'border-(--color-destructive)' : '')}
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="confirm-password">
                                            Подтвердите пароль
                                        </FieldLabel>
                                        <Input
                                            {...register('confirmPassword')}
                                            id="confirm-password"
                                            type="password"
                                            className={cn(formState?.errors?.confirmPassword ? 'border-(--color-destructive)' : '')}
                                        />
                                    </Field>
                                </Field>
                                {
                                    (formState?.errors?.password || formState?.errors?.confirmPassword) &&
                                    <FieldDescription className={'text-(--color-destructive) text-xs flex flex-col gap-0.5'}>
                                        <span>
                                            {formState?.errors?.password?.message}
                                        </span>

                                        <span>
                                            {formState?.errors?.confirmPassword?.message}
                                        </span>
                                    </FieldDescription>
                                }
                            </Field>
                            <Field>
                                <Button type="submit" disabled={isLoading}>{isLoading ? <LoaderCircle className={'animate-spin'}/> : 'Зарегистрироваться'}</Button>
                            </Field>
                            <Field className="grid grid-cols-3 gap-4">
                            </Field>
                            <FieldDescription className="text-center">
                                Уже есть аккаунт? <Button type={'button'} variant={'ghost'}
                                                          className={'px-1 hover:bg-transparent'} onClick={() => {
                                onLogin?.()
                            }}>Войти</Button>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
