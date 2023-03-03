import { useEffect, useState } from 'react';
import axios from '../../axios';
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { fetchFraction } from "../../store/action/NumbersAction";
import useAuth from '../../hooks/AdminHooks/useAuth';
import './StepStyle.scss'
import { ErrorMessage } from '../Error/Error';
import DeleteText from '../Delete/DeleteText';


export const FactionPage = () => {

  const { Fraction } = useAppSelector(state => state.Fraction)
  const dispatch = useAppDispatch()
  const { auth }: any = useAuth()
  const [edit, setEdit] = useState<number>(-1)
  const [removeitem, setRemoveitem] = useState<any>([-1, {}])
  const [error, setError]=useState('')
  const [add, setAdd] = useState<boolean>(false)
  const [value, setValue] = useState({
    name: '',
    member1: '',
    member2: '',
    cityphone: '',
    internalphone: '',
  })
  const [addvalue, setAddvalue] = useState({
    name: '',
    member1: '',
    member2: '',
    cityphone: '',
    internalphone: '',
  })

  const [erorrdiv, setErrordiv] = useState(false)
  const [erorrdiv1, setErrordiv1] = useState(false)
  const [erorrdiv2, setErrordiv2] = useState(false)
  const [erorrdiv3, setErrordiv3] = useState(false)

  useEffect(() => {
    dispatch(fetchFraction())
  }, [dispatch])

  async function Save(id: number, e: React.FormEvent) {
    e.preventDefault()
    if(value.name===''){
      setErrordiv(true)
    }
    if(value.member1===''){
      setErrordiv1(true)
    }
    if(value.member2===''){
      setErrordiv2(true)
    }
    if(value.internalphone===''){
      setErrordiv3(true)
    }else{
    const Editfraction = {
      name: value.name, member1: value.member1,
      member2: value.member2, cityphone: value.cityphone,
      internalphone: value.internalphone
    }
    await axios.put('faction/' + id, Editfraction)
    dispatch(fetchFraction())
    setEdit(-1)
  }}

  async function Add(e: React.FormEvent) {
    e.preventDefault()
    setError('');
    if(addvalue.name.trim().length===0 ||addvalue.member1.trim().length=== 0 || addvalue.member2.trim().length=== 0||addvalue.internalphone.trim().length===0 ){
    setError('Անհրաժեշտ է լրացնել');
      return
    }
    const newFraction = {
      name: addvalue.name, member2: addvalue.member2,
      member1: addvalue.member1, cityphone: addvalue.cityphone,
      internalphone: addvalue.internalphone
    }
    await axios.post('faction/', newFraction)
    dispatch(fetchFraction())
    setAdd(false)
  }

  async function Delete(id: number, e: React.FormEvent) {
    e.preventDefault()
    await axios.delete('faction/' + id,)
    dispatch(fetchFraction())
    setAdd(false)
  }

  return (
    <>{add ? <form className='form' onSubmit={(e) => Add(e)}>
      <label >Կուսակցության Անվանումը</label>
      <input className='td1' maxLength={20} value={addvalue.name} onChange={(e: any) => {
        setAddvalue({
          name: e.target.value,
          member1: addvalue.member1, member2: addvalue.member2,
          cityphone: addvalue.cityphone, internalphone: addvalue.internalphone
        })
      }} />
        {error && addvalue.name.trim().length===0 && <ErrorMessage error={error} />} 
      <label>Կուսակցության Ղեկավարը</label>
      <input className='td1 up' maxLength={20} value={addvalue.member1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setAddvalue({
          name: addvalue.name,
          member1: e.target.value, member2: addvalue.member2,
          cityphone: addvalue.cityphone, internalphone: addvalue.internalphone
        })
      }}/>
          {error && addvalue.member1.trim().length===0 && <ErrorMessage error={error} />} 
      <label>Կուսակցության քարտուղար</label>
      <input className='td1 up' maxLength={20} value={addvalue.member2} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setAddvalue({
          name: addvalue.name,
          member1: addvalue.member1, member2: e.target.value,
          cityphone: addvalue.cityphone, internalphone: addvalue.internalphone
        },)
      }} />
      {error && addvalue.member2.trim().length===0 && <ErrorMessage error={error} />} 
      <label>Քաղաքային հեռախոսահամարը</label>
      <input className='td1' maxLength={9} value={addvalue.cityphone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setAddvalue({
          name: addvalue.name,
          member1: addvalue.member1, member2: addvalue.member2,
          cityphone: e.target.value, internalphone: addvalue.internalphone
        },)
      }} />
      <label>Ներքին հեռախոսահամարը</label>
      <input className='td1' maxLength={8} value={addvalue.internalphone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setAddvalue({
          name: addvalue.name,
          member1: addvalue.member1, member2: addvalue.member2,
          cityphone: addvalue.cityphone, internalphone: e.target.value
        },)
      }} />
        {error && addvalue.internalphone.trim().length===0 && <ErrorMessage error={error} />} 
      <div className='button'>
         <button className='button1' onClick={(e) => Add(e)} >Ավելացնել</button>
         <button className='button2' onClick={()=>{setAdd(false); setError('')}}>Չեղարկել</button>
        </div>
    </form>:<form>
      <table className='table3'>
        <thead>  
          <tr>
            <th className='th1'>Կուսակցության&nbsp; Անվանումը</th>
            <th className='th2'>Անդամներ</th>
            <th className='th3'>Քաղ. Հեռ․</th>
            <th className='th4'>Ներքին  Հեռ․</th>
          </tr>
        </thead>
        <>
          {
            Fraction.map((item, index) => 
            <tbody key={index}>{edit === index ?
                <tr key={item.id} >
                  <td><input className={erorrdiv ? 'td3_input jj errordiv' : 'td3_input jj'} maxLength={20} value={value.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setValue({ name: e.target.value, 
                    member1: value.member1, member2: value.member2, cityphone: value.cityphone, internalphone: value.internalphone }) ; setErrordiv(false)}} /></td>
                  <td><input className={erorrdiv1 ? 'td3_input jj errordiv' : 'td3_input jj'} maxLength={20} value={value.member1} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setValue({ name: value.name, 
                    member1: e.target.value, member2: value.member2, cityphone: value.cityphone, internalphone: value.internalphone }) ; setErrordiv1(false)}} />
                    <input className={erorrdiv2 ? 'td3_input jj errordiv' : 'td3_input jj'} maxLength={20} value={value.member2} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setValue({ name: value.name, 
                      member1: value.member1, member2: e.target.value, cityphone: value.cityphone, internalphone: value.internalphone }); setErrordiv2(false) }} /></td>
                  <td><input className='td3_input' maxLength={9} value={value.cityphone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setValue({ name: value.name, 
                    member1: value.member1, member2: value.member2, cityphone: e.target.value, internalphone: value.internalphone }) }} /></td>
                  <td><input className={erorrdiv3 ? 'td3_input errordiv' : 'td3_input'} maxLength={8} value={value.internalphone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setValue({ name: value.name, 
                    member1: value.member1, member2: value.member2, cityphone: value.cityphone, internalphone: e.target.value }); setErrordiv3(false)  }} /></td>
                  <td>
                    <button className='save'> <i onClick={(e) => Save(item.id, e)} className="fa-regular fa-square-check"></i></button>
                    <button onClick={(e) =>{e.preventDefault(); setEdit(-1)}} ><i className="fa-solid fa-xmark"></i></button>
                  </td>
                </tr> : <tr key={item.id}>
                  <td className='td1'>{item.name}</td>
                  <td className='td2 up'>{item.member1}<br /><span>քարտուղար </span>{item.member2}</td>
                  <td className='td3'>{item.cityphone}</td>
                  <td className='td4'>{item.internalphone}</td>
                  {auth.role && <td><button onClick={(e) => {e.preventDefault(); setEdit(index); setValue({ name: item.name, member1: item.member1, 
                    member2: item.member2, cityphone: item.cityphone, internalphone: item.internalphone }) }}><i className="fa-solid fa-pen"></i></button>
                    <button onClick={(e) => {setRemoveitem([item.id, e]);e.preventDefault()}}><i className="fa-regular fa-trash-can"></i></button></td>}
                 </tr>
              }</tbody>)}
        </>
      </table>
      {auth.role &&<i onClick={() =>{ setAdd(!add) ; setAddvalue({
    name: '',   member1: '',    member2: '',
    cityphone: '',    internalphone: '',  })}}
     className="fa-solid fa-plus icon">   Ավելացնել</i>}
    </form>
    }
      {removeitem[0] !== -1 && <DeleteText removeitem={removeitem} setRemoveitem={setRemoveitem} deleteItem={Delete} />}
    </>
  )
}