import { useRef, useState, useEffect } from 'react';
import useAuth from '../../../hooks/AdminHooks/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useInput from '../../../hooks/AdminHooks/useInput';
import useToggle from '../../../hooks/AdminHooks/useToggle';

import axios from '../../../axios/axios';
import '../Style/Login.scss'
const LOGIN_URL = '/auth';

const Login = () => {

    const { setAuth }:any = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/Admin";
    const userRef:any = useRef();
    const errRef:any = useRef();
    const [user, resetUser, userAttribs] = useInput('user', '')
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [check, toggleCheck] = useToggle('persist', true);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            resetUser();
            setPwd('');
            navigate(from, { replace: true });
        } catch (err : any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Սխալ մուտքանուն կամ գախնաբառ');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }
    return (

        <section className='Login_section'>
            <div className='Login_logo'>
                <div className='Login_gerb'><img src='./images/gerb.png' /></div>
                <div>
                    <img  src='./images/Logo.png' />
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
