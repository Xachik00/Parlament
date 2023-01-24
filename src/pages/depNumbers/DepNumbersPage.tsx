import { useEffect, useState } from 'react'; 
import { Header } from '../../components/Header/Header'; 
import { useAppSelector, useAppDispatch } from '../../hooks/redux' 
import { fetchDepNum } from "../../store/action/depNumbersActions"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faregular } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'; 
import axios from '../../axios/index'; 
import useAuth from '../../hooks/AdminHooks/useAuth'; 
import "./depNum.scss" 
 
 
export const DepNumbersPage = () => { 
 
  const {depnum}:any = useAppSelector(state => state.telNumbers) 
 
  const dispatch = useAppDispatch() 
  const navigate = useNavigate() 
 
  const {auth}:any = useAuth() 
 
  const [edit, setEdit] = useState(-1) 
  const [value, setValue] = useState('') 
  const [value1, setValue1] = useState('') 

  const [add, setAdd] = useState(false)
 
  useEffect(()=>{ 
    dispatch(fetchDepNum()) 
  },[]) 

  console.log(depnum);

  async function adminSave(id:any, value:any, value1:any, page:string){ 
    const newInfo={ 
      id:id, 
      title:value, 
      tel:value1, 
    } 
    await axios.patch(page+"/" + id, newInfo); 
    navigate(0) 
  } 
 
  async function adminDelete(id:number, page:string){ 
    await axios.delete(page+"/" + id); 
    navigate(0) 
  } 

  async function adminAdd() {
    setAdd(!add)
  }
 
  async function adminsSave(value:any, value1:any){ 
    const newInfo={
      title:value, 
      tel:value1, 
    } 
    await axios.post("depnum/", newInfo); 
    navigate(0) 
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
          <textarea value={value} onChange={(e:any) => {setValue(e.target.value)}} style={{resize: "none"}}></textarea>

          <label>Ներքին հեռ․</label>
          <textarea value={value1} onChange={(e:any) => {setValue1(e.target.value)}} style={{resize: "none"}}></textarea>

          <button onClick={() => adminsSave(value, value1)}>Save</button> 

        </form>  : <table> 
          <thead> 
            <tr> 
              <th>Ստորաբաժանման անվանումը</th> 
              <th>Ներքին հեռ․</th>
            </tr> 
          </thead> 
        { 
          depnum.map((item:any, index:number)=> <tbody key={item.id}> 
            {edit === index ? <tr> 
              <td> 
                <textarea value={value} onChange={(e:any) => {setValue(e.target.value)}} style={{resize: "none"}}></textarea> 
              </td> 
              <td> 
                <textarea value={value1} onChange={(e:any) => {setValue1(e.target.value)}} style={{resize: "none"}}></textarea> 
              </td> 
              <td> 
                <button className='save'> <i onClick={() => adminSave(item.id, value, value1, "depnum")} className="fa-regular fa-square-check"></i></button>
              </td> 
              </tr> : <tr> 
              <td>{item.title}</td> 
              <td>{item.tel}</td> 
              <td>{auth.roles && <button onClick={() => { 
                setEdit(index) 
                setValue(item.title) 
                setValue1(item.tel) 
              }}><i className="fa-solid fa-pen"></i></button>} 
                  {auth.roles && <button onClick={() => { 
                  adminDelete(item.id, "depnum") 
                  }}><i className="fa-regular fa-trash-can"></i></button> } 
              </td>   
            </tr>} 
            </tbody> 
          ) 
        } 
        {auth.roles && <i onClick={() => adminAdd()} className="fa-solid fa-plus ADD"></i>}
        </table>
      
      }
      </div> 
     
  </div> 
  ) 
}