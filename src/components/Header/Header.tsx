import React from 'react'
import './HeaderStyle.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import  useAuth from '../../hooks/AdminHooks/useAuth'
export const Header = () => {

   const {auth}:any = useAuth()

  return (
    <div className='Header'>
        <div className="header_box">
          {auth.roles ?   <a href="/admin"><FontAwesomeIcon icon={faAngleLeft} />&nbsp;&nbsp;Հետ</a> :
          <a href="/"><FontAwesomeIcon icon={faAngleLeft} />&nbsp;&nbsp;Հետ</a>}
            <div className='logo'> 
              <img src="./images/Logo.png" alt="" />
              <h2>Հայաստանի Հանրապետության
              <p>Ազգային Ժողով
              </p></h2>
            </div>
        </div>
       
         

    </div>
  )
}
