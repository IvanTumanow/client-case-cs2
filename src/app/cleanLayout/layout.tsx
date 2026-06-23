import {Link, Outlet} from "react-router";
import {MoveLeft} from "lucide-react";

export default function CleanLayout(){
    return (
        <>
            <header className={'relative'}>
                <div className={'pl-7 pt-5 inline-flex flex-row gap-1 justify-center items-center group'}>
                    <i className={'opacity-0 transition-all translate-x-3 group-hover:opacity-100 group-hover:translate-x-0'}>
                        <MoveLeft className={'h-4 w-4'}/>
                    </i>

                    <Link to={'/'} className={'text-sm inline-block -translate-x-3 group-hover:translate-x-0 group-hover:scale-103 transition-transform after:content-[""] after:block after:h-[1px] after:w-0 after:bg-[var(--color-foreground)] group-hover:after:w-full after:transition-[width]'}>На главную</Link>
                </div>
            </header>

            <main>
                <Outlet/>
            </main>
        </>
    )
}