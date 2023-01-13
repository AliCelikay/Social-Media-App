import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(
        // checks if there's a user in local storage, and takes string and tranforms it into an object
        JSON.parse(localStorage.getItem("user")) || null)

    const login = () => {
        // TO DO
    }

    //used to save user inside of localstorage
    useEffect(() => {
        //data in localstorage will include user info(profile pic, username) therefore will be an object and we must convert into string
        localStorage.setItem("user", JSON.stringify(currentUser));
        
    }, [currentUser])
    
    return (
        <AuthContext.Provider value={{currentUser, login}}>
            {children}
        </AuthContext.Provider>
    )
};
