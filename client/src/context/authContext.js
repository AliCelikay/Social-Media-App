import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        // checks if there's a user in local storage, and takes string and tranforms it into an object
        JSON.parse(localStorage.getItem("user")) || null)

    const login = async (inputs) => {
        // TO DO
        const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
            // need this when working with cookies
            withCredentials: true,
        });

        setCurrentUser(res.data);
    };

    //used to save user inside of localstorage
    useEffect(() => {
        //data in localstorage will include user info(profile pic, username) therefore will be an object and we must convert into string
        localStorage.setItem("user", JSON.stringify(currentUser));

    }, [currentUser])

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    )
};
