import {toast} from "sonner";
import {NOTIFICATION_CONFIG} from "@/config/error.config.ts";
import {ROUTES_CONFIG} from "@/config/routes.config.tsx";
import axios from "axios";
import {Button} from "@/components/ui/button.tsx";
import {useLogout} from "@/hooks/useAuth.hooks.tsx";
import {useNavigate} from "react-router";
import {LogOut} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";


export default function LogoutButton() {
    const {logout} = useLogout()
    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            await logout()

            toast.success(NOTIFICATION_CONFIG.SUCCESS.LOGOUT.title, {
                description: NOTIFICATION_CONFIG.SUCCESS.LOGOUT.message,
            })

            navigate(ROUTES_CONFIG.ROUTES.AUTH.url)
        }

        catch (err) {
            if (axios.isAxiosError(err) && err?.response?.data?.error?.details)
                console.log(err.response.data.error.details)


            console.log(err)
        }
    }

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        type={'button'}
                        variant={'destructive'}
                        className={'flex-row items-center justify-center gap-2 px-5'}
                    >
                        Выйти <i className={'flex justify-center items-center'}> <LogOut/> </i>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent size={'sm'}>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Вы действительно хотите выйти?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction onClick={handleClick}>Продолжить</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}