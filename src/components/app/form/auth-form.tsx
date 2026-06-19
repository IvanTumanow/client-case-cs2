import {cn} from "@/lib/utils.ts"
import {LoginForm} from "@/components/app/form/login-form.tsx";
import {SignupForm} from "@/components/app/form/signup-form.tsx";
import {FieldDescription} from "@/components/ui/field.tsx";
import {Card, CardContent} from "../../ui/card.tsx";
import {type ComponentProps, type CSSProperties, useEffect, useState} from "react";
import type {ClassValue} from "clsx";
import type {IAuth} from "@/shared/zod-schemas/auth.schemas.ts";
import {SERVER_CONFIG} from "@/config/server.config.ts";
import axios from "axios";
import {toast} from "sonner";
import {ERROR_CONFIG} from "@/config/error.config.ts";

export default function AuthForm({className, ...props}: ComponentProps<"div">) {
    const [isLogin, setIsLogin] = useState(true);

    const durationMs: number = 1000

    const durationStyle = {
        '--duration': `${durationMs}ms`,
        '--duration-slow': `${durationMs / 1.2}ms`,
    } as CSSProperties;


    const imageClassname: Record<string, ClassValue> = {
        position: isLogin ? "left-1/2" : "left-0",
        transition: `transition-[left] duration-[var(--duration)] ease-in-out`,
    } as const;

    const loginClassname: Record<string, ClassValue> = {
        transition: `transition-[opacity, translate] duration-[var(--duration-slow)]`,
        opacity: isLogin ? 'opacity-100' : 'opacity-0',
        translate: isLogin ? 'translate-x-0 delay-300' : 'translate-x-1/4 pointer-events-none',
    } as const;

    const signupClassname: Record<string, ClassValue> = {
        transition: `transition-[opacity, translate] duration-[var(--duration-slow)]`,
        opacity: !isLogin ? 'opacity-100' : 'opacity-0',
        translate: !isLogin ? 'translate-x-0 delay-300' : '-translate-x-1/4 pointer-events-none',
    } as const;


    const handleSignUp = () => {
        setIsLogin(false);
    }

    const handleLogin = () => {
        setIsLogin(true)
    }

    const [dataForm, setDataForm] = useState<IAuth | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown>(false);

    const handleSetDataForm = (data: IAuth | null) => {
        setDataForm(() => {
            //отправка данных
            (async function () {
                try {
                    setIsLoading(true);

                    const path = data?.type === 'login' ? 'login' : 'signup';
                    const res = await axios.post(`${SERVER_CONFIG}/auth/${path}`, data?.data)

                    if (res.status !== 200) throw new Error(res.statusText)

                    // сохраняем данные
                }
                catch (err: unknown) {
                    setError(err);
                    toast.error(ERROR_CONFIG.DEFAULT.title, {
                        description: ERROR_CONFIG.DEFAULT.message,
                    })

                    console.error(err);
                }
                finally {
                    setIsLoading(false);
                }
            })()

            return data
        });
    }

    return (
        <div style={durationStyle}
             className={cn("flex flex-col gap-6 justify-center w-full sm:w-fit", className)} {...props}>
            <Card className={'p-0'}>
                <CardContent className="flex flex-row items-center relative h-120">
                    <LoginForm
                        onSignup={handleSignUp}
                        className={cn(loginClassname.transition, loginClassname.opacity, loginClassname.translate)}
                        setData={handleSetDataForm}
                        isLoading={isLoading}
                    />

                    <SignupForm
                        onLogin={handleLogin}
                        className={cn(signupClassname.transition, signupClassname.opacity, signupClassname.translate)}
                        setData={handleSetDataForm}
                        isLoading={isLoading}
                    />

                    <img
                        src="https://i.pinimg.com/originals/a8/1c/37/a81c37182ab0545687f6ae233d4a262d.png"
                        alt="Image"
                        className={
                            cn("absolute top-0 inset-0 h-full w-1/2 rounded-xl object-cover shadow-lg hidden sm:block",
                                imageClassname.position, imageClassname.transition)}
                    />
                </CardContent>
            </Card>

            <FieldDescription className="px-6 text-center text-xs">
                Нажав кнопку продолжить, вы соглашаетесь с нашими условиями<br/><a href="#">пользовательского
                соглашения</a>{" "}
                и <a href="#">политики конфиденциальности</a>
            </FieldDescription>
        </div>
    )
}
