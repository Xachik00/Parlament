import {useEffect} from 'react';

import {useNavigate} from 'react-router-dom'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { fetchParlament } from "../../store/action/parlamentActions";

export const HomePage = () => {


  const navigate = useNavigate();
  const { parlament } = useAppSelector(state => state.parlament)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchParlament())
  },[])
  


  return (

    <div className='Home'>
      <header >
        <img src="./images/Logo.png" alt="" />
        <div className='hello-text'>
          <h1>Բարի Գալուստ <br /> Հայաստանի Հանրապետության ազգային ժողով</h1>
        </div>
      </header>
      <p>Հարգելի քաղաքացի ընտրեք ձեզ հետաքրքրող բաժինը ինֆորմացիա ստանալու համար</p>
      <div className='Home-parlament'>{
        parlament?.map(item => <div className='Home-item' key={item.id} onClick={() => navigate('/' + item.title)}>
          <img src={item.img} alt="" />
          <h4>{item.description}</h4></div>
        )
      }
      </div>
    </div>
  )
}
