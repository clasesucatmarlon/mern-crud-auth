import { createContext, useState, useContext } from "react";
import { registerRequest } from "../api/Auth";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within and AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authError, setAuthError] = useState([]);

    const signup = async (user) => {
        try {
            const response = await registerRequest(user);
            // console.log("Respuesta de registro... ", response.data);
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            setAuthError(error.response.data);
        }
    }

    return (
        <AuthContext.Provider value={{ signup, user, isAuthenticated, authError }}>
            {children}
        </AuthContext.Provider>
    )
}