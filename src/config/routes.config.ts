import type {Route} from "../shared/types/route.types.ts";

import Home from "../app/mainLayout/home/page.tsx";
import Second from "../app/mainLayout/second/page.tsx";
import SignIn from "../app/cleanLayout/sign-in/page.tsx";
import SignUp from "../app/cleanLayout/sign-up/page.tsx";

class routesConfig {
    readonly ROUTES: Record<string, Route> = {
        HOME: {
            title: 'Главная',
            url: '/',
            element: Home
        },
        SECOND: {
            title: 'Вторая',
            url: '/second',
            element: Second
        },

        AUTH: {
            title: 'Авторизация и регистрация',
            url: '/auth',
            element: () => null
        },
        SIGN_IN: {
            title: 'Авторизация',
            url: '/sign-in',
            element: SignIn
        },
        SIGN_UP: {
            title: 'Регистрация',
            url: '/sign-up',
            element: SignUp
        }
    } as const

    readonly HEADER: (typeof this.ROUTES)[keyof typeof this.ROUTES][] = [
        this.ROUTES.HOME,
        this.ROUTES.SECOND,
        {
            ...this.ROUTES.SIGN_UP,
            url: `${this.ROUTES.AUTH.url}${this.ROUTES.SIGN_UP.url}`,
        },
    ]
}

export const ROUTES_CONFIG = new routesConfig()