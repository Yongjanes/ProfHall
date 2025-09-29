import { Routes, Route, Navigate, useNavigate } from "react-router"
import { useEffect } from "react"
import { useAuth } from "./context/AuthContext.jsx"

// Import Pages
import Loading from "./pages/Loading.jsx"
import Home from "./pages/Home.jsx"
import Dashboard from "./pages/Dashboard.jsx"

function App() {
    const { user, loading } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!loading && user) {
            navigate("/me", { replace: true})
        }
    }, [loading, user, navigate])
    
    if (loading) {
        return <Loading />
    }

    return (
        <Routes> 
            {/* Home Page */}
            <Route path="/" element={<Home />} />

            {/* Protected Routes */}
            <Route path="/me" element={ user ? <Dashboard /> : <Navigate to="/" replace />} />

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default App