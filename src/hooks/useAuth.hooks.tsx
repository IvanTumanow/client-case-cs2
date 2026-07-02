import type {ILogin, ISignup} from "@/shared/zod-schemas/auth.schemas.ts";
import {SERVER_CONFIG} from "@/config/server.config.ts";
import type {RefObject} from "react";
import {api} from "@/lib/axios/axios.ts";

interface Props{
    abortControllerRef?: RefObject<AbortController | null>;
}

export const useLogout = () => {
    const logout = async () => {
        const res = await api.post(`${SERVER_CONFIG.SERVER.VITE_SERVER_URL}/user/me/logout`)

        if (res.status >= 400) throw new Error(res.data)

        return res.data
    }

    return {logout}
}

export default function useAuth({abortControllerRef}: Props){
    const login = async (data: ILogin) => {
        const res = await api.post(
            `${SERVER_CONFIG.SERVER.VITE_SERVER_URL}/auth/login`,
            data,
            {
                signal: abortControllerRef?.current?.signal,
            }
        )

        if (res.status >= 400) throw new Error(res.data)

        return res.data
    }

    const register = async (data: ISignup) => {
        const registerPromise = await api.post(
            `${SERVER_CONFIG.SERVER.VITE_SERVER_URL}/auth/register`,
            data,
            {
                signal: abortControllerRef?.current?.signal,
            }
        )

        if (registerPromise.status >= 400) throw new Error(registerPromise.data)

        const loginRes = await login(data)

        return loginRes.data
    }

    return {register, login}
}