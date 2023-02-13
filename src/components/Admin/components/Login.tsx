import { useRef, useState, useEffect } from 'react';
import useAuth from '../../../hooks/AdminHooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom';
import useInput from '../../../hooks/AdminHooks/useInput';
import useToggle from '../../../hooks/AdminHooks/useToggle';
import axios from '../../../axios/axios';
import axioss from '../../../axios/index';
import '../Style/Login.scss'

const LOGIN_URL = '/login';

const Login = () => {

    const { setAuth }: any = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const userRef: any = useRef();
    const errRef: any = useRef();
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', true);
    const from = location.state?.from?.pathname || "/Admin";
    const [user, resetUser, userAttribs] = useInput('user', '')

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response: any = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const res = JSON.stringify(response.data)
            localStorage.setItem('response', res);
            localStorage.setItem('token', response.data.accessToken)
            resetUser();
            setPwd('');
            const resp: any = localStorage.getItem('response')
            navigate(from, { replace: true });
            const respons = JSON.parse(resp)
            setAuth(respons);
            
            axioss.interceptors.request.use(function (config: any) {
                    config.headers.Authorization = `Bearer ${response.data.accessToken}`;
                return config;
            });
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('Սերվերից պատասխան չկա');
            } else if (err.response?.status === 400) {
                setErrMsg('Սխալ մուտքանուն կամ գաղտնաբառ');
            } else if (err.response?.status === 401) {
                setErrMsg('Սխալ մուտքանուն կամ գաղտնաբառ');
            } else {
                setErrMsg('Անհաջող մուտք');
            }
            errRef.current.focus();
        }
    }
    return (

        <section className='Login_section'>
            <div className='Login_logo'>
                <div className='Login_gerb'><img src='./images/gerb.png' alt='' /></div>
                <div>
                    <img src='./images/Logo.png' alt='' />
                    <h2>Ազգային Ժողով</h2>
                </div>
            </div>
            <div className='Login_head'>
                <div className='Login_body'>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Մուտք</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            placeholder='Մուտքանուն...'
                            autoComplete="off"
                            {...userAttribs}
                            required
                        />

                        <input
                            type="password"
                            id="password"
                            placeholder='Գաղտնաբառ'
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <div className="persistCheck">

                            <input
                                type="checkbox"
                                id="persist"
                                onChange={toggleCheck}
                                checked={check}
                            />
                            <label htmlFor="persist">Հիշել</label>
                        </div>
                        <button className='button'>Մուտք </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Login
