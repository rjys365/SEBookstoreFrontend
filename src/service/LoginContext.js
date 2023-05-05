import { createContext, useReducer } from "react";

export const LoginContext=createContext(null);
export const LoginDispatchContext=createContext(null);

export function LoginProvider({children}){
    const [login,dispatch]=useReducer(loginReducer,initialLogin);
    return (
        <LoginContext.Provider value={login}>
            <LoginDispatchContext.Provider value={dispatch}>
                {children}
            </LoginDispatchContext.Provider>
        </LoginContext.Provider>
    );
}

function loginReducer(login,action){
    switch(action.type){
        case "login":{
            return {
                userId:1,
                token:1,//TODO
            };
        }
        case "logout":{
            return {
                userId:null,
                token:null,
            };
        }
        default:
            return login;
    }
}

const initialLogin={token:null};