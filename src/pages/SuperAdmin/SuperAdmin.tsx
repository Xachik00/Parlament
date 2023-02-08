import { useState, useEffect, useRef } from 'react'
import { Header } from '../../components/Header/Header'
import Register from '../../components/Admin/components/Register';
import './SuperAdmin.scss'
import axios from '../../axios';
import { useAppSelector,useAppDispatch } from '../../hooks/redux';
import { fetchSuperAdmin } from '../../store/action/SuperAdmin';
import DeleteText from '../../components/Delete/DeleteText';


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
    // const [matchPwd, setMatchPwd] = useState('');
    // const [validMatch, setValidMatch] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    console.log(SuperAdmin)

    useEffect(() => {
        dispatch(fetchSuperAdmin())
      }, [dispatch])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    useEffect(() => {
        setErrMsg('');
    }, [pwd])

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
    async function editAdmin(value: string, id: number) {
        if (!pwdFocus && validPwd) {
            const newAdmin = {
                pwd:value
            }
            await axios.put('superAdmin/' + id, newAdmin)
            dispatch(fetchSuperAdmin())
            setEdit(0)
        }
    }

    async function deleteAdmin(id: Number, e: any) {
        e.preventDefault()
        await axios.delete('superAdmin/' + id)
        dispatch(fetchSuperAdmin())
    }

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
                                                />{pwdFocus && !validPwd && <p id="pwdnote" className={ "instructions" }>
                                                 <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                                   </p>}</td>
                                               
                                                <td className='btn'>
                                                    <i className="fa-regular fa-square-check" onClick={()=>editAdmin(pwd,el.id)} ></i>
                                                    <i className="fa-solid fa-xmark" onClick={()=>setEdit(-1)}></i>
                                                    </td>

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
                        <i  className="fa-solid fa-plus AddAdmin " onClick={()=>setAdd(true)} >   Ավելացնել Ադմին</i>
        </table>
        }
            </div>
            {removeitem[0]!==-1 && <DeleteText removeitem={removeitem} setRemoveitem={setRemoveitem} deleteItem={deleteAdmin} />}
        </div >
    )
}

export default SuperAdmin