import { useRef, useState, useEffect } from "react";
import axios from '../../../axios';
import { useNavigate } from "react-router-dom";
import '../Style/Register.scss'
const USER_REGEX = /^[A-z][A-z0-9-_]{4,20}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,20}$/;
const REGISTER_URL = '/superAdmin';

const Register = () => {

    const navigate = useNavigate()
    const [matchFocus, setMatchFocus] = useState(false);
    const [validMatch, setValidMatch] = useState(false);
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [matchPwd, setMatchPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const userRef: any = useRef();
    const errRef: any = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Անվավեր մուտք");
            return;
        }
        try {
             await axios.post(REGISTER_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setUser('');
            setPwd('');
            setMatchPwd('');
            navigate(0)
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('Սերվերից պատասխան չկա');
            } else if (err.response?.status === 409) {
                setErrMsg('Մուտքանունը զբաղած է');
            } else {
                setErrMsg('Գրանցումը խաբանվեց')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            <section className="Register_page">
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Գրանցել նոր ադմինիստրատոր</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Մուտքանուն
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                    />
                    {userFocus && user && !validName &&
                    <p className="erorrValidate">
                        Դաշտը պետք է պարունակի 5-ից 20 նիշ<br />
                        Բացառությամբ նմանատիպ նիշերից՝ ! @ # $ %․․․
                    </p>
                    }
                    <label htmlFor="password">
                        Գաղտնաբառ
                    </label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                    />
                    {pwdFocus && !validPwd &&
                    <p className="erorrValidate">
                        Դաշտը պետք է պարունակի 5-ից 20 նիշ,<br />
                        մեծատառ, փոքրատառ, թիվ և հետևյալ նիշերից՝ ! @ # $ %
                    </p>}
                    <label htmlFor="confirm_pwd">
                        Կրկնել գաղտնաբառը
                    </label>
                    <input
                        type="password"
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-invalid={validMatch ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                    />
                    {matchFocus && !validMatch && 
                    <p className="erorrValidate">
                        Գաղտնաբառը չի համընկնում!
                    </p>
                    }
                    <div className="buts">
                        <button disabled={!validName || !validPwd || !validMatch ? true : false} onClick={handleSubmit} >Հաստատել</button>
                        <button onClick={() => navigate(0)}> Չեղարկել</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register
