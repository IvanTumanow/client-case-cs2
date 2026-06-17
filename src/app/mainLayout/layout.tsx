import {Outlet} from "react-router";
import Header from "@/components/app/layout/header.tsx";
import Footer from "@/components/app/layout/footer.tsx";

export default function MainLayout(){
    return (
        <>
            <Header/>

            <main>
                <Outlet/>
            </main>

            <Footer/>
        </>
    )
}