import { createContext, useState, useEffect, useContext } from "react"
import axios from "axios"

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user , setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("/api/v1/users/refresh", { withCredentials: true })
                setUser(res.data.user)
            } catch (error) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading}}>
            { children }
        </AuthContext.Provider>
    )

}

export function useAuth() {
    return useContext(AuthContext)
}