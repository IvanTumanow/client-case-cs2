import AuthForm from "@/components/app/form/auth-form.tsx";
import {useEffect} from "react";

export default function Auth() {
    useEffect(() => {
        const classnameNoScroll: string = 'no-y-scroll'

        document.body.classList.add(classnameNoScroll);

        return () => {
            document.body.classList.remove(classnameNoScroll);
        };
    }, []);

    return (
        <div className="w-full flex items-center justify-center min-h-svh">
            <div className="w-fit">
                <AuthForm />
            </div>
        </div>
    )
}