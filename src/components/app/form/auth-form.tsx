import {cn} from "@/lib/utils.ts"
import {LoginForm} from "@/components/app/form/login-form.tsx";
import {SignupForm} from "@/components/app/form/signup-form.tsx";
import {FieldDescription} from "@/components/ui/field.tsx";
import {Card, CardContent} from "../../ui/card.tsx";
import {type ComponentProps, type CSSProperties, useEffect, useRef, useState} from "react";
import type {ClassValue} from "clsx";
import type {IAuth} from "@/shared/zod-schemas/auth.schemas.ts";
import {SERVER_CONFIG} from "@/config/server.config.ts";
import axios from "axios";
import {toast} from "sonner";
import {ERROR_CONFIG} from "@/config/error.config.ts";
import type {INotification} from "@/shared/types/error.types.ts";
import {ROUTES_CONFIG} from "@/config/routes.config.tsx";
import {useNavigate} from "react-router";

export default function AuthForm({className, ...props}: ComponentProps<"div">) {
    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);

    const [loginIsSuccess, setLoginIsSuccess] = useState<boolean>(false);
    const [registerIsSuccess, setRegisterIsSuccess] = useState<boolean>(false);

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

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const abortControllerRef = useRef<AbortController | null>(null);
    const cancelAbortController = () => {
        if (abortControllerRef.current) abortControllerRef.current.abort();
    }

    const handleSignUp = () => {
        setIsLogin(false);
        cancelAbortController();
    }

    const handleLogin = () => {
        setIsLogin(true)
        cancelAbortController();
    }

    useEffect(() => {
        return () => {
            cancelAbortController();
        }
    }, [])

    const handleSetDataForm = async (data: IAuth | null) => {
        try {
            setIsLoading(true);

            cancelAbortController();
            abortControllerRef.current = new AbortController();

            if (!data) {
                console.warn('Нет данных для отправки');
                return;
            }

            const path = data.type === 'login' ? 'login' : 'register';
            const res = await axios.post(
                `${SERVER_CONFIG.SERVER.VITE_SERVER_URL}/auth/${path}`,
                data?.data,
                {
                    signal: abortControllerRef.current.signal,
                }
            )

            if (res.status >= 400) throw new Error(res.data)

            const message: Record<IAuth['type'], INotification> = {
                register: {
                    message: 'Регистрация была успешна. Авторизуйтесь для входа в систему',
                    title: 'Регистрация успешна'
                },
                login: {
                    message: 'Вход был успешно выполнен',
                    title: 'Вход выполнен'
                }
            }

            toast.success(message[data.type].title, {
                description: message[data.type].message,
            })

            if (data.type === 'register') {
                setIsLogin(true)
                setRegisterIsSuccess(true);
                setTimeout(() => setRegisterIsSuccess(false), 1000);
            }
            else {
                setLoginIsSuccess(true)
                navigate(ROUTES_CONFIG.ROUTES.HOME.url);
            }
        }
        catch (err: unknown) {
            if (axios.isCancel(err)) return

            if (axios.isAxiosError(err) && err?.response?.data?.error?.details) {
                toast.error(ERROR_CONFIG.DEFAULT.title, {
                    description: err.response.data.error.details,
                })
            } else {
                toast.error(ERROR_CONFIG.DEFAULT.title, {
                    description: ERROR_CONFIG.DEFAULT.message,
                })
            }
        }
        finally {
            abortControllerRef.current = null;
            setIsLoading(false);
        }
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
                        isSuccess={loginIsSuccess}
                    />

                    <SignupForm
                        onLogin={handleLogin}
                        className={cn(signupClassname.transition, signupClassname.opacity, signupClassname.translate)}
                        setData={handleSetDataForm}
                        isLoading={isLoading}
                        isSuccess={registerIsSuccess}
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
