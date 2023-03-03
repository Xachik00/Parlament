import { Header } from '../../components/Header/Header'
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { fetchDocCirculation } from "../../store/action/DocCirculationActions";
import './DocCirculation.scss';
import useAuth from '../../hooks/AdminHooks/useAuth';
import axios from '../../axios';
import { useNavigate } from 'react-router-dom';
import DeleteText from '../../components/Delete/DeleteText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck,faXmark,faPen,faTrash,faPlus } from '@fortawesome/free-solid-svg-icons'

export const DocCirculationPage = () => {

  const title = [];
  const newtitle = [];
  const { auth }: any = useAuth();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(-1)
  const [titlea, setTitle] = useState('')
  const [value, setValue] = useState('');
  const [add1, setAdd1] = useState(false);
  const [erorr, setErorr] = useState(false)
  const [removeitem, setRemoveitem] = useState([-1, {}])
  const [value2, setValue2] = useState<string[] | undefined[]>(['', '']);
  const [addValue1, setaddValue1] = useState<string[] | undefined[]>(['', '', '']);
  const { DocCirculation } = useAppSelector(state => state.DocCirculation);
  const dispatch = useAppDispatch();



  useEffect(() => {
    dispatch(fetchDocCirculation())
  }, [dispatch])

  const title1 = (DocCirculation.map(el => el.title))
  const sorttitle = title1.sort((a, b) => (a > b) ? 1 : -1)
  title.push(...sorttitle)

  for (let i = 0; i < title.length; i++) {
    if (title[i] !== title[i + 1]) {
      newtitle.push(title[i])
    }
  }


  async function saveDate(id: number, text: string, e: any, title?: any) {
    setErorr(false)
    if (text?.trim() === '') {
      setErorr(true)
    }else if (value2[0] === '' && value2[1] === '') {
      const newDocCirculation = {
        title,
        text
      }
      await axios.put('citizen/' + id, newDocCirculation)
      setValue('')
      setValue2(['', ''])
      dispatch(fetchDocCirculation())
      setEdit(-1)
    } else if (value2[0] !== '' && value[1] === '') {
      const newnewDocCirculation = {
        title,
        text,
        subtitle1: value[0]
      }
      await axios.put('citizen/' + id, newnewDocCirculation)
      setValue('')
      setValue2(['', ''])
      dispatch(fetchDocCirculation())
      setEdit(-1)
    } else if (value2[0] === '' && value2[1] !== '') {
      const newnewDocCirculation = {
        title,
        text,
        subtitle2: value2[1]
      }
      await axios.put('citizen/' + id, newnewDocCirculation)
      setValue('')
      setValue2(['', ''])
      dispatch(fetchDocCirculation())
      setEdit(-1)
    }else {
      const newDocCirculation = {
        title,
        text,
        subtitle1: value2[0],
        subtitle2: value2[1]
      }
      await axios.put('citizen/' + id, newDocCirculation);
      setValue('')
      setValue2(['', ''])
      dispatch(fetchDocCirculation())
      setEdit(-1)
    }

    
  }

  async function deleteItem(id: number, e: any) {
    e.preventDefault()
    await axios.delete('citizen/' + id)
    dispatch(fetchDocCirculation())
  }

  async function addText1(value: string[] | undefined[]) {
    if (value[0]?.trim() === '') {
      setErorr(true)
    } else if (value[1] === '' && value[2] === '') {
      const newDocCirculation = {
        title: titlea,
        text: value[0]
      }
      await axios.post('citizen', newDocCirculation)
      navigate(0)
    } else if (value[1] !== '' && value[2] === '') {
      const newDocCirculation = {
        title: titlea,
        text: value[0],
        subtitle1: value[1]
      }
      await axios.post('citizen', newDocCirculation)
      navigate(0)
    } else if (value[1] === '' && value[2] !== '') {
      const newDocCirculation = {
        title: titlea,
        text: value[0],
        subtitle2: value[2]
      }
      await axios.post('citizen', newDocCirculation)
      navigate(0)
    } else {
      const newDocCirculation = {
        title: titlea,
        text: value[0],
        subtitle1: value[1],
        subtitle2: value[2],
      }
      await axios.post('citizen', newDocCirculation)
      navigate(0)
    }
  }

  return (
    <div className='DocCirculation'>
      <Header />
      <div className='DocCirculationBody'>
        <div className='DocCirculation_title'>
          <img src="./images/Frame1.png" alt="" />
          <h2>Քաղաքացիների ընդունելության կարգը</h2>
        </div>
        <hr />
        {add1 ? <div className='addDiv'>
          <span>Տեղեկություն *։<textarea className={erorr ? 'erorrText' : 'text'} value={addValue1[0]} onChange={(e: any) => setaddValue1([e.target.value, addValue1[1], addValue1[2]])} /></span>
          <span>Կետ 1։<textarea value={addValue1[1]} onChange={(e: any) => setaddValue1([addValue1[0], e.target.value, addValue1[2]])} /></span>
          <span>Կետ 2։<textarea value={addValue1[2]} onChange={(e: any) => setaddValue1([addValue1[0], addValue1[1], e.target.value])} /></span>
          <button onClick={() => { setAdd1(false); setaddValue1(['', '', '']) }} className='back'>Չեղարկել</button>
          <button onClick={() => addText1(addValue1)} className='save'>Հաստատել</button>
          <p>* : Դաշտը պետք է լրացվի!!!</p>
        </div> :
          <div className='DocCirculation_main'>
            <h2>ԿԱՐԳ</h2>
            <div className='DocCirculation_main_page'>
              {
                newtitle?.map((el, index) =>
                  <div key={index}><h3>{el}</h3>
                    {
                      DocCirculation.map(item => item.title === el && <ul key={item.id}>
                        {
                          edit === item.id ?
                            <li className='edit_docCirculation'>
                              <textarea className={erorr ? 'erorrText' : 'text'} value={value} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setValue(e.target.value) }} />
                              {item?.subtitle1 && <textarea className={erorr ? 'erorrText' : 'text'} value={value2[0]} onChange={(e: any) => { setValue2([e.target.value, value2[1]]) }} />}
                              {item?.subtitle2 && <textarea className={erorr ? 'erorrText' : 'text'} value={value2[1]} onChange={(e: any) => { setValue2([value2[0], e.target.value]) }} />}
                              <button onClick={(e: any) => saveDate(item.id, value, e, item.title)}><FontAwesomeIcon icon={faCheck} /></button>
                              <button onClick={() => setEdit(-1)} ><FontAwesomeIcon icon={faXmark} /></button>
                            </li> :
                            <li>{item.text}
                              {item.subtitle1 && <p>{item?.subtitle1}</p>}
                              {item.subtitle2 && <p>{item?.subtitle2}</p>}
                              <br />
                              {auth.role && <>
                                <button onClick={() => { setEdit(item.id); setValue(item.text); item.subtitle1 && item.subtitle2 ? setValue2([item.subtitle1, item.subtitle2]) : item.subtitle1 ? setValue2([item.subtitle1, '']) : item.subtitle2 && setValue2(['', item.subtitle2]) }} ><FontAwesomeIcon icon={faPen} /></button>
                                <button onClick={(e: any) => setRemoveitem([item.id, e])}><FontAwesomeIcon icon={faTrash} /></button></>}
                            </li>
                        }
                      </ul>)
                    }
                    {auth.role && <button onClick={() => { setAdd1(true); setTitle(el) }}><FontAwesomeIcon icon={faPlus} className="ADD"/>   Ավելացնել</button>}
                  </div>
                )
              }
            </div>
          </div>}
        {removeitem[0] !== -1 && <DeleteText removeitem={removeitem} setRemoveitem={setRemoveitem} deleteItem={deleteItem} />}
      </div>
    </div>
  )
}

