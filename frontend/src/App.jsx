import { Routes, Route } from "react-router"

// Layouts
import MainLayout from "./layouts/MainLayout.jsx"

// Pages
import Home from "./pages/Home.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import PageNotFound from "./pages/PageNotFound.jsx"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Fallback Route */}
                <Route path="*" element={<PageNotFound />} />
            </Route>
        </Routes>
    )
}

export default App