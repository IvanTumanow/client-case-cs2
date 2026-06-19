import {ROUTES_CONFIG} from "@/config/routes.config.tsx";
import {Link} from "react-router";
import ThemeSwitcher from "@/components/app/ui/ThemeSwitcher.tsx";

export default function Header() {
    return (
        <header>
            <nav>
                <ul>
                    {
                        ROUTES_CONFIG.HEADER.map((item, index) => (
                            <li
                                key={`header-element-${index}_${item.title}`}
                            >
                                <Link
                                    to={item.url}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))
                    }

                    <li>
                        <ThemeSwitcher/>
                    </li>
                </ul>
            </nav>
        </header>
    )
}