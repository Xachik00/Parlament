import Register from '../../components/Admin/components/Register';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { fetchSuperAdmin } from '../../store/action/SuperAdmin';
import DeleteText from '../../components/Delete/DeleteText';
import { Header } from '../../components/Header/Header'
import { useState, useEffect, useRef } from 'react'
import axios from '../../axios';
import './SuperAdmin.scss'


const SuperAdmin = () => {

    const dispatch = useAppDispatch()
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,20}$/;
    const { SuperAdmin } = useAppSelector(state => state.SuperAdmin)
    const [removeitem, setRemoveitem] = useState([-1, {}])
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [add, setAdd] = useState(false)
    const [edit, setEdit] = useState(0)
    const [pwd, setPwd] = useState('');
    const errRef: any = useRef();

    useEffect(() => {
        dispatch(fetchSuperAdmin())
    }, [dispatch])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [pwd])


    async function editAdmin(value: string, id: number) {
        if (!pwdFocus && validPwd) {

            const newAdmin = {
                pwd: value
            }
            await axios.put('superAdmin/' + id, newAdmin)
            dispatch(fetchSuperAdmin())
            setEdit(0)
            setPwd('')
        }
    }

    async function deleteAdmin(id: Number, e: any) {
        e.preventDefault()
        await axios.delete('superAdmin/' + id)
        dispatch(fetchSuperAdmin())
    }

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
                                                    <td>{index + 1}</td>
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
                                                    />{pwdFocus && !validPwd && <p id="pwdnote" className={"instructions"}>
                                                        Օգտագործել՝ մեծատառ,փոքրատառ,թիվ և <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                                    </p>}</td>

                                                    <td className='btn'>
                                                        <i className="fa-regular fa-square-check" onClick={() => editAdmin(pwd, el.id)} ></i>
                                                        <i className="fa-solid fa-xmark" onClick={() => setEdit(-1)}></i>
                                                    </td>
                                                </tr>
                                            </> :
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{el.user}</td>
                                                <td>******</td>
                                                <td className='btn'><button onClick={() => setEdit(el.id)}><i className="fa-solid fa-pen"></i></button>
                                                    <button onClick={(e) => setRemoveitem([el.id, e])}><i className="fa-regular fa-trash-can"></i></button></td>
                                            </tr>

                                        }
                                    </tbody>)}
                            <i className="fa-solid fa-plus AddAdmin " onClick={() => setAdd(true)} >   Ավելացնել Ադմին</i>
                        </table>}
            </div>
            {removeitem[0] !== -1 && <DeleteText removeitem={removeitem} setRemoveitem={setRemoveitem} deleteItem={deleteAdmin} />}
        </div >
    )
}

export default SuperAdmin