import {cn} from "@/lib/utils"
import {Eye, EyeOff} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {type ComponentProps, useState} from "react";

function Input({className, type, ...props}: ComponentProps<"input">) {
    const [showPassword, setShowPassword] = useState(false);
    const typeAtPassword: ComponentProps<"input">['type'] = showPassword ? "text" : "password";

    return (
        <div className={'flex relative'}>
            <input
                type={type !== 'password' ? type : typeAtPassword}
                data-slot="input"
                className={cn(
                    "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
                    className, type === 'password' ? 'pr-8' : ''
                )}
                {...props}
            />

            <Button
                type={'button'}
                variant={'ghost'}
                className={'absolute right-0 top-0 px-0 mx-2 w-fit hover:bg-transparent overflow-hidden'}
                onClick={() => {
                    setShowPassword(!showPassword)
                }}
            >
                {
                    type === 'password' &&
                    <>
                    {
                        showPassword ? <EyeOff/> : <Eye/>
                    }
                    </>
                }
            </Button>
        </div>
    )
}

export {Input}
