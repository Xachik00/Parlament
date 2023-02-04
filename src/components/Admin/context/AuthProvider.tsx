import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }:any) => {
    const [auth, setAuth] = useState({});

    useEffect(()=>{ if(localStorage.getItem('response')){
        const res:any=localStorage.getItem('response');
        const response=JSON.parse(res)
        setAuth(response)
    }},[])

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;