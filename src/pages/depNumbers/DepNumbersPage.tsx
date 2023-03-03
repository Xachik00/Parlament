import { useEffect, useState } from 'react'; 
import { Header } from '../../components/Header/Header'; 
import { useAppSelector, useAppDispatch } from '../../hooks/redux' 
import { fetchDepNum } from "../../store/action/depNumbersActions"; 
import { ErrorMessage } from '../../components/Error/Error';
import axios from '../../axios/index'; 
import useAuth from '../../hooks/AdminHooks/useAuth'; 
import "./depNum.scss" 
import DeleteText from '../../components/Delete/DeleteText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faXmark,faPen,faTrash,faPlus } from '@fortawesome/free-solid-svg-icons'
 
 
export const DepNumbersPage = () => { 
 
  const {depnum}:any = useAppSelector(state => state.telNumbers) 
 
  const dispatch = useAppDispatch() 

 
  const {auth}:any = useAuth() 
 
  const [edit, setEdit] = useState(-1) 
  const [value, setValue] = useState('') 
  const [value1, setValue1] = useState('') 
  const [error, setError] = useState("")

  const [add, setAdd] = useState(false)
  const [removeitem,setRemoveitem]=useState([-1,'',{}])
 
  const [erorrdiv, setErrordiv] = useState(false)
  const [erorrdiv1, setErrordiv1] = useState(false)

  useEffect(()=>{ 
    dispatch(fetchDepNum())
  },[dispatch]) 


  async function adminSave(id:any, value:any, value1:any, page:string, e:any){ 
    e.preventDefault()
    if(value===''){
      setErrordiv(true)
    }
    if(value1===''){
      setErrordiv1(true)
    }else{
    const newInfo={  
      name:value, 
      internalphone:value1, 
    } 
    await axios.put(page + "/" + id, newInfo);
    dispatch(fetchDepNum()) 
    setEdit(-1)
  } }
 
  async function adminDelete(id:number, page:string, e:any){
    e.preventDefault()
    await axios.delete(page+"/" + id); 
    dispatch(fetchDepNum()) 
  } 

  async function adminAdd() {
    setValue("")
    setValue1("")
    setEdit(-1)
    setAdd(!add)
    setError("")
  }
 
  async function adminsSave(value:any, value1:any, e:any){
    e.preventDefault()
    setError('');
    if(value.trim().length=== 0 || value.trim().length=== 0){
      setError('Անհրաժեշտ է լրացնել');
      return
    }
    const newInfo={
      name:value, 
      internalphone:value1, 
    } 
    await axios.post("units/", newInfo); 
    setAdd(!add)
    dispatch(fetchDepNum())
  
  } 

  return ( 
    <div className='depnum'> 
      <Header/> 
      <div className='main_2'> 
        <div className='header_'> 
          <img src="./images/Phones.png" alt='' /> 
          <h2>Կառուցվածքային ստորաբաժանումների հեռախոսահամարներ</h2> 
        </div> 
  
        {add ? <div className='form'>
          <label>Ստորաբաժանման անվանումը</label>
          <textarea maxLength={100} value={value} onChange={(e:any) => {setValue(e.target.value)}}></textarea>
          {error &&  value.trim().length===0 && <ErrorMessage error={error} />}


          <label>Ներքին հեռ․</label>
          <input  className='input_num' maxLength={8} value={value1} onChange={(e:any) => {setValue1(e.target.value)}} />
          {error &&  value1.trim().length===0 && <ErrorMessage error={error} />}


          <div className='form_div'>
            <button onClick={(e) => adminsSave(value, value1, e)} >Ավելացնել</button>
            <button onClick={()=> setAdd(!add)} >Չեղարկել</button>
          </div> 

        </div>:<><table> 
          <thead> 
            <tr> 
              <th>Ստորաբաժանման անվանումը</th> 
              <th>Ներքին հեռ․</th>
            </tr> 
          </thead> 
        { 
          depnum.map((item:any, index:number)=> <tbody key={item.id}> 
            {edit === index ? <tr className='textarea_tr'> 
              <td className='textarea_td'> 
                <textarea className={erorrdiv ? 'errordiv' : ''} maxLength={100} value={value} onChange={(e:any) => {setValue(e.target.value); setErrordiv(false)}}></textarea> 
              </td> 
              <td className='textarea_td'> 
                <textarea className={erorrdiv1 ? 'errordiv' : ''} maxLength={8} value={value1} onChange={(e:any) => {setValue1(e.target.value); setErrordiv1(false)}}></textarea> 
              </td> 
              <td className='textarea_td'> 
                <button className='save'> <FontAwesomeIcon icon={faCheck}  onClick={(e) => adminSave(item.id, value, value1, "units", e)}/></button>
                <button onClick={() => setEdit(-1)} ><FontAwesomeIcon icon={faXmark} /></button>
              </td> 
              </tr> : <tr> 
              <td>{item.name}</td> 
              <td>{item.internalphone}</td> 
              {auth.role &&<td>  <button onClick={() => { 
                setEdit(index) 
                setValue(item.name) 
                setValue1(item.internalphone) 
              }}><FontAwesomeIcon icon={faPen} /></button>
                  {auth.role && <button onClick={(e) => { 
                  setRemoveitem([item.id, "units", e]) 
                  }}><FontAwesomeIcon icon={faTrash} /></button> } 
              </td>   }
            </tr>} 
            </tbody> 
          ) 
        } 
        </table>

        {auth.role && <button onClick={() => adminAdd()} className="ADD"><FontAwesomeIcon icon={faPlus} />   Ավելացնել</button>}

        </> }
      </div> 
    {removeitem[0]!==-1&&<DeleteText removeitem={removeitem} setRemoveitem={setRemoveitem} deleteItem={adminDelete} />}
  </div> 
  ) 
}