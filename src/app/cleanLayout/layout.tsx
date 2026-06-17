import {Link, Outlet} from "react-router";

export default function CleanLayout(){
    return (
        <>
            <Link to={'/'}>На главную</Link>

            <main>
                <Outlet/>
            </main>
        </>
    )
}