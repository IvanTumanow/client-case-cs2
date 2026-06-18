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

interface Props extends ComponentProps<"div"> {
    onSignup?: () => void
}

export function LoginForm({className, onSignup, ...props}: Props) {
    return (
        <div className={cn("gap-6 w-sm", className)} {...props}>
            <Card className="overflow-hidden p-0 shadow-[none]">
                <CardContent className="p-0 flex flex-col">
                    <form className="p-6 md:p-8">
                        <FieldGroup>
                            <div className="flex flex-col items-center gap-2 text-center">
                                <h1 className="text-2xl font-bold">Welcome back</h1>
                            </div>
                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    {/*<a*/}
                                    {/*    href="#"*/}
                                    {/*    className="ml-auto text-sm underline-offset-2 hover:underline"*/}
                                    {/*>*/}
                                    {/*    Forgot your password?*/}
                                    {/*</a>*/}
                                </div>
                                <Input id="password" type="password" required/>
                            </Field>
                            <Field>
                                <Button type="submit">Login</Button>
                            </Field>
                            <Field className="grid grid-cols-3 gap-4">
                            </Field>
                            <FieldDescription className="text-center">
                                Don&apos;t have an account?
                                <Button type={'button'} variant={'ghost'} className={'px-1 hover:bg-transparent'} onClick={() => {onSignup?.()}}>Sign up</Button>
                            </FieldDescription>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
