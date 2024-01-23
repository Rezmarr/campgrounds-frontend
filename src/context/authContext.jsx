import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (inputs) => {
        const res = await axios.post("https://campground-api-ci-cd.azurewebsites.net/api/auth", inputs, {
            withCredentials: true
        });

        setCurrentUser(res.data);
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    const updateUserData = (updatedUserData) => {
        setCurrentUser(updatedUserData); // Actualiza el estado currentUser
        localStorage.setItem("user", JSON.stringify(updatedUserData)); // Actualiza localStorage
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, updateUserData }}>
            {children}
        </AuthContext.Provider>
    )
}
