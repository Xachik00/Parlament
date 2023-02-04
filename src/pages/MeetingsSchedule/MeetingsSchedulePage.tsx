import { Header } from '../../components/Header/Header';
import Calendar from '../../components/Calendar';
import "./index.scss"

export const MeetingsSchedulePage = () => {
  return (
    <div className='MeetingsSchedule'>
      <Header />
      <div className="demo">
        <div className='head_box'>
          <img src="./images/Meet.png" alt="" />
          <h2>ԱԺ նիստերի ժամանակացույց</h2>
        </div>
        <div className='lines'></div>
        <Calendar />     
      </div>
    </div>
  )
}
