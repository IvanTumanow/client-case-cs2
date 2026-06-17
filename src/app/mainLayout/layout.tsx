import {Outlet} from "react-router";
import Header from "../../components/layout/header.tsx";
import Footer from "../../components/layout/footer.tsx";

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