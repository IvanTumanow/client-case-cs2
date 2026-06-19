import type {Route} from "../shared/types/route.types.ts";

import Home from "@/app/mainLayout/home/page.tsx";
import Auth from "@/app/cleanLayout/auth/page.tsx";

class routesConfig {
    readonly ROUTES: Record<string, Route> = {
        HOME: {
            title: 'Главная',
            url: '/',
            element: <Home/>
        },

        AUTH: {
            title: 'Авторизация и регистрация',
            url: '/auth',
            element: <Auth/>
        },
    } as const

    readonly HEADER: (typeof this.ROUTES)[keyof typeof this.ROUTES][] = [
        this.ROUTES.HOME,
        this.ROUTES.AUTH,
    ]
}

export const ROUTES_CONFIG = new routesConfig()