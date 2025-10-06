import { Outlet, useLocation } from "react-router"

// Import Components
import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"

function MainLayout() {
    
    const location = useLocation()

    return (
        <>
            <Header currentPath={location.pathname}/>
            <main>
                <Outlet />
            </main>
            <Footer /> 
        </>
    )
}

export default MainLayout