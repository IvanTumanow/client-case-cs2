import { useEffect, useState } from "react";
import { SERVER_CONFIG } from "@/config/server.config.ts";
import {type ITotalPaid, type IUser, totalPaidSchema, userSchema} from "@/shared/zod-schemas/user.schemas.ts";
import { toast } from "sonner";
import {api} from "@/lib/axios/axios.ts";
import axios from "axios";

export function useBalanceSSE() {
    const [balance, setBalance] = useState<IUser['balance'] | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const balanceEventSource = new EventSource(`${SERVER_CONFIG.SERVER.VITE_SERVER_URL}/user/me/sse-balance`, { withCredentials: true });

        const handleBalanceUpdate = (event: MessageEvent) => {
            try {
                const balanceFromUserSchema = userSchema.pick({ balance: true });
                const data = JSON.parse(event.data);

                const validation = balanceFromUserSchema.safeParse(data?.data);

                if (!validation.success) setError('Невалидные данные от сервера')
                else setBalance(validation.data.balance);
            } catch (e) {
                console.error('Ошибка парсинга JSON', e);
                setError('Ошибка обработки данных');
            } finally {
                setIsLoading(false);
            }
        };

        balanceEventSource.addEventListener('balance', handleBalanceUpdate);

        balanceEventSource.onerror = (err) => {
            if (balanceEventSource.readyState === EventSource.CONNECTING) {
                toast.warning('Внимание', {
                    description: 'Соединение с балансом потеряно. Браузер пытается переподключиться'
                });

                setIsLoading(true);
            } else {
                console.error("Критическая ошибка EventSource:", err);
                setError('Не удалось установить соединение с сервером');
                setIsLoading(false);
            }
        };

        return () => {
            balanceEventSource.removeEventListener('balance', handleBalanceUpdate);
            balanceEventSource.close();
        };
    }, []);

    return { balance, isLoading, error };
}

interface IDailyPayout {
    success: boolean;
    data?: ITotalPaid
    error?: string
}

export function useDailyPayout() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchBalanceDailyUp = async (): Promise<IDailyPayout> => {
        try {
            setIsLoading(true);

            const res = await api.post(`${SERVER_CONFIG.SERVER.VITE_SERVER_URL}/user/me/balance-up`)

            const validation = totalPaidSchema.safeParse(res.data?.data?.balance);

            if (!validation.success) throw new Error(validation.error.message);
            else return {success: true, data: validation.data};
        }

        catch (e){
            if (axios.isAxiosError(e) && e?.response?.data?.error?.details) {
                return {success: false, error: e?.response?.data?.error?.details.toString()}
            }

            return {success: false, error: e.toString()};
        }

        finally {
            setIsLoading(false);
        }
    }


    const getBalanceDailyUp = () => {
        return fetchBalanceDailyUp()
    }

    return {isLoading, getBalanceDailyUp}
}