import {useBalanceStore} from "@/store/useBalance.store.ts";
import {useEffect} from "react";

export default function useBalance() {
    const store = useBalanceStore((state) => state)

    useEffect(() => {
        (async () => {
            await store.getBalance()
        })()
    }, [])

    return {...store}
}