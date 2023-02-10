import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { fetchTimeTable } from "../../store/action/timeTableActions";
import axios from '../../axios/index';
import { ErrorMessage } from '../../components/Error/Error';
import useAuth from '../../hooks/AdminHooks/useAuth';
import DeleteText from '../../components/Delete/DeleteText';
import "./timeTable.scss"


export const TimeTablePage = () => {

  const { admission }: any = useAppSelector(state => state.admission)

  const dispatch = useAppDispatch()
  

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
      
      name: valueCitizen,
      day: valueCitizen1,
      time: valueCitizen2
    }
    await axios.put(page + "/" + id, newInfo);
    dispatch(fetchTimeTable())
    seteditCitizen(-1)
  }

  async function adminSave(id: any, value: any, value1: any, value2: any, page: string, e:any) {
    e.preventDefault()
    const newInfo = {
      
      name: value,
      day: value1,
      time: value2
    }
    await axios.put(page + "/" + id, newInfo);
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
    await axios.post("acceptability/", newInfo);
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
      title:'member',
      name: valueCitizen,
      day: valueCitizen1,
      time: valueCitizen2,
    }
    await axios.post("acceptability/", newInfo);
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


        {add ? <div className='form'>

            <label>Ստորաբաժանման անվանումը</label>
            <textarea className='td1' maxLength={150} value={value} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setValue(e.target.value) }}></textarea>
            {error &&  value.trim().length===0 && <ErrorMessage error={error} />}

            <label>Օրը</label>
            <input className='input_num' maxLength={10} value={value1} onChange={(e: any) => { setValue1(e.target.value) }} />
            {error &&  value1.trim().length===0 && <ErrorMessage error={error} />}
          
            <label>Ժամը</label>
            <input className='input_num' maxLength={11} value={value2} onChange={(e: any) => { setValue2(e.target.value) }} />
          
          <div className='form_div'>
            <button onClick={(e) => adminsSave(value, value1, value2, e)} >Ավելացնել</button>
            <button onClick={()=> setAdd(!add)} >Չեղարկել</button>
          </div>

        </div> : add1 ? <div className='form'>
          <label>Ստորաբաժանման անվանումը</label>
          <textarea maxLength={150} value={valueCitizen} onChange={(e: any) => { setValueCitizen(e.target.value) }} style={{ resize: "none" }}></textarea>
          {error &&  valueCitizen.trim().length===0 && <ErrorMessage error={error} />}


          <label>Օրը</label>
          <input className='input_num' maxLength={10} value={valueCitizen1} onChange={(e: any) => { setValueCitizen1(e.target.value) }} style={{ resize: "none" }} />
          {error &&  valueCitizen1.trim().length===0 && <ErrorMessage error={error} />}


          <label>Ժամը</label>
          <input className='input_num' maxLength={11} value={valueCitizen2} onChange={(e: any) => { setValueCitizen2(e.target.value) }} style={{ resize: "none" }} />

          <div className='form_div'>
            <button onClick={(e) => adminsSave1(valueCitizen, valueCitizen1, valueCitizen2, e)} >Ավելացնել</button>
            <button onClick={()=> setAdd1(!add1)} >Չեղարկել</button>
          </div>

        </div> :
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
                admission.map((item: any, index: number) =>!item.title && <tbody key={item.id}>
                  {edit === index ? <tr>
                    <td>
                      <textarea rows={4} maxLength={150} value={value} onChange={(e: any) => { setValue(e.target.value) }} style={{ resize: "none" }}></textarea>
                    </td>
                    <td>
                      <input value={value1} maxLength={10} onChange={(e: any) => { setValue1(e.target.value) }} />
                    </td>
                    <td>
                      <input value={value2} maxLength={11} onChange={(e: any) => { setValue2(e.target.value) }} />
                    </td>
                    <td>
                      <button className='save'> <i onClick={(e) => adminSave(item.id, value, value1, value2, 'acceptability', e)} className="fa-regular fa-square-check"></i></button>
                      <button onClick={() => setEdit(-1)} ><i className="fa-solid fa-xmark"></i></button>
                    </td>
                  </tr> : <tr>
                    <td>{item.name}</td>
                    <td>{item.day}</td>
                    <td>{item.time}</td>
                    {auth.role &&<td> <button onClick={() => {
                      setEdit(index);
                      setValue(item.name);
                      setValue1(item.day);
                      setValue2(item.time)
                    }}><i className="fa-solid fa-pen"></i></button>

                      {auth.role && <button onClick={(e) => {
                        setRemoveitem([item.id, "acceptability", e])
                      }}><i className="fa-regular fa-trash-can"></i></button>}
                    </td>}
                  </tr>}
                </tbody>
                )}

            </table>
              {auth.role && <i onClick={() => adminAdd()} className="fa-solid fa-plus ADD">   Ավելացնել</i>}
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
              admission.map((item: any, index: number) => item.title&& <tbody key={item.id}>
                {editCitizen === index ? <tr>
                  <td>
                    <textarea value={valueCitizen} onChange={(e: any) => { setValueCitizen(e.target.value) }} style={{ resize: "none" }}></textarea>
                  </td>
                  <td>
                    <input value={valueCitizen1} onChange={(e: any) => { setValueCitizen1(e.target.value) }} />
                  </td>
                  <td>
                    <input value={valueCitizen2} onChange={(e: any) => { setValueCitizen2(e.target.value) }} />
                  </td>
                  <td>
                    <button className='save'> <i onClick={(e) => adminSave1(item.id, valueCitizen, valueCitizen1, valueCitizen2, 'acceptability', e )} className="fa-regular fa-square-check"></i></button>
                    <button onClick={() => seteditCitizen(-1)} ><i className="fa-solid fa-xmark"></i></button>
                  </td>
                </tr> 
                  :
                <tr>
                    <td>{item.name}</td>
                    <td>{item.day}</td>
                    <td>{item.time}</td>
                    {auth.role && <td><button onClick={() => {
                      seteditCitizen(index);
                      setValueCitizen(item.name);
                      setValueCitizen1(item.day);
                      setValueCitizen2(item.time)
                    }}><i className="fa-solid fa-pen"></i></button>

                      {auth.role && <button onClick={(e) => {
                        setRemoveitem([item.id, "acceptability", e]) 
                      }}><i className="fa-regular fa-trash-can"></i></button>}
                    </td>}
                  </tr>}
              </tbody>
              )
            }

          </table>
            {auth.role && <i onClick={() => adminAdd1()} className="fa-solid fa-plus ADD">   Ավելացնել</i>}
        </div>
      </div>
    }
    </div>
    {removeitem[0]!==-1&&<DeleteText removeitem={removeitem} setRemoveitem={setRemoveitem} deleteItem={adminDeleteCitizen} />}
    </div >
  )
}