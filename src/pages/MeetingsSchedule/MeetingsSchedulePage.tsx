import React from 'react'
import { Header } from '../../components/Header/Header';
import useAuth from '../../hooks/AdminHooks/useAuth'
import Calendar from '../../components/Calendar';
import "./index.scss"
import { useEffect } from 'react';


export const MeetingsSchedulePage = () => {
  const { auth }: any = useAuth()
  
  

  return (
    <div className='MeetingsSchedule'>
      <Header />

      <div className="demo">
        <div className='head_box'>
          <img src="./images/Meet.png" alt="" />
          <h2>ԱԺ նիստերի ժամանակացույց</h2>
        </div>
        <div className='line'></div>
        <Calendar />
        
      </div>
    </div>
  )
}
