import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { fetchMpsnumber } from "../../store/action/NumbersAction";
import useAuth from '../../hooks/AdminHooks/useAuth';
import axios from '../../axios';
import { IMPs } from '../../models/model';
import './StepStyle.scss'
import { ErrorMessage } from '../Error/Error';
import DeleteText from '../Delete/DeleteText';


interface Ibos {
  id: number,
  name: string,
  lastname: string,
  firstname: string,
  phonenumber: string,
  key: boolean
}

export const MPsPage = () => {
  const { auth }: any = useAuth()
  const nobos: IMPs[] = []
  const newsortnobos: string[] = []
  const aybub: string[] = []
  const bos: Ibos[] = []
  const [removeitem, setRemoveitem] = useState([-1, {}])
  const { MPs } = useAppSelector(state => state.Mpsnumber)
  const dispatch = useAppDispatch()
  const [edit, setEdit] = useState<number>(-1)
  const [error, setError] = useState('')
  const [add, setAdd] = useState<boolean>(false)
  const [value, setValue] = useState({
    name: '',
    lastname: '',
    firstname: '',
    phonenumber: '',

  })
  const [addvalue, setAddvalue] = useState<any>({
    name: '',
    lastname: '',
    firstname: '',
    phonenumber: '',
    key: false,
  })
  useEffect(() => {
    dispatch(fetchMpsnumber())
  }, [dispatch])

  const newMOs: any = MPs.filter(item => item.key === true)
  bos.push(...newMOs)

  const newnobos = MPs.filter(item => (item.key) === false)

  const sortnobos = newnobos.sort((a, b) => (a.lastname > b.lastname) ? 1 : -1)
  nobos.push(...sortnobos)

  for (let i = 0; i < nobos.length; i++) {
    aybub.push(nobos[i].lastname[0])

  }

  for (let i = 0; i < aybub.length; i++) {
    if (aybub[i] !== aybub[i + 1]) {
      newsortnobos.push(aybub[i])
    }
  }

  async function Save(id: number) {
    const EditMPs = {
      id, name: value.name, lastname: value.lastname,
      firstname: value.firstname, phonenumber: value.phonenumber,
    }
    await axios.patch('MPs/' + id, EditMPs)
    dispatch(fetchMpsnumber())
    setEdit(-1)
  }

  async function Add(e: React.FormEvent) {
    e.preventDefault()
    setError('');
    if (addvalue.name.trim().length === 0 || addvalue.lastname.trim().length === 0 || addvalue.firstname.trim().length === 0) {
      setError('Անհրաժեշտ է լրացնել');
      return
    }
    const newMPs = {
      name: addvalue.name, lastname: addvalue.lastname,
      firstname: addvalue.firstname, phonenumber: addvalue.phonenumber, key: addvalue.key
    }
    await axios.post('MPs/', newMPs)
    dispatch(fetchMpsnumber())
    setAdd(false)
  }

  async function Delete(id: number, e: any) {
    e.preventDefault()
    await axios.delete('MPs/' + id,)
    dispatch(fetchMpsnumber())
    setAdd(false)
  }


  return (
    <>
      {add ? 
      <form className='form' onSubmit={(e) => Add(e)} >

        <label>Անուն</label>
        <input className='td1' value={addvalue.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAddvalue({
            name: e.target.value, lastname: addvalue.lastname,
            firstname: addvalue.firstname, phonenumber: addvalue.phonenumber, key: false
          })
        }} />
        {error && addvalue.name.trim().length === 0 && <ErrorMessage error={error} />}

        <label>Ազգանուն</label>
        <input className='td1' value={addvalue.lastname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAddvalue({
            name: addvalue.name, lastname: e.target.value,
            firstname: addvalue.firstname, phonenumber: addvalue.phonenumber, key: false
          })
        }} />
        {error && addvalue.lastname.trim().length === 0 && <ErrorMessage error={error} />}

        <label>Հայրանուն</label>
        <input className='td1' value={addvalue.firstname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAddvalue({
            name: addvalue.name, lastname: addvalue.lastname,
            firstname: e.target.value, phonenumber: addvalue.phonenumber, key: false
          })
        }} />
        {error && addvalue.firstname.trim().length === 0 && <ErrorMessage error={error} />}

        <label>Ներքին հեռախոսահամարը</label>
        <input className='td1' type={'tel'} pattern='[0-9]' value={addvalue.phonenumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAddvalue({
            name: addvalue.name, lastname: addvalue.lastname,
            firstname: addvalue.firstname, phonenumber: e.target.value, key: false
          })
        }} />
        <label className='label5' >
          <span className='span'>Նահագահ կամ տեղակալ ?</span>
          <input type='checkbox' className='input' value={addvalue.phonenumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAddvalue({
              name: addvalue.name, lastname: addvalue.lastname,
              firstname: addvalue.firstname, phonenumber: addvalue.phonenumber, key: !addvalue.key
            })
          }} />
        </label>

        <div className='button'>
          <button className='button1' onClick={(e) => Add(e)} >Ավելացնել</button>
          <button className='button2' onClick={() => { setAdd(false); setError('') }}>Չեղարկել</button>
        </div>
      </form> : <>

        <table className='table1'>
          <thead>
            <tr>
              <th className='th1'>Հ․Հ․</th>
              <th className='th2'>Անուն Ազգանուն Հայրանուն</th>
              <th className='th4'>Ներքին  Հեռ․</th>
            </tr>
          </thead>

            {
              bos.map((item, index) =>
                  <tbody>
                <> {edit === item.id ? 
                <tr key={index}>

                  <td>{index + 1}</td>
                  <td><input className='td1_input' value={value.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue({
                      name: e.target.value,
                      lastname: value.lastname, firstname: value.firstname, phonenumber: value.phonenumber
                    })
                  }} />
                    <input className='td1_input gg' value={value.lastname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setValue({
                        name: value.name,
                        lastname: e.target.value, firstname: value.firstname, phonenumber: value.phonenumber,
                      })
                    }} />
                    <input className='td1_input gg' value={value.firstname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setValue({
                        name: value.name,
                        lastname: value.lastname, firstname: e.target.value, phonenumber: value.phonenumber
                      })
                    }} /></td>
                  <td><input className='td1_input' value={value.phonenumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue({
                      name: value.name,
                      lastname: value.lastname, firstname: value.firstname, phonenumber: e.target.value
                    })
                  }} /></td>

                  <button className='save'> <i onClick={() => Save(item.id)} className="fa-regular fa-square-check"></i></button>

                </tr> : <tr key={item.id}>

                  <td className='td1'>{index + 1}</td>
                  <td className='td2'>{item.name} {item.firstname} {item.lastname}</td>
                  <td className='td4'>{item.phonenumber}</td>
                  <td className='button' >{auth.roles && <><button><i onClick={() => {
                    setEdit(item.id); setValue({
                      name: item.name,
                      lastname: item.lastname, firstname: item.firstname, phonenumber: item.phonenumber
                    })
                  }} className="fa-solid fa-pen"></i></button>

                    <button onClick={(e) => setRemoveitem([item.id, e])}><i className="fa-regular fa-trash-can"></i></button></>
                  }</td>
                </tr>
                }
                </>
          </tbody>)
            }
        </table>

        <>
          {
            newsortnobos.map((item: string, index: number) =>
              item !== item + 1 &&
              <div>
                <div>
                  <div className='alfa'> <p>{item}</p></div>
                </div>
                <table className='table0'  key={index} >

                  <>
                    {nobos.map((iteme, index) =>
                      iteme.lastname[0] === item &&
                      <tbody key={index}>
                        {edit === iteme.id ? 
                        <tr >

                          <td className='td1'>{index + 1}</td>
                          <td><input className='td1_input' value={value.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setValue({
                              name: e.target.value,
                              lastname: value.lastname, firstname: value.firstname, phonenumber: value.phonenumber
                            })
                          }} />
                            <input className='td1_input gg' value={value.lastname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setValue({
                                name: value.name,
                                lastname: e.target.value, firstname: value.firstname, phonenumber: value.phonenumber,
                              })
                            }} />
                            <input className='td1_input gg' value={value.firstname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setValue({
                                name: value.name,
                                lastname: value.lastname, firstname: e.target.value, phonenumber: value.phonenumber
                              })
                            }} /></td>
                          <td><input className='td1_input' value={value.phonenumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setValue({
                              name: value.name,
                              lastname: value.lastname, firstname: value.firstname, phonenumber: e.target.value
                            })
                          }} /></td>

                          <button className='save'> <i onClick={() => Save(iteme.id)} className="fa-regular fa-square-check"></i></button>

                        </tr> : <>

                          <tr key={iteme.id}>
                            <td className='td1'>{index + 4}</td>
                            <td className='td2'>{iteme.lastname}  {iteme.name}   {iteme.firstname}</td>
                            <td className='td4'>{iteme.phonenumber}</td>

                            <>  {auth.roles && <td><button onClick={() => {
                              setEdit(iteme.id); setValue({
                                name: iteme.name,
                                lastname: iteme.lastname, firstname: iteme.firstname, phonenumber: iteme.phonenumber
                              })
                            }}><i className="fa-solid fa-pen"></i></button>

                              <button onClick={(e) => {setRemoveitem([iteme.id,e]);e.preventDefault()}}><i className="fa-regular fa-trash-can"></i></button></td>
                            }</>

                          </tr>
                        </>
                        }
                      </tbody>

                    )}

                  </>
                </table>

              </div>
            )
          }
        </>
        {auth.roles && <i onClick={() => {
          setAdd(!add); setAddvalue({
            name: '', lastname: '', firstname: '',
            phonenumber: '', key: false
          })
        }} className="fa-solid fa-plus"></i>}
      </>}
      {removeitem[0] !== -1 && <DeleteText removeitem={removeitem} setRemoveitem={setRemoveitem} deleteItem={Delete} />}

    </>
  )
}