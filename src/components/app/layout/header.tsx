import {ROUTES_CONFIG} from "@/config/routes.config.tsx";
import ThemeSwitcher from "@/components/app/ui/ThemeSwitcher.tsx";
import {api} from "@/lib/axios/axios.ts";
import {SERVER_CONFIG} from "@/config/server.config.ts";
import type {Route} from "@/shared/types/route.types.ts";
import {useEffect, useState} from "react";
import {Card, CardContent} from "@/components/ui/card.tsx";
import Spinner from "@/components/app/ui/Spinner.tsx";
import {NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger} from "@/components/ui/navigation-menu";

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
            ROUTES_CONFIG.ROUTES.HOME
        ];

    if (!isAuthenticated) routes.push(ROUTES_CONFIG.ROUTES.AUTH);

    return (
        <header className={'flex flex-row justify-center items-center sticky top-0 w-full py-2'}>
            <NavigationMenu>
                <NavigationMenuList  className={'w-fit flex flex-row justify-center items-center gap-5 bg-background border px-20 rounded-2xl'}>
                    {
                        !loading &&
                        <>
                            {
                                routes.map((item, index) => (
                                    <NavigationMenuItem
                                        key={`header-element-${index}_${item.title}`}
                                    >
                                        <NavigationMenuLink href={item.url} title={item.title}>
                                            {item?.titleElement ? item.titleElement : item.title}
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))
                            }

                            {
                                isAuthenticated &&
                                <>
                                    <NavigationMenuItem>
                                        <NavigationMenuTrigger>
                                            {ROUTES_CONFIG.ROUTES.PROFILE.titleElement ? ROUTES_CONFIG.ROUTES.PROFILE.titleElement : ROUTES_CONFIG.ROUTES.PROFILE.title}
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent className={'min-w-40'}>
                                            <NavigationMenuLink
                                                href={ROUTES_CONFIG.ROUTES.PROFILE.url}
                                                title={ROUTES_CONFIG.ROUTES.PROFILE.title}
                                                className={'w-full'}
                                            >
                                                {ROUTES_CONFIG.ROUTES.PROFILE.title}
                                            </NavigationMenuLink>

                                            <NavigationMenuLink className={'w-full cursor-pointer'} asChild href={'/'}>
                                                <div className="flex flex-col text-sm justify-start items-start">
                                                    <p className="leading-0 font-medium">Баланс</p>
                                                    <p className="line-clamp-2 text-muted-foreground">Пополнить баланс</p>
                                                </div>
                                            </NavigationMenuLink>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                </>
                            }
                        </>
                    }

                    {
                        loading &&
                        <>
                            <NavigationMenuItem>
                                <NavigationMenuLink>
                                    <Spinner/>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </>
                    }
                </NavigationMenuList>
            </NavigationMenu>

            <Card className={'fixed right-0 top-30 w-fit p-1 flex flex-col justify-center items-center rounded-l-full'}>
                <CardContent className={'p-1'}>
                    <ThemeSwitcher></ThemeSwitcher>
                </CardContent>
            </Card>
        </header>
    );
}