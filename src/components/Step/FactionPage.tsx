import { useEffect, useState } from 'react';
import axios from '../../axios';
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { fetchFraction } from "../../store/action/NumbersAction";
import useAuth from '../../hooks/AdminHooks/useAuth';
import './StepStyle.scss'
import { ErrorMessage } from '../Error/Error';


export const FactionPage = () => {

  const { Fraction } = useAppSelector(state => state.Fraction)
  const dispatch = useAppDispatch()
  const { auth }: any = useAuth()
  const [edit, setEdit] = useState<number>(-1)
  const [error, setError]=useState('')
  const [add, setAdd] = useState<boolean>(false)
  const [value, setValue] = useState({
    name: '',
    leader: '',
    member: '',
    cityphone: '',
    internalphone: '',
  })
  const [addvalue, setAddvalue] = useState({
    name: '',
    leader: '',
    member: '',
    cityphone: '',
    internalphone: '',
  })
  useEffect(() => {
    dispatch(fetchFraction())
  }, [dispatch])

  async function Save(id: number, e: React.FormEvent) {
    e.preventDefault()
    const Editfraction = {
      id, name: value.name, leader: value.leader,
      member: value.member, cityphone: value.cityphone,
      internalphone: value.internalphone
    }
    await axios.patch('fraction/' + id, Editfraction)
    dispatch(fetchFraction())
    setEdit(-1)
  }

  async function Add(e: React.FormEvent) {
    e.preventDefault()
    setError('');
    if(addvalue.leader.trim().length=== 0 || addvalue.member.trim().length=== 0){
    setError('Անհրաժեշտ է լրացնել');
      return
    }
    const newFraction = {
      name: addvalue.name, member: addvalue.member,
      leader: addvalue.leader, cityphone: addvalue.cityphone,
      internalphone: addvalue.internalphone
    }
    await axios.post('fraction/', newFraction)
    dispatch(fetchFraction())
    setAdd(false)
  }

  async function Delete(id: number, e: React.FormEvent) {
    e.preventDefault()
    await axios.delete('fraction/' + id,)
    dispatch(fetchFraction())
    setAdd(false)

  }

  return (
    <>    
    {add ? <form className='form' onSubmit={(e) => Add(e)}>

      <label >Կուսակցության Անվանումը</label>
      <input className='td1' value={addvalue.name} onChange={(e: any) => {
        setAddvalue({
          name: e.target.value,
          leader: addvalue.leader, member: addvalue.member,
          cityphone: addvalue.cityphone, internalphone: addvalue.internalphone
        })
      }} />

      <label>Կուսակցության Ղեկավարը</label>
      <input className='td1' value={addvalue.leader} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setAddvalue({
          name: addvalue.name,
          leader: e.target.value, member: addvalue.member,
          cityphone: addvalue.cityphone, internalphone: addvalue.internalphone
        })
      }}/>
          {error && addvalue.leader.trim().length===0 && <ErrorMessage error={error} />} 

      <label>Կուսակցության քարտուղար</label>
      <input className='td1' value={addvalue.member} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setAddvalue({
          name: addvalue.name,
          leader: addvalue.leader, member: e.target.value,
          cityphone: addvalue.cityphone, internalphone: addvalue.internalphone
        },)
      }} />
      {error && addvalue.member.trim().length===0 && <ErrorMessage error={error} />} 

      <label>Քաղաքային հեռախոսահամարը</label>
      <input className='td1' value={addvalue.cityphone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({
          name: addvalue.name,
          leader: addvalue.leader, member: addvalue.member, cityphone: e.target.value,
          internalphone: addvalue.internalphone
        },)
      }} />

      <label>Ներքին հեռախոսահամարը</label>
      <input className='td1' value={addvalue.internalphone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setAddvalue({
          name: addvalue.name,
          leader: addvalue.leader, member: addvalue.member,
          cityphone: addvalue.cityphone, internalphone: e.target.value
        },)
      }} />
      <div className='button'>
         <button className='button1' onClick={(e) => Add(e)} >Ավելացնել</button>
         <button className='button2' onClick={()=>{setAdd(false); setError('')}}>Չեղարկել</button>
        </div>

    </form> : <form>

      <table className='table3'>

        <thead>  
          <tr>
            <th className='th1'>Կուսակցության&nbsp; Անվանումը</th>
            <th className='th2'>Անդամներ</th>
            <th className='th3'>Քաղ. Հեռ․</th>
            <th className='th4'>Ներքին  Հեռ․</th>
          </tr>
        </thead>
        <tbody>
          {
            Fraction.map((item, index) => <>
              {edit === index ?
                <tr key={item.id} >
                  <td><input className='td3_input jj' value={value.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setValue({ name: e.target.value, 
                    leader: value.leader, member: value.member, cityphone: value.cityphone, internalphone: value.internalphone }) }} /></td>
                  <td><input className='td3_input jj' value={value.leader} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setValue({ name: value.name, 
                    leader: e.target.value, member: value.member, cityphone: value.cityphone, internalphone: value.internalphone }) }} />
                    <input className='td3_input jj' value={value.member} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setValue({ name: value.name, 
                      leader: value.leader, member: e.target.value, cityphone: value.cityphone, internalphone: value.internalphone }) }} /></td>
                  <td><input className='td3_input' value={value.cityphone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setValue({ name: value.name, 
                    leader: value.leader, member: value.member, cityphone: e.target.value, internalphone: value.internalphone }) }} /></td>
                  <td><input className='td3_input' value={value.internalphone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setValue({ name: value.name, 
                    leader: value.leader, member: value.member, cityphone: value.cityphone, internalphone: e.target.value }) }} /></td>

                  <button className='save'> <i onClick={(e) => Save(item.id, e)} className="fa-regular fa-square-check"></i></button>

                </tr> : <tr key={item.id}>

                  <td className='td1'>{item.name}</td>
                  <td className='td2'>{item.leader}<br /><span>քարտուղար </span>{item.member}</td>
                  <td className='td3'>{item.cityphone}</td>
                  <td className='td4'>{item.internalphone}</td>

                  {auth.roles && <td><button onClick={() => { setEdit(index); setValue({ name: item.name, leader: item.leader, 
                    member: item.member, cityphone: item.cityphone, internalphone: item.internalphone }) }}><i className="fa-solid fa-pen"></i></button>
                    <button onClick={(e) => Delete(item.id, e)}><i className="fa-regular fa-trash-can"></i></button></td>}
                </tr>
              } </>)}

        </tbody>
      </table>
      {auth.roles &&<i onClick={() => { setAdd(!add) ; setAddvalue({
    name: '',   leader: '',    member: '',
    cityphone: '',    internalphone: '',  })}}
     className="fa-solid fa-plus"></i>}
    </form>
    }
    </>
  )
}