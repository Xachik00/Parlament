import axios from '../../axios/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth }: any = useAuth();
    const { auth }: any = useAuth()

    const refresh = async () => {
        if (auth.refreshToken) {
            const response = await axios.post('/refresh', { refreshToken: auth?.refreshToken });

            setAuth((prev: any) => {
                return {
                    ...prev,
                    role: response.data.role,
                    accessToken: response.data.accessToken
                }
            });
            return response.data.accessToken;
        }
    }
    return refresh;
};

export default useRefreshToken;
