import useBalance from "@/hooks/useBalance.hooks.tsx";
import Spinner from "@/components/app/ui/Spinner.tsx";
import {Bitcoin} from "lucide-react";
import axios, {type AxiosError} from "axios";
import {toast} from "sonner";
import {NOTIFICATION_CONFIG} from "@/config/error.config.ts";
import {errorResponseSchema} from "@/shared/zod-schemas/error.schemas.ts";
import {useEffect} from "react";

export default function Balance() {
    const balance = useBalance();

    useEffect(() => {
        if(!balance.isError) return;

        const defaultError = () => {
            toast.error(NOTIFICATION_CONFIG.ERROR.DEFAULT.title, {description: NOTIFICATION_CONFIG.ERROR.DEFAULT.message})
        }

        if (!axios.isAxiosError(balance.error)) {
            defaultError()
        }
        else {
            const validation = errorResponseSchema.safeParse( (balance.error as AxiosError).response?.data )

            if (validation.success && typeof validation.data.error.details === 'string')
                toast.error('Ошибка', {description: validation.data.error.details})

            else {
                console.error('error validation in response error on balance', validation.error)
                defaultError()
            }
        }
    }, [balance.error, balance.isError]);

    if (balance.isLoading) return (<div> <Spinner/> </div>)

    return (
        <div className={'flex flex-row items-center justify-center gap-1'}>
            <span>
                {balance.balance}
            </span>

            <Bitcoin className="w-4! h-4! text-(--color-warning)"/>
        </div>
    )
}