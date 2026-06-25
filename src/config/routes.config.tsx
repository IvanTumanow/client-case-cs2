import type {Route} from "../shared/types/route.types.ts";

import Home from "@/app/mainLayout/home/page.tsx";
import Auth from "@/app/cleanLayout/auth/page.tsx";
import Profile from "@/app/mainLayout/profile/page.tsx";
import {House, LogIn, UserRound} from "lucide-react";

class routesConfig {
    readonly ROUTES: Record<string, Route> = {
        HOME: {
            title: 'Главная',
            url: '/',
            element: <Home/>,
            titleElement: <House/>
        },

        AUTH: {
            title: 'Вход',
            titleElement: <LogIn/>,
            url: '/auth',
            element: <Auth/>
        },

        PROFILE: {
            title: 'Профиль',
            titleElement: <UserRound/>,
            url: '/profile',
            element: <Profile/>
        }
    } as const
}

export const ROUTES_CONFIG = new routesConfig()