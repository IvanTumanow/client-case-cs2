import {ROUTES_CONFIG} from "@/config/routes.config.tsx";
import {Link} from "react-router";
import ThemeSwitcher from "@/components/app/ui/ThemeSwitcher.tsx";
import {api} from "@/lib/axios/axios.ts";
import {SERVER_CONFIG} from "@/config/server.config.ts";
import type {Route} from "@/shared/types/route.types.ts";
import {useEffect, useState} from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";

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

    const routes: Route[] =
        [
            ROUTES_CONFIG.ROUTES.HOME,
            isAuthenticated ? ROUTES_CONFIG.ROUTES.PROFILE : ROUTES_CONFIG.ROUTES.AUTH
        ];

    return (
        <header className={'sticky top-0 w-full py-2'}>
            <nav className={'w-full flex flex-row items-center justify-center'}>
                <ul className={'w-fit flex flex-row justify-center items-center gap-5 bg-background border py-2.5 px-20 rounded-2xl'}>
                    {
                        !loading &&
                        <>
                            {
                                routes.map((item, index) => (
                                    <li
                                        key={`header-element-${index}_${item.title}`}
                                        className={'inline-flex'}
                                    >
                                        <Link to={item.url} title={item.title}>
                                            {item?.titleElement ? item.titleElement : item.title}
                                        </Link>
                                    </li>
                                ))
                            }
                        </>
                    }

                    {
                        loading &&
                        <li>Загрузка...</li>
                    }
                </ul>
            </nav>



            <Card className={'fixed right-0 top-30 w-fit p-1 flex flex-col justify-center items-center rounded-l-full'}>
                <CardContent className={'p-1'}>
                    <ThemeSwitcher></ThemeSwitcher>
                </CardContent>
            </Card>
        </header>
    );
}