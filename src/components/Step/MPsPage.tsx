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
  firstname: string,
  lastname: string,
  surname: string,
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
    firstname: '',
    lastname: '',
    surname: '',
    phonenumber: '',

  })
  const [addvalue, setAddvalue] = useState({
    firstname: '',
    lastname: '',
    surname: '',
    phonenumber: '',
    key: false,
  })

  const [erorrdiv, setErrordiv] = useState(false)
  const [erorrdiv1, setErrordiv1] = useState(false)
  const [erorrdiv2, setErrordiv2] = useState(false)
  const [erorrdiv3, setErrordiv3] = useState(false)
  
  useEffect(() => {
    dispatch(fetchMpsnumber())
  }, [dispatch])

  const newMOs: any = MPs.filter(item => item.key === true)
  bos.push(...newMOs)

  const newnobos = MPs.filter(item => item.key === false)

  const sortnobos = newnobos.sort((a, b) => (a.lastname.toUpperCase() > b.lastname.toUpperCase()) ? 1 : -1)
  nobos.push(...sortnobos)
  
  for (let i = 0; i < nobos.length; i++) {
    aybub.push(nobos[i].lastname[0].toUpperCase())
  }
  

  for (let i = 0; i < aybub.length; i++) {
    if (aybub[i] !== aybub[i + 1]) {
      newsortnobos.push(aybub[i])
    }
  }

  async function Save(id: number) {
    if(value.firstname===''){
      setErrordiv(true)
    }
    if(value.lastname===''){
      setErrordiv1(true)
    }
    if(value.surname===''){
      setErrordiv2(true)
    }
    if(value.phonenumber===''){
      setErrordiv3(true)
    }else{
    const EditMPs = {
       firstname: value.firstname, lastname: value.lastname,
      surname: value.surname, phonenumber: value.phonenumber,
    }
    await axios.put('parlament/' + id, EditMPs)
    dispatch(fetchMpsnumber())
    setEdit(-1)
  }}

  async function Add(e: React.FormEvent) {
    e.preventDefault()
    setError('');
    if (addvalue.firstname.trim().length === 0 || addvalue.lastname.trim().length === 0 || addvalue.surname.trim().length === 0) {
      setError('Անհրաժեշտ է լրացնել');
      return
    }else if(addvalue.phonenumber===''){
      
      const newMPs = {
        firstname: addvalue.firstname, lastname: addvalue.lastname,
        surname: addvalue.surname,  key: addvalue.key
      }
      await axios.post('parlament/', newMPs)
    }else{
      
      const newMPs = {
      firstname: addvalue.firstname, lastname: addvalue.lastname,
      surname: addvalue.surname, phonenumber: addvalue.phonenumber, key: addvalue.key
    }
    await axios.post('parlament/', newMPs)
    }
    dispatch(fetchMpsnumber())
    setAdd(false)
  }

  async function Delete(id: number, e: React.FormEvent) {
    e.preventDefault()
    await axios.delete('parlament/' + id,)
    dispatch(fetchMpsnumber())
    setAdd(false)
  }


  return (
    <>
      {add ? <form className='form' onSubmit={(e) => Add(e)} >
        <label>Անուն</label>
        <input className='td1' maxLength={20} value={addvalue.firstname} onChange={(e: any) => {
          setAddvalue({
            firstname: e.target.value, lastname: addvalue.lastname,
            surname: addvalue.surname, phonenumber: addvalue.phonenumber, key: addvalue.key
          })
        }} />
        {error && addvalue.firstname.trim().length === 0 && <ErrorMessage error={error} />}
        <label>Ազգանուն</label>
        <input className='td1' maxLength={20} value={addvalue.lastname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAddvalue({
            firstname: addvalue.firstname, lastname: e.target.value,
            surname: addvalue.surname, phonenumber: addvalue.phonenumber, key: addvalue.key
          })
        }} />
        {error && addvalue.lastname.trim().length === 0 && <ErrorMessage error={error} />}
        <label>Հայրանուն</label>
        <input className='td1'maxLength={20} value={addvalue.surname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAddvalue({
            firstname: addvalue.firstname, lastname: addvalue.lastname,
            surname: e.target.value, phonenumber: addvalue.phonenumber, key: addvalue.key
          })
        }} />
        {error && addvalue.surname.trim().length === 0 && <ErrorMessage error={error} />}
        <label>Ներքին հեռախոսահամարը</label>
        <input className='td1' maxLength={8} type={'tel'} pattern='[0-9]' value={addvalue.phonenumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAddvalue({
            firstname: addvalue.firstname, lastname: addvalue.lastname,
            surname: addvalue.surname, phonenumber: e.target.value, key: addvalue.key
          })
        }} />
        <label className='label5' >
          <span className='span'>Նահագահ կամ տեղակալ ?</span>
          <input type='checkbox' className='input'  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAddvalue({
              firstname: addvalue.firstname, lastname: addvalue.lastname,
              surname: addvalue.surname, phonenumber: addvalue.phonenumber, key: !addvalue.key
            });
            
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
            {bos.map((item, index) =>
                <tbody key={index}>
                <>{edit === item.id ? <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input className={erorrdiv ? 'td1_input errordiv' : 'td1_input'} maxLength={20} value={value.firstname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setValue({
                        firstname: e.target.value,
                        lastname: value.lastname, surname: value.surname, phonenumber: value.phonenumber
                      }); setErrordiv(false)
                    }}/>
                    <input className={erorrdiv1 ? 'td1_input gg errordiv' : 'td1_input gg'} maxLength={20} value={value.lastname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setValue({
                        firstname: value.firstname,
                        lastname: e.target.value, surname: value.surname, phonenumber: value.phonenumber,
                      }); setErrordiv1(false)
                    }}/>
                    <input className={erorrdiv2 ? 'td1_input gg errordiv' : 'td1_input gg'} maxLength={20} value={value.surname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setValue({
                        firstname: value.firstname,
                        lastname: value.lastname, surname: e.target.value, phonenumber: value.phonenumber
                      }); setErrordiv2(false)
                    }}/>
                    </td>
                    <td>
                      <input className={erorrdiv3 ? 'td1_input errordiv' : 'td1_input'} maxLength={8} value={value.phonenumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setValue({
                        firstname: value.firstname,
                        lastname: value.lastname, surname: value.surname, phonenumber: e.target.value
                      }); setErrordiv3(false)
                      }}/>
                    </td>
                  <td>
                    <button className='save'> <i onClick={() => Save(item.id)} className="fa-regular fa-square-check"></i></button>
                    <button onClick={() => setEdit(-1)} ><i className="fa-solid fa-xmark"></i></button>
                  </td>
                </tr> : <tr key={item.id}>
                  <td className='td1'>{index + 1}</td>
                  <td className='td2'>{item.lastname} {item.firstname} {item.surname} </td>
                  <td className='td4'>{item.phonenumber}</td>
                  <td className='button' >{auth.role && <><button><i onClick={() => {
                    setEdit(item.id); setValue({
                      firstname: item.firstname,
                      lastname: item.lastname, surname: item.surname, phonenumber: item.phonenumber
                    })
                  }} className="fa-solid fa-pen"></i></button>
                    <button onClick={(e) => {setRemoveitem([item.id, e]);e.preventDefault()}}><i className="fa-regular fa-trash-can"></i></button></>
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
              <div key={index}>
                <div className='line'>
                  <div className='alfa'> <p>{item}</p></div>
                </div>
                <table className='table0'  key={index} >
                  <>
                    {nobos.map((iteme, index) =>
                      iteme.lastname[0].toUpperCase() === item &&
                      <tbody key={index}>
                        {edit === iteme.id ? <tr>
                          <td className='td1'>{index + 1}</td>
                          <td>
                            <input className={erorrdiv ? 'td1_input errordiv' : 'td1_input'} maxLength={20} value={value.firstname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setValue({
                              firstname: e.target.value,
                              lastname: value.lastname, surname: value.surname, phonenumber: value.phonenumber
                            }); setErrordiv(false)
                            }} />
                            <input className={erorrdiv1 ? 'td1_input gg errordiv' : 'td1_input gg'} maxLength={20} value={value.lastname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setValue({
                                firstname: value.firstname,
                                lastname: e.target.value, surname: value.surname, phonenumber: value.phonenumber,
                              }); setErrordiv1(false)
                            }} />
                            <input className={erorrdiv2 ? 'td1_input gg errordiv' : 'td1_input gg'} maxLength={20} value={value.surname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setValue({
                                firstname: value.firstname,
                                lastname: value.lastname, surname: e.target.value, phonenumber: value.phonenumber
                              }); setErrordiv2(false)
                            }} />
                          </td>
                          <td>
                            <input className={erorrdiv3 ? 'td1_input errordiv' : 'td1_input'} maxLength={8} value={value.phonenumber} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setValue({
                              firstname: value.firstname,
                              lastname: value.lastname, surname: value.surname, phonenumber: e.target.value
                            }); setErrordiv3(false)
                            }} />
                          </td>
                          <td>
                            <button className='save'> <i onClick={() => Save(iteme.id)} className="fa-regular fa-square-check"></i></button>
                            <button onClick={() => setEdit(-1)} ><i className="fa-solid fa-xmark"></i></button>
                        </td> 
                        </tr> : <>
                          <tr key={iteme.id}>
                            <td className='td1'>{index + 4}</td>
                            <td className='td2 '>{iteme.lastname}  {iteme.firstname}   {iteme.surname}</td>
                            <td className='td4'>{iteme.phonenumber}</td>
                            <>{auth.role && <td><button onClick={() => {
                              setEdit(iteme.id); setValue({
                                firstname: iteme.firstname,
                                lastname: iteme.lastname, surname: iteme.surname, phonenumber: iteme.phonenumber
                              })
                            }}><i className="fa-solid fa-pen"></i></button>
                              <button onClick={(e) => setRemoveitem([iteme.id, e])}><i className="fa-regular fa-trash-can"></i></button></td>
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
        {auth.role && <i onClick={() => {
          setAdd(!add); setAddvalue({
            firstname: '', lastname: '', surname: '',
            phonenumber: '', key: false
          })
        }} className="fa-solid fa-plus icon">   Ավելացնել</i>}
      </>}
      {removeitem[0] !== -1 && <DeleteText removeitem={removeitem} setRemoveitem={setRemoveitem} deleteItem={Delete} />}
    </>
  )
}