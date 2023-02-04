import React from 'react'
import './HeaderStyle.scss'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import  useAuth from '../../hooks/AdminHooks/useAuth'
export const Header = () => {

   const {auth}:any = useAuth()

  return (
    <div className='Header'>
        <div className="header_box">
          {auth.role ?   <a href="/admin"><i className="fa-solid fa-angle-left"></i>&nbsp;&nbsp;Հետ</a> :
          <a href="/"><i className="fa-solid fa-angle-left"></i>&nbsp;&nbsp;Հետ</a>}
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
