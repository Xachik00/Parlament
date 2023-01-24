import { useEffect, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { fetchTimeTable } from "../../store/action/timeTableActions";
import { useNavigate } from 'react-router-dom';
import axios from '../../axios/index';
import useAuth from '../../hooks/AdminHooks/useAuth'
import "./timeTable.scss"


export const TimeTablePage = () => {

  const { admission, citizenAdmission }: any = useAppSelector(state => state.admission)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { auth }: any = useAuth()

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


  useEffect(() => {
    dispatch(fetchTimeTable())
  }, [])

  async function adminSave1(id: any, valueCitizen: any, valueCitizen1: any, valueCitizen2: any, page: string) {
    const newInfo = {
      id: id,
      name: valueCitizen,
      day: valueCitizen1,
      time: valueCitizen2
    }
    await axios.patch(page + "/" + id, newInfo);
    navigate(0)
  }

  async function adminSave(id: any, value: any, value1: any, value2: any, page: string) {
    const newInfo = {
      id: id,
      name: value,
      day: value1,
      time: value2
    }
    await axios.patch(page + "/" + id, newInfo);
    navigate(0)
  }

  async function adminDelete(id: any, page: string) {
    await axios.delete(page + "/" + id);
    navigate(0)
  }

  async function adminAdd() {
    setAdd(!add)
  }

  async function adminsSave(value: any, value1: any, value2: any) {
    const newInfo = {
      name: value,
      day: value1,
      time: value2,
    }
    await axios.post("admission/", newInfo);
    navigate(0)
  }

  async function adminAdd1() {
    setAdd1(!add1)
  }

  async function adminsSave1(valueCitizen: any, valueCitizen1: any, valueCitizen2: any) {
    const newInfo = {
      name: valueCitizen,
      day: valueCitizen1,
      time: valueCitizen2,
    }
    await axios.post("citizenAdmission/", newInfo);
    navigate(0)
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

            <label>Օրը</label>
            <textarea  className='td1' value={value1} onChange={(e: any) => { setValue1(e.target.value) }}></textarea>
          
            <label>Ժամը</label>
            <textarea  className='td1' value={value2} onChange={(e: any) => { setValue2(e.target.value) }}></textarea>
          
          <div className='form_div'>
            <button onClick={() => adminsSave(value, value1, value2)} >Ավելացնել</button>
            <button onClick={()=> setAdd(!add)} >Չեղարկել</button>
          </div>

        </form> : add1 ? <form>
          <label>Ստորաբաժանման անվանումը</label>
          <textarea value={valueCitizen} onChange={(e: any) => { setValueCitizen(e.target.value) }} style={{ resize: "none" }}></textarea>

          <label>Օրը</label>
          <textarea value={valueCitizen1} onChange={(e: any) => { setValueCitizen1(e.target.value) }} style={{ resize: "none" }}></textarea>

          <label>Ժամը</label>
          <textarea value={valueCitizen2} onChange={(e: any) => { setValueCitizen2(e.target.value) }} style={{ resize: "none" }}></textarea>

          <div className='form_div'>
            <button onClick={() => adminsSave1(valueCitizen, valueCitizen1, valueCitizen2)} >Ավելացնել</button>
            <button onClick={()=> setAdd(!add)} >Չեղարկել</button>
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
                      <button className='save'> <i onClick={() => adminSave(item.id, value, value1, value2, 'admission')} className="fa-regular fa-square-check"></i></button>
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

                      {auth.roles && <button onClick={() => {
                        adminDelete(item.id, "admission")
                      }}><i className="fa-regular fa-trash-can"></i></button>}
                    </td>}
                  </tr>}
                </tbody>
                )}

              {auth.roles && <i onClick={() => adminAdd()} className="fa-solid fa-plus ADD"></i>}

            </table>
          </div>
        

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
                    <button className='save'> <i onClick={() => adminSave1(item.id, valueCitizen, valueCitizen1, valueCitizen2, 'citizenAdmission')} className="fa-regular fa-square-check"></i></button>
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

                      {auth.roles && <button onClick={() => {
                        adminDelete(item.id, "citizenAdmission")
                      }}><i className="fa-regular fa-trash-can"></i></button>}
                    </td>}
                  </tr>}


              </tbody>
              )
            }
            {auth.roles && <i onClick={() => adminAdd1()} className="fa-solid fa-plus ADD"></i>}
          </table>
        </div>
      </div>
    }
    </div>

    </div >
  )
}