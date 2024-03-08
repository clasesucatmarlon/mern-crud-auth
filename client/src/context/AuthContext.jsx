import { useEffect } from "react";
import { createContext, useState, useContext } from "react";
import { loginRequest, registerRequest } from "../api/Auth";

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

    const signin = async (user) => {
        try {
            const response = await loginRequest(user);
            console.log("Respuesta en sigin: ", response)
        } catch (error) {
            console.log("error: ", error)
            setAuthError(error.response.data);
            // if (Array.isArray(error.response.data)) {
            // }
            // setAuthError([error.response.data.message]);
        }
    }

    useEffect( () => {
        if (authError.length > 0) {
            const timer = setTimeout( () => {
                setAuthError([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [authError]);

    return (
        <AuthContext.Provider value={{ signup, signin, user, isAuthenticated, authError }}>
            {children}
        </AuthContext.Provider>
    )
}