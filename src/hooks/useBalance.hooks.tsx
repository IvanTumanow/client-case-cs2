import { useEffect, useState } from "react";
import { SERVER_CONFIG } from "@/config/server.config.ts";
import {type IUser, userSchema} from "@/shared/zod-schemas/user.schemas.ts";
import { toast } from "sonner";

export default function useBalance() {
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
