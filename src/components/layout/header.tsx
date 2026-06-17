import {ROUTES_CONFIG} from "../../config/routes.config.ts";
import {Link} from "react-router";

export default function Header() {
    return (
        <div>
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
                </ul>
            </nav>
        </div>
    )
}