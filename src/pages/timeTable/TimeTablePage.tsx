import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { fetchTimeTable } from "../../store/action/timeTableActions";
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/index';
import { ErrorMessage } from '../../components/Error/Error';
import useAuth from '../../hooks/AdminHooks/useAuth';
import DeleteText from '../../components/Delete/DeleteText';
import "./timeTable.scss"


export const TimeTablePage = () => {

  const { admission, citizenAdmission }: any = useAppSelector(state => state.admission)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { auth }: any = useAuth()
  const [error, setError] = useState("")

  const [edit, setEdit] = useState(-1)
  const [value, setValue] = useState('')
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')

  const [editCitizen, seteditCitizen] = useState(-1)
  const [valueCitizen, setValueCitizen] = useState('')
  const [valueCitizen1, setValueCitizen1] = useState('')
  const [valueCitizen2, setValueCitizen2] = useState('')

  const [add, setAdd] = useState(false)
  const [add1, setAdd1] = useState(false)
  const [removeitem,setRemoveitem]=useState([-1,'',{}])



  useEffect(() => {
    dispatch(fetchTimeTable())
  }, [dispatch])

  async function adminSave1(id: any, valueCitizen: any, valueCitizen1: any, valueCitizen2: any, page: string, e:any) {
    e.preventDefault()
    const newInfo = {
      id: id,
      name: valueCitizen,
      day: valueCitizen1,
      time: valueCitizen2
    }
    await axios.patch(page + "/" + id, newInfo);
    dispatch(fetchTimeTable())
    seteditCitizen(-1)
  }

  async function adminSave(id: any, value: any, value1: any, value2: any, page: string, e:any) {
    e.preventDefault()
    const newInfo = {
      id: id,
      name: value,
      day: value1,
      time: value2
    }
    await axios.patch(page + "/" + id, newInfo);
    dispatch(fetchTimeTable())
    setEdit(-1)
  }

  async function adminDelete(id: any, page: string, e:any) {
    e.preventDefault()
    await axios.delete(page + "/" + id);
    dispatch(fetchTimeTable())
  }

  async function adminDeleteCitizen(id: any, page: string, e:any) {
    e.preventDefault()
    await axios.delete(page + "/" + id);
    dispatch(fetchTimeTable())
  }

  async function adminAdd() {
    setValue("")
    setValue1("")
    setValue2("")
    setAdd(!add)
    setEdit(-1)
    setError("")
  }
  
  async function adminAdd1() {
    setValueCitizen("")
    setValueCitizen1("")
    setValueCitizen2("")
    setAdd1(!add1)
    seteditCitizen(-1)
    setError("")
  }

  async function adminsSave(value: any, value1: any, value2: any, e:any) {
    e.preventDefault()
    setError('');
    if(value.trim().length=== 0 || value.trim().length=== 0){
      setError('Անհրաժեշտ է լրացնել');
      return
    }
    const newInfo = {
      name: value,
      day: value1,
      time: value2,
    }
    await axios.post("admission/", newInfo);
    dispatch(fetchTimeTable())
    setAdd(!add)
  }

  async function adminsSave1(valueCitizen: any, valueCitizen1: any, valueCitizen2: any, e:any) {
    e.preventDefault()
    setError('');
    if(valueCitizen.trim().length=== 0 || valueCitizen1.trim().length=== 0){
      setError('Անհրաժեշտ է լրացնել');
      return
    }
    const newInfo = {
      name: valueCitizen,
      day: valueCitizen1,
      time: valueCitizen2,
    }
    await axios.post("citizenAdmission/", newInfo);
    dispatch(fetchTimeTable())
    setAdd1(!add1)
  }
  


  return (
    <div className='timeTable'>
      <Header />
      <div className='main_1'>
        <div className='header_'>
          <img src="./images/day.png" alt='' />
          <h2>Քաղաքացիների ընդունելության ժամանակացույց</h2>
        </div>


        {add ? <form className='form'>

            <label>Ստորաբաժանման անվանումը</label>
            <textarea className='td1' value={value} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setValue(e.target.value) }}></textarea>
            {error &&  value.trim().length===0 && <ErrorMessage error={error} />}

            <label>Օրը</label>
            <textarea  className='td1' value={value1} onChange={(e: any) => { setValue1(e.target.value) }}></textarea>
            {error &&  value1.trim().length===0 && <ErrorMessage error={error} />}
          
            <label>Ժամը</label>
            <textarea  className='td1' value={value2} onChange={(e: any) => { setValue2(e.target.value) }}></textarea>
          
          <div className='form_div'>
            <button onClick={(e) => adminsSave(value, value1, value2, e)} >Ավելացնել</button>
            <button onClick={()=> setAdd(!add)} >Չեղարկել</button>
          </div>

        </form> : add1 ? <form>
          <label>Ստորաբաժանման անվանումը</label>
          <textarea value={valueCitizen} onChange={(e: any) => { setValueCitizen(e.target.value) }} style={{ resize: "none" }}></textarea>
          {error &&  valueCitizen.trim().length===0 && <ErrorMessage error={error} />}


          <label>Օրը</label>
          <textarea value={valueCitizen1} onChange={(e: any) => { setValueCitizen1(e.target.value) }} style={{ resize: "none" }}></textarea>
          {error &&  valueCitizen1.trim().length===0 && <ErrorMessage error={error} />}


          <label>Ժամը</label>
          <textarea value={valueCitizen2} onChange={(e: any) => { setValueCitizen2(e.target.value) }} style={{ resize: "none" }}></textarea>

          <div className='form_div'>
            <button onClick={(e) => adminsSave1(valueCitizen, valueCitizen1, valueCitizen2, e)} >Ավելացնել</button>
            <button onClick={()=> setAdd1(!add1)} >Չեղարկել</button>
          </div>

        </form> :
        <div>
          <div>
            <h3 className='h3-1'>ԺԱՄԱՆԱԿԱՑՈՒՅՑ ԱԶԳԱՅԻՆ ԺՈՂՈՎԻ ՄՇՏԱԿԱՆ ՀԱՆՁՆԱԺՈՂՈՎՆԵՐԻ ԿՈՂՄԻՑ  ՔԱՂԱՔԱՑԻՆԵՐԻ ԸՆԴՈՒՆԵԼՈՒԹՅՈՒՆՆԵՐԻ(2022 թ. նոյեմբեր)</h3>
            <table >
              <thead>
                <tr>
                  <th>Ստորաբաժանման անվանումը</th>
                  <th>Օրը</th>
                  <th>Ժամը</th>
                </tr>
              </thead>
              {
                admission.map((item: any, index: number) => <tbody key={item.id}>
                  {edit === index ? <tr>
                    <td>
                      <textarea rows={4} value={value} onChange={(e: any) => { setValue(e.target.value) }} style={{ resize: "none" }}></textarea>
                    </td>
                    <td>
                      <textarea value={value1} onChange={(e: any) => { setValue1(e.target.value) }} style={{ resize: "none" }}></textarea>
                    </td>
                    <td>
                      <textarea value={value2} onChange={(e: any) => { setValue2(e.target.value) }} style={{ resize: "none" }}></textarea>
                    </td>
                    <td>
                      <button className='save'> <i onClick={(e) => adminSave(item.id, value, value1, value2, 'admission', e)} className="fa-regular fa-square-check"></i></button>
                      <button onClick={() => setEdit(-1)} ><i className="fa-solid fa-xmark"></i></button>
                    </td>
                  </tr> : <tr>
                    <td>{item.name}</td>
                    <td>{item.day}</td>
                    <td>{item.time}</td>
                    {auth.roles &&<td> <button onClick={() => {
                      setEdit(index);
                      setValue(item.name);
                      setValue1(item.day);
                      setValue2(item.time)
                    }}><i className="fa-solid fa-pen"></i></button>

                      {auth.roles && <button onClick={(e) => {
                        setRemoveitem([item.id, "admission", e])
                      }}><i className="fa-regular fa-trash-can"></i></button>}
                    </td>}
                  </tr>}
                </tbody>
                )}
              {auth.roles && <i onClick={() => adminAdd()} className="fa-solid fa-plus ADD">   Ավելացնել</i>}

            </table>
          </div>
          {removeitem[0]!==-1&&<DeleteText removeitem={removeitem} setRemoveitem={setRemoveitem} deleteItem={adminDelete} />}
        

        {/* -----------------------------Next----------------------------- */}

        <div>
          <h3 className='h3-2'>ԺԱՄԱՆԱԿԱՑՈՒՅՑ ԱԶԳԱՅԻՆ ԺՈՂՈՎԻ ՆԱԽԱԳԱՀԻ ՏԵՂԱԿԱԼՆԵՐԻ ԿՈՂՄԻՑ ԿԱԶՄԱԿԵՐՊՎՈՂՔԱՂԱՔԱՑԻՆԵՐԻ ԸՆԴՈՒՆԵԼՈՒԹՅՈՒՆՆԵՐԻ</h3>
          <table className='secondTable'>
            <thead>
              <tr>
                <th>Ստորաբաժանման անվանումը</th>
                <th>Օրը</th>
                <th>Ժամը</th>
              </tr>
            </thead>
            {
              citizenAdmission.map((item: any, index: number) => <tbody key={item.id}>
                {editCitizen === index ? <tr>
                  <td>
                    <textarea value={valueCitizen} onChange={(e: any) => { setValueCitizen(e.target.value) }} style={{ resize: "none" }}></textarea>
                  </td>
                  <td>
                    <textarea value={valueCitizen1} onChange={(e: any) => { setValueCitizen1(e.target.value) }} style={{ resize: "none" }}></textarea>
                  </td>
                  <td>
                    <textarea value={valueCitizen2} onChange={(e: any) => { setValueCitizen2(e.target.value) }} style={{ resize: "none" }}></textarea>
                  </td>
                  <td>
                    <button className='save'> <i onClick={(e) => adminSave1(item.id, valueCitizen, valueCitizen1, valueCitizen2, 'citizenAdmission', e)} className="fa-regular fa-square-check"></i></button>
                    <button onClick={() => seteditCitizen(-1)} ><i className="fa-solid fa-xmark"></i></button>
                  </td>
                </tr> 
                  :
                <tr>
                    <td>{item.name}</td>
                    <td>{item.day}</td>
                    <td>{item.time}</td>
                    {auth.roles && <td><button onClick={() => {
                      seteditCitizen(index);
                      setValueCitizen(item.name);
                      setValueCitizen1(item.day);
                      setValueCitizen2(item.time)
                    }}><i className="fa-solid fa-pen"></i></button>

                      {auth.roles && <button onClick={(e) => {
                        setRemoveitem([item.id, "citizenAdmission", e]) 
                      }}><i className="fa-regular fa-trash-can"></i></button>}
                    </td>}
                  </tr>}


              </tbody>
              )
            }

            {auth.roles && <i onClick={() => adminAdd1()} className="fa-solid fa-plus ADD">   Ավելացնել</i>}
          </table>
        </div>
      </div>
    }
    </div>
    {removeitem[0]!==-1&&<DeleteText removeitem={removeitem} setRemoveitem={setRemoveitem} deleteItem={adminDeleteCitizen} />}
    </div >
  )
}