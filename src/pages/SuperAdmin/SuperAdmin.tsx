import { useState, useEffect, useRef } from 'react'
import { Header } from '../../components/Header/Header'
import Register from '../../components/Admin/components/Register';
import './SuperAdmin.scss'
import axios from '../../axios';
import { useAppSelector,useAppDispatch } from '../../hooks/redux';
import { fetchSuperAdmin } from '../../store/action/SuperAdmin';


const SuperAdmin = () => {

    const dispatch=useAppDispatch()
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,20}$/;
    const {SuperAdmin} =useAppSelector(state => state.SuperAdmin)
    const [edit, setEdit] = useState(0)
    const [add, setAdd] = useState(false)
    const [value, setValue] = useState('')
    const [removeitem, setRemoveitem] = useState([-1, {}])
    const errRef: any = useRef();
    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    console.log(SuperAdmin)

    useEffect(() => {
        dispatch(fetchSuperAdmin())
      }, [dispatch])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [pwd, matchPwd])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const v2 = PWD_REGEX.test(pwd);
        if (!v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post('',
                JSON.stringify({ pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            setPwd('');
            setMatchPwd('');
        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }
    // async function editAdmin(value: string[], id: number) {
    //     setErorr(false)
    //     setErorr1(false)
    //     if (value[0].trim() === '' || value[1].trim() === '') {
    //         if (value[0].trim() === '') {
    //             setErorr(true)
    //         }
    //         if (value[1].trim() === '') {
    //             setErorr1(true)
    //         }
    //     } else {
    //         const newCommites = {
    //             title: value[0],
    //             text: value[1]
    //         }
    //         await axios.put('meets/' + id, newCommites)
    //         dispatch(fetchCommittees())
    //         setEdit(0)
    //     }
    // }

    // async function deleteAdmin(id: Number, e: any) {
    //     e.preventDefault()
    //     await axios.delete('meets/' + id)
    //     dispatch(fetchCommittees())
    // }

    // async function addAdmin(title: string, text: string) {
    //     setErorr(false)
    //     setErorr1(false)
    //     if (title.trim() === '' || text.trim() === '') {
    //         if (text.trim() === '') {
    //             setErorr(true)
    //         }
    //         if (title.trim() === '') {
    //             setErorr1(true)
    //         }
    //     } else {
    //         const newCommites = {
    //             title,
    //             text
    //         }
    //         await axios.post('meets/', newCommites)
    //         dispatch(fetchCommittees())
    //         setAdd(false)
    //     }
    // }
    return (
        <div className='SuperAdmin'>
            <Header />
            <div className='SuperAdminBody'>
                <div className='SuperAdmin_title'>
                    <i className="fa-solid fa-users-gear"></i>
                    <h2>Ադմինների Ցուցակ</h2>
                </div>
                <hr />
                {
                    add ? <Register /> :
                        <table>
                            <thead>
                                <th>Հ․Հ․</th>
                                <th>Մուտքանուն</th>
                                <th>Գաղտնաբառ</th>
                                <th>Փոփոխել</th>
                            </thead>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                {
                                    SuperAdmin?.map((el, index) =>
                                    <tbody>
                                        {edit === el.id ?
                                        <>
                                            <tr className='SuperAdmin_edit'>
                                                <td>{index+1}</td>
                                                <td>{el.user}</td>
                                                <td><input
                                                    type="password"
                                                    id="password"
                                                    onChange={(e) => setPwd(e.target.value)}
                                                    value={pwd}
                                                    required
                                                    aria-invalid={validPwd ? "false" : "true"}
                                                    aria-describedby="pwdnote"
                                                    placeholder="Նոր Գաղտնաբառ"
                                                    onFocus={() => setPwdFocus(true)}
                                                    onBlur={() => setPwdFocus(false)}
                                                /></td>
                                               
                                                <td className='btn'><button><i className="fa-regular fa-square-check"></i></button>
                                                <button onClick={() => setEdit(0)} ><i className="fa-solid fa-xmark"></i></button></td>

                                            </tr>
                                             <tr id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                             8 to 24 characters. <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                                </tr>
                                         </>
                                            :

                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{el.user}</td>
                                                <td>******</td>
                                                <td className='btn'><button onClick={() => setEdit(el.id)}><i className="fa-solid fa-pen"></i></button>
                                                <button onClick={(e) => setRemoveitem([el.id, e])}><i className="fa-regular fa-trash-can"></i></button></td>
                                            </tr>
                            
                        }
                        </tbody>)}
        </table>
        }
        <i  className="fa-solid fa-plus AddAdmin " >   Ավելացնել Ադմին</i>
            </div>
            
        </div >
    )
}

export default SuperAdmin