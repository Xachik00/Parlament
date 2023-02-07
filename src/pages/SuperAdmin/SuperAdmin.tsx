import React, { useState } from 'react'
import { Header } from '../../components/Header/Header'
import Register from '../../components/Admin/components/Register';

const SuperAdmin = () => {

    const admin = [
        {
            id: 1,
            login: 'Simonyan'
        },
        {
            id: 2,
            login: 'Simonyan1'
        },
        {
            id: 3,
            login: 'Simonyan2'
        }
    ];
    const [edit, setEdit] = useState(0)
    const [add, setAdd] = useState(false)
    const [value, setValue] = useState('')
    const [removeitem, setRemoveitem] = useState([-1, {}])

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
                    <i className="fa-light fa-users-gear"></i>
                    <h2>Ադմինների Ցուցակ</h2>
                </div>
                <hr />
                {
                    add ? <Register /> :
                        <div>
                            {
                                admin?.map((el, index) =>
                                    edit === el.id ?
                                    <div></div>
                                //     <form onSubmit={handleSubmit}>
                                //     <label htmlFor="username">
                                //         Username:
                                //         {/* <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} /> */}
                                //         {/* <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} /> */}
                                //     </label>
                                //     <input
                                //         type="text"
                                //         id="username"
                                //         onChange={(e) => setUser(e.target.value)}
                                //         value={user}
                                //     />
                                //     <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                                //         {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                                //         4 to 24 characters.<br />
                                //         Must begin with a letter.<br />
                                //         Letters, numbers, underscores, hyphens allowed.
                                //     </p>
            
            
                                //     <label htmlFor="password">
                                //         Password:
                                //         {/* <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} /> */}
                                //         {/* <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} /> */}
                                //     </label>
                                //     <input
                                //         type="password"
                                //         id="password"
                                //         onChange={(e) => setPwd(e.target.value)}
                                //         value={pwd}
                                //         required
                                //         aria-invalid={validPwd ? "false" : "true"}
                                //         aria-describedby="pwdnote"
                                //         onFocus={() => setPwdFocus(true)}
                                //         onBlur={() => setPwdFocus(false)}
                                //     />
                                //     <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                //         {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                                //         8 to 24 characters.<br />
                                //         Must include uppercase and lowercase letters, a number and a special character.<br />
                                //         Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                //     </p>
            
            
                                //     <label htmlFor="confirm_pwd">
                                //         Confirm Password:
                                //         {/* <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} /> */}
                                //         {/* <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} /> */}
                                //     </label>
                                //     <input
                                //         type="password"
                                //         id="confirm_pwd"
                                //         onChange={(e) => setMatchPwd(e.target.value)}
                                //         value={matchPwd}
                                //         required
                                //         aria-invalid={validMatch ? "false" : "true"}
                                //         aria-describedby="confirmnote"
                                //         onFocus={() => setMatchFocus(true)}
                                //         onBlur={() => setMatchFocus(false)}
                                //     />
                                //     <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                //         {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                                //         Must match the first password input field.
                                //     </p>
            
                                //     <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                                // </form> 
                                :
                                        <div>
                                            <p>Ադմին{index + 1}</p>
                                            <p>{el.login}</p>
                                            <button onClick={() => setEdit(el.id)}><i className="fa-solid fa-pen"></i></button>
                                            <button onClick={(e) => setRemoveitem([el.id, e])}><i className="fa-regular fa-trash-can"></i></button>
                                        </div>)
                            }
                            <button onClick={() => setAdd(true)}>Ավելացնել Ադմին</button>
                        </div>
                }
            </div>
        </div>
    )
}

export default SuperAdmin