import { Outlet } from "react-router-dom";
import Header from './Header'
import Footer from "./Footer";
export default function Layout(){
    return(
        <div className="app-contenedor min-h-screen flex flex-col justify-between">
            <Header />
            <main className="grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}