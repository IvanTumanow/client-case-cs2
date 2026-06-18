import {cn} from "@/lib/utils.ts"
import {LoginForm} from "@/components/app/form/login-form.tsx";
import {SignupForm} from "@/components/app/form/signup-form.tsx";
import {FieldDescription} from "@/components/ui/field.tsx";
import {Card, CardContent} from "../../ui/card.tsx";
import {type ComponentProps, type CSSProperties, useState} from "react";
import type {ClassValue} from "clsx";

export function AuthForm({className, ...props}: ComponentProps<"div">) {
    const [isLogin, setIsLogin] = useState(true);

    const durationMs: number = 700

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

    return (
        <div style={durationStyle} className={cn("flex flex-col gap-6 justify-center h-[550px] w-fit", className)} {...props}>
            <Card className={'p-0'}>
                <CardContent className="flex flex-row items-center relative h-full">
                    <LoginForm onSignup={handleSignUp} className={cn(loginClassname.transition, loginClassname.opacity, loginClassname.translate)}></LoginForm>
                    <SignupForm onLogin={handleLogin} className={cn(signupClassname.transition, signupClassname.opacity, signupClassname.translate)}></SignupForm>

                    <img
                        src="https://i.pinimg.com/originals/a8/1c/37/a81c37182ab0545687f6ae233d4a262d.png"
                        alt="Image"
                        className={
                        cn("absolute top-0 inset-0 h-full w-1/2 rounded-xl object-cover shadow-lg",
                            imageClassname.position, imageClassname.transition)}
                    />
                </CardContent>
            </Card>

            <FieldDescription className="px-6 text-center">
                By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
                and <a href="#">Privacy Policy</a>.
            </FieldDescription>
        </div>
    )
}
