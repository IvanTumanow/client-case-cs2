import { create } from 'zustand'
import {type ITotalPaid, type IUser, totalPaidSchema, userSchema} from "@/shared/zod-schemas/user.schemas.ts";
import {api} from "@/lib/axios/axios.ts";
import {SERVER_CONFIG} from "@/config/server.config.ts";
import axios from "axios";

type State = {
    isLoading: boolean;
    isError: boolean;
    error?: unknown
}

type StoreData = {
    balance: IUser['balance']
    getBalance: () => Promise<void>
    getDailyPayout: () => Promise<{ totalPaid: ITotalPaid['totalPaid'] | null }>
}

type Store = State & StoreData

const useBalanceStore = create<Store>()((set, get) => ({
    balance: 0,
    isLoading: false,
    isError: false,
    error: null,
    getBalance: async () => {
        try {
            set({isLoading: true})

            const res = await api.get(`${SERVER_CONFIG.SERVER.VITE_SERVER_URL}/user/me?select=balance`)

            const balanceSchema = userSchema.pick({balance: true})
            const validation = balanceSchema.safeParse(res.data?.data?.user)

            if (validation.error) throw new Error('С сервера были переданы некорректные данные')

            const {balance} = validation.data

            set({balance})
        }
        catch(e){
            set({isError: true, error: e})

            if (axios.isAxiosError(e)) console.log('axios error', e);
            else console.log('any error', e)
        }

        finally {
            set({isLoading: false})
        }
    },
    getDailyPayout: async () => {
        try {
            set({isLoading: true})

            const res = await api.post(`${SERVER_CONFIG.SERVER.VITE_SERVER_URL}/user/me/balance-up`)
            console.log('res', res)

            const validation = totalPaidSchema.safeParse(res.data?.data?.balance)

            if (validation.error) throw new Error('С сервера были переданы некорректные данные')

            const {totalPaid} = validation.data

            await get().getBalance()

            return {
                totalPaid,
            }
        }
        catch (e) {
            set({isError: true, error: e})
            if (axios.isAxiosError(e)) console.log('axios error', e);
            else console.log('any error', e)

            return {
                totalPaid: null,
            }
        }
        finally {
            set({isLoading: false})
        }
    }
}))

export {useBalanceStore}