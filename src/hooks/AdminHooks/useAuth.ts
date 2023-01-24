import { useContext, useDebugValue } from "react";
import AuthContext from "../../components/Admin/context/AuthProvider";

const useAuth = () => {
    const { auth }:any = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;