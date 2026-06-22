import {ROUTES_CONFIG} from "@/config/routes.config.tsx";
import {Link} from "react-router";
import ThemeSwitcher from "@/components/app/ui/ThemeSwitcher.tsx";
import {api} from "@/lib/axios/axios.ts";
import {SERVER_CONFIG} from "@/config/server.config.ts";
import type {Route} from "@/shared/types/route.types.ts";
import {useEffect, useState} from "react";

export default function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkUser = async () => {
            try {
                await api.get(`${SERVER_CONFIG.SERVER.VITE_SERVER_URL}/user/me`);
                setIsAuthenticated(true);
            } catch {
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        checkUser();
    }, []);

    const getRoutes = (): Route[] => {
        const baseRoutes = [...ROUTES_CONFIG.HEADER];

        if (isAuthenticated) baseRoutes.push(ROUTES_CONFIG.ROUTES.PROFILE);
        else baseRoutes.push(ROUTES_CONFIG.ROUTES.AUTH);

        return baseRoutes;
    };

    const routes = getRoutes();

    return (
        <header>
            <nav>
                <ul>
                    {
                        !loading &&
                        <>
                            {routes.map((item, index) => (
                                <li key={`header-element-${index}_${item.title}`}>
                                    <Link to={item.url}>
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <ThemeSwitcher/>
                            </li>
                        </>
                    }

                    {
                        loading &&
                        <li>Загрузка...</li>
                    }
                </ul>
            </nav>
        </header>
    );
}