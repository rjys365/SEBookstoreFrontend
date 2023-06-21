import {createContext, useEffect, useState} from "react";
import {getLocalStorageLogin, setLocalStorageLogin} from "./LoginService";

export const LoginContext = createContext(undefined);

export const LoginProvider = ({children}) => {
    const [login, setLogin] = useState(undefined);
    useEffect(() => {
        const newLogin = getLocalStorageLogin();
        setLogin(newLogin);
    }, []);
    useEffect(() => {
        if(login!==undefined)setLocalStorageLogin(login);
    },[login]);
    return (
        <LoginContext.Provider value={{login,setLogin}} >
            {children}
        </LoginContext.Provider>
    )
}
