import {useBalanceSSE} from "@/hooks/useBalance.hooks.tsx";
import Spinner from "@/components/app/ui/Spinner.tsx";

import {toast} from "sonner";
import {useEffect} from "react";
import BalanceCoin from "@/components/app/ui/BalanceCoin.tsx";

export default function Balance() {
    const {balance, isLoading, error} = useBalanceSSE();

    useEffect(() => {
        if (error) {
            toast.error('Ошибка', {description: error});
        }
    }, [error]);

    if (isLoading) return (<div><Spinner/></div>)

    return (
        <div className={'flex flex-row items-center justify-center gap-1'}>
            <span className={'font-semibold shimmer shimmer-color-yellow-400 shimmer-spread-60 shimmer-duration-2000font-bold text-(--color-warning)'}>
                {balance.toLocaleString('ru-RU')}
            </span>

            <BalanceCoin/>
        </div>
    )
}