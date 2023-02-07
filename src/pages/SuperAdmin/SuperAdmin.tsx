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
        <div>
            <Header />
            <div>
                <div>
                    <h2>Ադմինների Ցուցակ</h2>
                </div>
                <hr />
                {
                    add ? <Register />:
                        <div>
                            {
                                admin?.map((el, index) =>
                                    <div>
                                        <p>Ադմին{index}</p>
                                        <p>{el.login}</p>
                                        <button onClick={() => setEdit(el.id)}><i className="fa-solid fa-pen"></i></button>
                                        <button onClick={(e) => setRemoveitem([el.id, e])}><i className="fa-regular fa-trash-can"></i></button>
                                    </div>)
                            }
                            <button onClick={()=>setAdd(true)}>Ավելացնել Ադմին</button>
                        </div>
                }
            </div>
        </div>
    )
}

export default SuperAdmin