import {toast} from "sonner";
import {NOTIFICATION_CONFIG} from "@/config/error.config.ts";
import {ROUTES_CONFIG} from "@/config/routes.config.tsx";
import axios from "axios";
import {Button} from "@/components/ui/button.tsx";
import {useLogout} from "@/hooks/useAuth.hooks.tsx";
import {useNavigate} from "react-router";


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
        }
    }

    return (
        <Button
            type={'button'}
            variant={'destructive'}
            onClick={handleClick}
        >
            Logout
        </Button>
    )
}