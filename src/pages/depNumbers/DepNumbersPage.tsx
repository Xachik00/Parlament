import { useEffect, useState } from 'react'; 
import { Header } from '../../components/Header/Header'; 
import { useAppSelector, useAppDispatch } from '../../hooks/redux' 
import { fetchDepNum } from "../../store/action/depNumbersActions"; 
import { ErrorMessage } from '../../components/Error/Error';
import { useNavigate } from 'react-router-dom'; 
import axios from '../../axios/index'; 
import useAuth from '../../hooks/AdminHooks/useAuth'; 
import "./depNum.scss" 
import DeleteText from '../../components/Delete/DeleteText';
 
 
export const DepNumbersPage = () => { 
 
  const {depnum}:any = useAppSelector(state => state.telNumbers) 
 
  const dispatch = useAppDispatch() 
  const navigate = useNavigate() 
 
  const {auth}:any = useAuth() 
 
  const [edit, setEdit] = useState(-1) 
  const [value, setValue] = useState('') 
  const [value1, setValue1] = useState('') 
  const [error, setError] = useState("")

  const [add, setAdd] = useState(false)
  const [removeitem,setRemoveitem]=useState([-1,'',{}])
 
  useEffect(()=>{ 
    dispatch(fetchDepNum())
  },[dispatch]) 


  async function adminSave(id:any, value:any, value1:any, page:string, e:any){ 
    e.preventDefault()
    const newInfo={ 
      id:id, 
      title:value, 
      tel:value1, 
    } 
    await axios.patch(page + "/" + id, newInfo);
    dispatch(fetchDepNum()) 
    setEdit(-1)
  } 
 
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
      title:value, 
      tel:value1, 
    } 
    await axios.post("depnum/", newInfo); 
    setAdd(!add)
    dispatch(fetchDepNum())
    // navigate(0) 
  } 

  return ( 
    <div className='depnum'> 
      <Header/> 
      <div className='main_2'> 
        <div className='header_'> 
          <img src="./images/Phones.png" alt='' /> 
          <h2>Կառուցվածքային ստորաբաժանումների հեռախոսահամարներ</h2> 
        </div> 
  
        {add ? <form>
          <label>Ստորաբաժանման անվանումը</label>
          <textarea value={value} onChange={(e:any) => {setValue(e.target.value)}}></textarea>
          {error &&  value.trim().length===0 && <ErrorMessage error={error} />}


          <label>Ներքին հեռ․</label>
          <textarea value={value1} onChange={(e:any) => {setValue1(e.target.value)}}></textarea>
          {error &&  value1.trim().length===0 && <ErrorMessage error={error} />}


          <div className='form_div'>
            <button onClick={(e) => adminsSave(value, value1, e)} >Ավելացնել</button>
            <button onClick={()=> setAdd(!add)} >Չեղարկել</button>
          </div> 

        </form>  : <table> 
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
                <textarea value={value} onChange={(e:any) => {setValue(e.target.value)}}></textarea> 
              </td> 
              <td className='textarea_td'> 
                <textarea value={value1} onChange={(e:any) => {setValue1(e.target.value)}}></textarea> 
              </td> 
              <td className='textarea_td'> 
                <button className='save'> <i onClick={(e) => adminSave(item.id, value, value1, "depnum", e)} className="fa-regular fa-square-check"></i></button>
                <button onClick={() => setEdit(-1)} ><i className="fa-solid fa-xmark"></i></button>
              </td> 
              </tr> : <tr> 
              <td>{item.title}</td> 
              <td>{item.tel}</td> 
              {auth.roles &&<td>  <button onClick={() => { 
                setEdit(index) 
                setValue(item.title) 
                setValue1(item.tel) 
              }}><i className="fa-solid fa-pen"></i></button>
                  {auth.roles && <button onClick={(e) => { 
                  setRemoveitem([item.id, "depnum", e]) 
                  }}><i className="fa-regular fa-trash-can"></i></button> } 
              </td>   }
            </tr>} 
            </tbody> 
          ) 
        } 
        {auth.roles && <i onClick={() => adminAdd()} className="fa-solid fa-plus ADD">   Ավելացնել</i>}
        </table>
      
      }
      </div> 
     {removeitem[0]!==-1&&<DeleteText removeitem={removeitem} setRemoveitem={setRemoveitem} deleteItem={adminDelete} />}
  </div> 
  ) 
}