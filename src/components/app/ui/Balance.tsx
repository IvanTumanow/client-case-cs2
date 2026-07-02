import useBalance from "@/hooks/useBalance.hooks.tsx";
import Spinner from "@/components/app/ui/Spinner.tsx";
import {Bitcoin} from "lucide-react";
import {toast} from "sonner";
import {useEffect} from "react";

export default function Balance() {
    const {balance, isLoading, error} = useBalance();

    useEffect(() => {
        if (error) {
            toast.error('Ошибка', {description: error});
        }
    }, [error]);

    if (isLoading) return (<div> <Spinner/> </div>)

    return (
        <div className={'flex flex-row items-center justify-center gap-1'}>
            <span>
                {balance}
            </span>

            <Bitcoin className="w-4! h-4! text-(--color-warning)"/>
        </div>
    )
}