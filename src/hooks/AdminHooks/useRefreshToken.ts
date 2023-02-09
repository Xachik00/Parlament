import axios from '../../axios/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth }:any = useAuth();
    const {auth}:any=useAuth()
    const refreshToken=auth.refreshToken;
    
    const refresh = async () => {
        const response = await axios.post('/refresh',
        JSON.stringify({ refreshToken}),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );

        setAuth((prev:any) => {
            return {
                ...prev,
                role: response.data.role,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
