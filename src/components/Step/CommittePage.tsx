import { useEffect, useState } from 'react';
import axios from '../../axios';
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { fetchCommitte } from "../../store/action/NumbersAction";
import useAuth from '../../hooks/AdminHooks/useAuth';
import './StepStyle.scss'
import { ErrorMessage } from '../Error/Error';
import DeleteText from '../Delete/DeleteText';



export const CommittePage = () => {

  const { auth }: any = useAuth()
  const { Committe } = useAppSelector(state => state.Committes)
  const dispatch = useAppDispatch()
  const [removeitem, setRemoveitem] = useState<any>([-1, {}])
  const [edit, setEdit] = useState<number>(-1)
  const [add, setAdd] = useState<boolean>(false)
  const [error, setError]=useState('')
  const [value, setValue] = useState({
    name: '',
    member1: '',
    member2: '',
    cityphone: '',
    internalphone: '',
    internalphone2: '',
  })
  const [addvalue, setAddvalue] = useState({
    name: '',
    member1: '',
    member2: '',
    cityphone: '',
    internalphone: '',
    internalphone2: '',
  })

  useEffect(() => {
    dispatch(fetchCommitte())
  }, [dispatch])

  async function Save(id: number, e: React.FormEvent) {
    e.preventDefault()
    const Editcomitee = {
      name: value.name, member1: value.member1,
      member2: value.member2, cityphone: value.cityphone,
      internalphone: value.internalphone, internalphone2: value.internalphone2
    }
    await axios.put('committee/' + id, Editcomitee)
    dispatch(fetchCommitte())
    setEdit(-1)
  }

  async function Add(e: React.FormEvent) {
    e.preventDefault()
    setError('');
    if(addvalue.member2.trim().length===0 || addvalue.member1.trim().length === 0){
    setError('Անհրաժեշտ է լրացնել');
      return
    }
    const newComitee = {
      name: addvalue.name, member1: addvalue.member1,
      member2: addvalue.member2, cityphone: addvalue.cityphone,
      internalphone: addvalue.internalphone, internalphone2: addvalue.internalphone2
    }
    await axios.post('committee/', newComitee)
    dispatch(fetchCommitte())
    setAdd(false)
  }

  async function Delete(id: number, e: React.FormEvent) {
    e.preventDefault()
    await axios.delete('committee/' + id,)
    dispatch(fetchCommitte())
    setAdd(false)
  }

  return (
    <>
      {add ? <form className='form' onSubmit={(e) => Add(e)}>
        <label>Հանձնաժողովի անվանումը</label>
        <input className='td1'maxLength={20}  value={addvalue.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAddvalue({
            name: e.target.value, member1: addvalue.member1,
            member2: addvalue.member2, cityphone: addvalue.cityphone, 
            internalphone: addvalue.internalphone, internalphone2: addvalue.internalphone2
          })
        }} />
        <label>Հանձնաժողովի նախագահ</label>
        <input className='td1' maxLength={20} value={addvalue.member1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAddvalue({
            name: addvalue.name, member1: e.target.value,
            member2: addvalue.member2, cityphone: addvalue.cityphone, 
            internalphone: addvalue.internalphone, internalphone2: addvalue.internalphone2
          })
        }} />
          {error &&  addvalue.member1.trim().length===0 && <ErrorMessage error={error} />}
        <label>Հանձնաժողովի նախագահի տեղակալ</label>
        <input className='td1' maxLength={20} value={addvalue.member2} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAddvalue({
            name: addvalue.name, member1: addvalue.member1,
            member2: e.target.value, cityphone: addvalue.cityphone, 
            internalphone: addvalue.internalphone, internalphone2: addvalue.internalphone2
          })
        }} />
          {error &&  addvalue.member2.trim().length===0 && <ErrorMessage error={error} />}
        <label>Քաղաքային հեռախոսահամարը</label>
        <input className='td1' maxLength={9} value={addvalue.internalphone2} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAddvalue({
            name: addvalue.name, member1: addvalue.member1,
            member2: addvalue.member2, cityphone: addvalue.cityphone, 
            internalphone: addvalue.internalphone, internalphone2: e.target.value
          })
        }} />
        <label>1-ին Ներքին հեռախոսահամարը</label>
        <input className='td1' maxLength={8} value={addvalue.cityphone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAddvalue({
            name: addvalue.name, member1: addvalue.member1,
            member2: addvalue.member2, cityphone: e.target.value, 
            internalphone: addvalue.internalphone, internalphone2: addvalue.internalphone2
          })
        }} />
        <label>2-րդ Ներքին հեռախոսահամարը</label>
        <input className='td1' maxLength={8} value={addvalue.internalphone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAddvalue({
            name: addvalue.name, member1: addvalue.member1,
            member2: addvalue.member2, cityphone: addvalue.cityphone, 
            internalphone: e.target.value, internalphone2: addvalue.internalphone2
          })
        }} />
       <div className='button'>
         <button className='button1' onClick={(e) => Add(e)} >Ավելացնել</button>
         <button className='button2' onClick={()=>{setAdd(false); setError('')}}>Չեղարկել</button>
        </div>
      </form> : <form>
        <table className='table2'>
          <thead>
            <tr>
              <th className='th1'>Հանձնաժողովի&nbsp; Անվանումը</th>
              <th className='th2'>Անդամներ</th>
              <th className='th3'>Քաղ. Հեռ․</th>
              <th className='th4'>Ներքին  Հեռ․</th>
            </tr>
          </thead>
          <>
            {
              Committe.map((item, index) =>
                <tbody key={index}>
                  {edit === index ?
                    <tr>
                      <td><input className='td2_input jj' maxLength={20} value={value.name} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        setValue({
                          name: e.target.value, member1: value.member1, member2: value.member2, 
                          cityphone: value.cityphone, internalphone: value.internalphone, internalphone2: value.internalphone2
                        })
                      }} /></td>
                      <td><input className='td2_input jj' maxLength={20} value={value.member1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setValue({
                          name: value.name, member1: e.target.value, member2: value.member2, 
                          cityphone: value.cityphone, internalphone: value.internalphone, internalphone2: value.internalphone2
                        })
                      }} />
                        <input className='td2_input jj' maxLength={20} value={value.member2} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setValue({
                            name: value.name, member1: value.member1, member2: e.target.value, 
                            cityphone: value.cityphone, internalphone: value.internalphone, internalphone2: value.internalphone2
                          })
                        }} /></td>
                      <td><input className='td2_input' maxLength={9} value={value.cityphone} onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                        setValue({
                          name: value.name, member1: value.member1, member2: value.member2, 
                          cityphone: e.target.value, internalphone: value.internalphone, internalphone2: value.internalphone2
                        })
                      }} /></td>
                      <td><input className='td2_input'maxLength={8} value={value.internalphone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setValue({
                          name: value.name, member1: value.member1, member2: value.member2, 
                          cityphone: value.cityphone, internalphone: e.target.value, internalphone2: value.internalphone2
                        })
                      }} />
                      <input className='td2_input' maxLength={8} value={value.internalphone2} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setValue({
                          name: value.name, member1: value.member1, member2: value.member2, 
                          cityphone: value.cityphone, internalphone: value.internalphone, internalphone2: e.target.value
                        })
                      }} /></td>
                      <td>
                        <button className='save'> <i onClick={(e) => Save(item.id, e)} className="fa-regular fa-square-check"></i></button>
                        <button onClick={() => setEdit(-1)} ><i className="fa-solid fa-xmark"></i></button>
                        </td>
                    </tr> : <tr key={item.id}>
                      <td className='td1'>{item.name}</td>
                      <td className='td2'>{item.member1}<br /><span>տեղ.</span>{item.member2}</td>
                      <td className='td3'>{item.cityphone}</td>
                      <td className='td4'>{item.internalphone}<br />{item.internalphone2}</td>
                      {auth.role && <td><button onClick={() => {
                        setEdit(index); setValue({
                          name: item.name, member1: item.member1, member2:item.member2,
                          cityphone: item.cityphone, internalphone: item.internalphone, internalphone2:item.internalphone2
                        })
                      }}><i className="fa-solid fa-pen"></i></button>
                        <button onClick={(e) =>{ setRemoveitem([item.id, e]);e.preventDefault()}}><i className="fa-regular fa-trash-can"></i></button></td>
                      }
                    </tr>
                  }
                </tbody>
              )
            }
          </>
        </table>
        {auth.role && <i onClick={() => { setAdd(!add) }} className="fa-solid fa-plus icon">   Ավելացնել</i>}
      </form>}
      {removeitem[0] !== -1 && <DeleteText removeitem={removeitem} setRemoveitem={setRemoveitem} deleteItem={Delete} />}
    </>
  )
}