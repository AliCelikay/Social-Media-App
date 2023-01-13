import { createContext, useEffect, useState } from "react";

// 1)creating Context API
export const DarkModeContext = createContext();

// 2) To use context we need a provider
export const DarkModeContextProvider = ({children}) => {
    // 3)creating darkMode and setDarkMode functions to use in other components
    // if darkMode variable exists in localstorage return the value, or create a variable darkmode and pass it false
    const [darkMode, setDarkMode] = useState(
        // to prevent returning a string in App.js, JSON.parse will allow a return of boolean
        JSON.parse(localStorage.getItem("darkMode")) || false)

    // 4) creating toggle functionality to use in other components
    // this toggle function will allow us to change the theme
    const toggle = () => {
        setDarkMode(!darkMode);
    }

    //useEffect for saving darkMode inside localStorage
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
        // dependancy array, whenever darkMode changes local storage will be set with new value
    }, [darkMode])
    
    // returning provider
    return (
        // 5)anything we pass through in value, we can use in other components
        <DarkModeContext.Provider value={{darkMode, toggle}}>
            {children}
        </DarkModeContext.Provider>
    )
};
