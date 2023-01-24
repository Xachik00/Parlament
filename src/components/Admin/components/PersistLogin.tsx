import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../../../hooks/AdminHooks/useRefreshToken';
import useAuth from '../../../hooks/AdminHooks/useAuth';
import useLocalStorage from "../../../hooks/AdminHooks/useLocalStorage";
import Admin from "../../../pages/Admin/Admin";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { auth }:any = useAuth();
    const [persist] = useLocalStorage('persist', true);
    const refresh = useRefreshToken();

    useEffect(():any => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err);
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
        return () => isMounted = false;
    }, [])

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : auth.accessToken ? <div className="adminApp" ><Admin /><Outlet /></div> : <Outlet />
            }
        </>
    )
}

export default PersistLogin