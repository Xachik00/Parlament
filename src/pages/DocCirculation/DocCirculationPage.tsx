import { Header } from '../../components/Header/Header'
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { fetchDocCirculation } from "../../store/action/DocCirculationActions";
import './DocCirculation.scss';
import useAuth from '../../hooks/AdminHooks/useAuth';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';

export const DocCirculationPage = () => {

  const { auth }: any = useAuth();
  const navigate = useNavigate();
  const [add, setAdd] = useState(false);
  const [add1, setAdd1] = useState(false);
  const [edit, setEdit] = useState('')
  const [erorr, setErorr] = useState(false)
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState<string[] | undefined[]>(['', '']);
  const [addValue, setaddValue] = useState('');
  const [addValue1, setaddValue1] = useState<string[] | undefined[]>(['', '', '']);
  const [pageName, setPageName] = useState('');
  const { DocCirculation_1, DocCirculation_2, DocCirculation_3 } = useAppSelector(state => state.DocCirculation);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDocCirculation())
  }, [dispatch])

  async function saveDate(id: number, text: string, pageName: string, value2?: string[] | undefined[]) {
    if (value2 === undefined) {
      const newDocCirculation = {
        id,
        text,
      }
      await axios.patch(pageName + '/' + id, newDocCirculation)
      navigate(0)
      setValue('')
      setValue2(['', ''])
    } else {
      const newDocCirculation = {
        id,
        text,
        text_A: value2[0],
        text_B: value2[1]
      }
      await axios.patch(pageName + '/' + id, newDocCirculation);
      navigate(0)
      setValue('')
      setValue2(['', ''])
    }
  }

  async function deleteItem(id: number, pageName: string,e:any) {
    e.preventDefault()
    await axios.delete(pageName + '/' + id)
    dispatch(fetchDocCirculation())
  }

  async function addText(text: string, pageName: string) {
    if (text.trim() === '') {
      setErorr(true)
    } else {
      const newnewDocCirculation = {
        text
      }
      await axios.post(pageName, newnewDocCirculation)
      navigate(0)
    }
  }

  async function addText1(value: string[] | undefined[], pageName: string) {
    if (value[0]?.trim() === '') {
      setErorr(true)
    } else {
      const newnewDocCirculation = {
        text: value[0],
        text_A: value[1],
        text_B: value[2],
      }
      await axios.post(pageName, newnewDocCirculation)
      navigate(0)
    }
  }

  return (
    <div className='DocCirculation'>
      <Header />
      <div className='DocCirculationBody'>
        <div className='DocCirculation_title'>
          <img src="./images/Frame1.png" alt="" />
          <h2>Քաղաքացիների ընդունելության և  փաստաթղթաշրջանառության կարգը</h2>
        </div>
        <hr />
        {add ? <div className='addDiv'>
          <span>Տեղեկություն *։<textarea className={erorr ? 'erorrText' : 'text'} value={addValue} onChange={(e: any) => setaddValue(e.target.value)} /></span>
          <button onClick={() => addText(addValue, pageName)} className='save' >Հաստատել</button>
          <button onClick={() => navigate(0)} className='back'>Չեղարկել</button>
          <p>* : Դաշտը պետք է լրացվի!!!</p>
        </div> : add1 ? <div className='addDiv'>
          <span>Տեղեկություն *։<textarea className={erorr ? 'erorrText' : 'text'} value={addValue1[0]} onChange={(e: any) => setaddValue1([e.target.value, addValue1[1], addValue1[2]])} /></span>
          <span>Կետ 1։<textarea value={addValue1[1]} onChange={(e: any) => setaddValue1([addValue1[0], e.target.value, addValue1[2]])} /></span>
          <span>Կետ 2։<textarea value={addValue1[2]} onChange={(e: any) => setaddValue1([addValue1[0], addValue1[1], e.target.value])} /></span>
          <button onClick={() => addText1(addValue1, pageName)} className='save'>Հաստատել</button>
          <button onClick={() => navigate(0)} className='back'>Չեղարկել</button>
          <p>* : Դաշտը պետք է լրացվի!!!</p>
        </div> :
          <div className='DocCirculation_main'>
            <h2>ԿԱՐԳ</h2>
            <div className='DocCirculation_main_page'>
              <h3>I.	Ընդհանուր դրույթներ</h3>
              {
                DocCirculation_1.map(item => <ul key={item.id}>
                  {
                    edit === item.text ?
                      <li>
                        <textarea value={value === '' ? item.text : value} onChange={(e:  React.ChangeEvent<HTMLTextAreaElement>) => { setValue(e.target.value) }} />
                        <button onClick={() => saveDate(item.id, value, pageName)}><i className="fa-regular fa-square-check"></i></button>
                        <button onClick={() => navigate(0)} ><i className="fa-solid fa-xmark"></i></button>
                      </li> :
                      <li>{item.text}<br />{auth.accessToken && <><button onClick={() => { setEdit(item.text); setValue(item.text); setPageName('DocCirculation_1') }} ><i className="fa-solid fa-pen"></i></button><button onClick={(e:any) => deleteItem(item.id, 'DocCirculation_1',e)}><i className="fa-regular fa-trash-can"></i></button></>}</li>
                  }
                </ul>)
              }
              {auth.roles&&<button onClick={() => { setAdd(true); setPageName('DocCirculation_1') }}><i  className="fa-solid fa-plus ADD"></i></button>}
              <h3>I.	Ընդհանուր դրույթներ</h3>
              {
                DocCirculation_2.map(item => <ul key={item.id}>
                  {
                    edit === item.text ?
                      <li>
                        <textarea value={value} onChange={(e:  React.ChangeEvent<HTMLTextAreaElement>) => { setValue(e.target.value) }} />
                        {item?.text_A && <textarea value={value2[0]} onChange={(e: any) => { setValue2([e.target.value, value2[1]]) }} />}
                        {item?.text_B && <textarea value={value2[1]} onChange={(e: any) => { setValue2([value2[0], e.target.value]) }} />}
                        <button onClick={() => saveDate(item.id, value, pageName, value2)}><i className="fa-regular fa-square-check"></i></button>
                        <button onClick={() => navigate(0)} ><i className="fa-solid fa-xmark"></i></button>
                    
                      </li> :

                      <li>{item.text}
                        {item.text_A && <p>{item?.text_A}</p>}
                        {item.text_B && <p>{item?.text_B}</p>}
                        <br />
                        {auth.roles && <><button onClick={() => { setEdit(item.text); setValue(item.text); item.text_A && item.text_B ? setValue2([item.text_A, item.text_B]) : item.text_A ? setValue2([item.text_A, '']) : item.text_B && setValue2(['', item.text_B]); setPageName('DocCirculation_2') }} ><i className="fa-solid fa-pen"></i></button><button onClick={(e:any) => deleteItem(item.id, 'DocCirculation_2',e)}><i className="fa-regular fa-trash-can"></i></button></>}
                      </li>}
                </ul>)
              }
              {auth.roles&&<button onClick={() => { setAdd1(true); setPageName('DocCirculation_2') }}><i  className="fa-solid fa-plus ADD"></i></button>}
              <h3>III.	Պաշտոնատար անձանց կողմից իրականացված ընդունելության ժամանակ քաղաքացու կողմից ներկայացված գրավոր դիմումների գրանցում  և հաշվետվողականության ապահովում</h3>
              {
                DocCirculation_3.map(item => <ul key={item.id}>
                  {
                    edit === item.text ?
                      <li>
                        <textarea value={value} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setValue(e.target.value) }}/>
                        <button onClick={() => saveDate(item.id, value, pageName)}><i className="fa-regular fa-square-check"></i></button>
                        <button onClick={() => navigate(0)} ><i className="fa-solid fa-xmark"></i></button>
                      </li> :
                      <li>{item.text}<br />{auth.accessToken && <><button onClick={() => { setEdit(item.text); setValue(item.text); setPageName('DocCirculation_3') }} ><i className="fa-solid fa-pen"></i></button><button onClick={(e:any) => deleteItem(item.id, 'DocCirculation_3',e)}><i className="fa-regular fa-trash-can"></i></button></>}</li>
                  }
                </ul>)
              }
              {auth.roles&&<button onClick={() => { setAdd(true); setPageName('DocCirculation_3') }}><i  className="fa-solid fa-plus ADD"></i></button>}
            </div>
          </div>}
      </div>
    </div>
  )
}

