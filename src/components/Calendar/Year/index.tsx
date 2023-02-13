import dayjs from 'dayjs'
import { IYear } from '../types'
import axios from '../../../axios'
import { useState, useEffect } from 'react'
import isBetween from 'dayjs/plugin/isBetween'
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/AdminHooks/useAuth';
import { fetchCalendar } from '../../../store/action/CalendarActions';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import { daysOfTheWeek, daysOfTheWeekOffset, getMonthName } from '../Utils'

dayjs.extend(isBetween)

const Year = ({

  showNumberOfMonths = 12,
  monthsFrom = 1,
}: IYear): JSX.Element => {
  const _year = dayjs().year()
  const { auth }: any = useAuth()
  const navigate = useNavigate()
  const { Calendar } = useAppSelector(state => state.Calendar)
  const dispatch = useAppDispatch()
  const item = Calendar.map(item => item.date)
  const [select, setSelect] = useState<any>(item)
  const [disabled, setDisabled] = useState(true)
  localStorage.setItem('data', JSON.stringify(item))

  useEffect(() => {
    const data: any = localStorage.getItem('data');
    const datas = JSON.parse(data)
    setSelect(datas)
  }, [Calendar])

  useEffect(() => {
    dispatch(fetchCalendar())
  }, [dispatch])

  const calendarSave = async () => {

    const select1=[]
    for (let i = 0; i < select.length; i++) {
        let obj={
          date:select[i]
        }
        select1.push(obj)
    }


      await axios.post('timestamp/', select1)
    
    navigate(0)
  }


  return (
    <>
      <div className='year' data-testid='year'>
        {new Array(showNumberOfMonths).fill('').map((_, pos) => {
          const arrOffset = 1
          const month = monthsFrom + pos
          const date = `${_year}-${month}`
          const monthName = getMonthName(month)
          const totalDays = dayjs(date).daysInMonth()
          const firstDayOfWeek = dayjs(`${date}-01`).day()

          const offsetDays =
            firstDayOfWeek !== 0
              ? new Array(firstDayOfWeek - arrOffset).fill('')
              : new Array(Number(daysOfTheWeekOffset[firstDayOfWeek])).fill('')

          const daysArr = new Array(totalDays).fill('')
          return (
            <div key={pos} className='month' data-testid='month'>
              <div className='month_box'>
                <h3 className='monthName'>{monthName}</h3>
              </div>
              <div className='dayOfTheWeek'>
                {daysOfTheWeek?.map((dayOfTheWeek, pos) => {
                  return (
                    <div key={pos} className='days'>
                      {dayOfTheWeek}
                    </div>
                  )
                })}
              </div>

              <div className='content'>
                {offsetDays?.map((_, pos) => {
                  return <div key={pos} className='day' />
                })}

                {daysArr?.map((_, pos) => {
                  const day = pos + arrOffset;
                  const id: any = dayjs().year() + "-" + month + "-" + day;
                  
                  return (
                    auth.role ? <div onClick={async () => {
                      setDisabled(false)
                      if (select?.indexOf(id) >= 0) {

                        setSelect(select?.filter((el: string) => {

                          return el !== id
                        }));

                      } if (select?.indexOf(id) < 0) {
                        setSelect([...select, id])
                      }
                    }}
                      key={pos}
                      className={select?.map((item: any) => item)?.indexOf(id) >= 0 ? `checkday` : `day`}
                    >
                      <p className={select?.map((item: any) => item)?.indexOf(id) >= 0 ? `checkday` : `day`}>{day}</p>
                    </div> : <div key={pos}
                      className={select?.map((item: any) => item)?.indexOf(id) >= 0 ? `checkday` : `dayus`}
                    >
                      <p className={select?.map((item: any) => item)?.indexOf(id) >= 0 ? `checkday` : `dayus`}>{day}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
      <div className='butons'>{auth.role && <><button className={disabled ? "disables" : "nodisables"} onClick={() => calendarSave()}>Պահպանել</button>
      <button className='nodisables' onClick={()=>navigate(0)}>Չեղարկել</button></>}</div>
      
    </>
  )
}

export default Year
