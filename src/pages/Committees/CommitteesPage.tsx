import { fetchCommittees } from "../../store/action/CommitteesActions";
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { Header } from '../../components/Header/Header'
import useAuth from '../../hooks/AdminHooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from '../../axios';
import './CommitteesPage.scss'
import DeleteText from "../../components/Delete/DeleteText";

export const CommitteesPage = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { auth }: any = useAuth();
  const [add, setAdd] = useState(false)
  const [edit, setEdit] = useState(0)
  const [value, setValue] = useState(['',''])
  const [erorr, setErorr] = useState(false)
  const [erorr1, setErorr1] = useState(false)
  const [removeitem,setRemoveitem]=useState([-1,{}])
  const [addValue, setAddValue] = useState(['', ''])
  const { Committees } = useAppSelector(state => state.Committees)


  useEffect(() => {
    dispatch(fetchCommittees())
  }, [dispatch])

  async function saveData( value: string[], id: number) {
    setErorr(false)
    setErorr1(false)
    if (value[0].trim() === '' || value[1].trim() === '') {
      if (value[0].trim() === '') {
        setErorr(true)
      }
      if (value[1].trim() === '') {
        setErorr1(true)
      }
    } else {
      const newCommites = {
        id,
        title:value[0],
        text: value[1]
      }
      await axios.patch('Committees/' + id, newCommites)
      dispatch(fetchCommittees())
      setEdit(0)
    }
  }

  async function deleteItem(id: Number,e:any) {
    e.preventDefault()
    await axios.delete('Committees/' + id)
    dispatch(fetchCommittees())
  }

  async function addText(title: string, text: string) {
    setErorr(false)
    setErorr1(false)
    if (title.trim() === '' || text.trim() === '') {
      if (text.trim() === '') {
        setErorr(true)
      }
      if (title.trim() === '') {
        setErorr1(true)
      }
    } else {
      const newCommites = {
        title,
        text
      }
      await axios.post('Committees/', newCommites)
      dispatch(fetchCommittees())
      setAdd(false)
    }
  }


  return (
    <div className='Committees'>
      <Header />
      <div className='CommitteesBody'>
        <div className='Committees_title'>
          <img src="./images/Frame3.png" alt="" />
          <h2>Մշտական հանձնաժողովները և նրանց գործունեության ոլորտները</h2>
        </div>
        <hr />
        {
          add ? <div className='addDiv'>
            <span>Վերնագիր *։ <textarea className={erorr1 ? 'erorrText' : 'text'} value={addValue[0]} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setAddValue([e.target.value, addValue[1]]); setErorr1(false) }} /></span>
            <span>Տեղեկություն *։ <textarea className={erorr ? 'erorrText' : 'text'} value={addValue[1]} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setAddValue([addValue[0], e.target.value]); setErorr(false) }} /></span>
            <button onClick={() => setAdd(false)} className='back' >Չեղարկել</button>
            <button onClick={() => addText(addValue[0], addValue[1])} className='save' >Հաստատել</button>
            <p>* : Դաշտը պետք է լրացվի!!!</p>
          </div> :

            <div className='Committees_main'>
              <h2>ՀՀ ԱԶԳԱՅԻՆ ԺՈՂՈՎԻ ՄՇՏԱԿԱՆ ՀԱՆՁՆԱԺՈՂՈՎՆԵՐԸ ԵՎ ՆՐԱՆՑ ԳՈՐԾՈՒՆԵՈՒԹՅԱՆ ՈԼՈՐՏՆԵՐԸ</h2>
              <div className='Committees_main_page'>
                {
                  Committees?.map((item) => <div key={item.id}>
                    {
                      edit === item.id ? <div className='edit_committees'>
                        <span>{item.id}.</span>
                        <textarea className={erorr ? 'erorrText' : 'text'} value={value[0]} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setValue([e.target.value,value[1]]); setErorr(false) }} />
                        <textarea className={erorr1 ? 'erorrText' : 'text'} value={value[1]} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => { setValue([value[0] ,e.target.value]); setErorr(false) }} />
                        <button onClick={() => saveData(value, item.id)} ><i className="fa-regular fa-square-check"></i></button>
                        <button onClick={() => setEdit(0)} ><i className="fa-solid fa-xmark"></i></button>
                      </div> : <div>
                        <h3><span>{item.id}.</span>{item.title}</h3>
                        <p>{item?.text}</p>
                        {auth.roles && <>
                        <button onClick={() => { setValue([item.title,item.text]); setEdit(item.id) }}><i className="fa-solid fa-pen"></i></button>
                        <button onClick={(e) => setRemoveitem([item.id,e])}><i className="fa-regular fa-trash-can"></i></button>
                        </>}</div>
                    }

                  </div>)
                }
                {auth.roles && <button onClick={() => {setAdd(true)}}><i className="fa-solid fa-plus ADD"></i></button>}
              </div>
            </div>}
            {removeitem[0]!==-1 && <DeleteText removeitem={removeitem} setRemoveitem={setRemoveitem} deleteItem={deleteItem} />}
      </div>
    </div>
  )
}
